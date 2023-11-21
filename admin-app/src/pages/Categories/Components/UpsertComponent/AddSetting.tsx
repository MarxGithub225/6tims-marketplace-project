/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useState } from 'react'
import { ScaleLoader } from "react-spinners";
import FileDropZone from "../../../../global-components/FileDropZone";
import { Blob } from "buffer";
import { API_FILE_URL, IMAGE_ACCEPT } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import { Category1, Category2, CreateRequest, CreateRequest2, CreateRequest3 } from '../../../../sdks/category-v1/utils/DataSchemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifySuccess } from "../../../../global-components/CustomAlert";
import useImage from '../../../../hooks/useImage';
import CustomSelect from '../../../../global-components/CustomSelect/CustomSelect';
import useCategory from '../../../../hooks/useCategory';
import { Pagination } from '../../../../sdks/GlobalDataSchemas';

interface AddSettingProps {
    modalOpened: boolean
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean,
    settingTitle: string
    settingValue: number
}
const defaultSetting: CreateRequest = {
    label: "",
    iconId: null,
    imageId: null,
    sizeGuide: "none",
    suspended: false,
    percent: 0
}

const defaultSetting2: CreateRequest2 = {
    label: "",
    iconId: null,
    imageId: null,
    sizeGuide: "none",
    suspended: false,
    categoryId: "",
    percent: 0
}

const defaultSetting3: CreateRequest3 = {
    label: "",
    iconId: null,
    imageId: null,
    sizeGuide: "none",
    suspended: false,
    categoryId: "",
    category2Id: "",
    percent: 0
}

function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle, settingValue}: AddSettingProps) {
    const { client: categoryClient} = useCategory()
    const { client } = useImage()
    const [imageLoading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] =
        useState<any>(currentSetting?.image ? currentSetting?.image : null)
    const [iconSrc, setIconSrc] =
        useState<any>(currentSetting?.icon ? currentSetting?.icon : null)
        const [subCategories, setSubCategories] =  useState<Array<any>>([])
    const [currentType, setCurrentType] =  useState<string>('')
    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
    }

    const removeImage = (data: any, type: string) => {
        setCurrentType(type)
        setLoading(true)
        !deleteMutation.isLoading && deleteMutation.mutate(data)
    }

    const handleDropZone = (data: Array<any>, type: string) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                upsertFile(data[0], 'category')
                setCurrentType(type)
            };
        }
    }

    const upsertMutation = useMutation({
        mutationFn: async (body: any) => {
            return await client?.createImage(body)
        },
        onSuccess: (response: any) => {
            if(currentType === 'image') {
                setImageSrc(response)
                setCurrentSetting({ ...currentSetting, imageId: response?._id })
            }else {
                setIconSrc(response)
                setCurrentSetting({ ...currentSetting, iconId: response?._id })
            }
            setLoading(false)
        },
        onError: (e: any) => {
            let error: string = "IMAGE_TOO_LARGE";
            error = e?.errors?.msg ?? error
            notifyError({ message: error })
            setLoading(false)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (body: any) => await client?.deleteFile(body?.folder, body?.path, body?.id),
        onSuccess: (response: any) => {
            if(currentType === 'image') {
                setImageSrc(null)
                setCurrentSetting({ ...currentSetting, imageId: "" })
            }else {
                setIconSrc(null)
                setCurrentSetting({ ...currentSetting, iconId: ""})
            }
            setLoading(false)
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
            setLoading(false)
        }
    })

    const upsertFile = (image: Blob, path: string) => {
        setLoading(true)
        !upsertMutation.isLoading && upsertMutation.mutate({image, path})
    }

    const handleSelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, categoryId: selectedOption?.value })
        let returData: Array<any> = []
        selectedOption?.subCategories?.forEach((category: Category2) => {
            returData.push({
                name: category.label,
                value: category._id
            })
        })
        setSubCategories(returData)
    }
    
    const handleSelectChange2 = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, category2Id: selectedOption?.value })
    }

    const { data: categoryData, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['categoriesData'],
        queryFn: async () => {
            let returData: Array<any> = []
            let returData2: Array<any> = []
            let result: Pagination<Category1> = await categoryClient.getAllAdminCategories({ page: 1, limit: 100})
            result?.docs?.forEach((category: Category1) => {
                returData.push({
                    name: category.label,
                    value: category._id,
                    subCategories: category.subCategories2
                })

                category.subCategories2.forEach((category: Category2) => {
                    returData2.push({
                        name: category.label,
                        value: category._id
                    })
                })
            })
            setSubCategories(returData2)
            return {categories: returData}
        },
        keepPreviousData: true
    })

    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="feature-add"
        >
            <div className="px-12 py-10 no-scrollbar h-auto w-full"
            >
                <div className="modal-label">{currentSetting?._id ? 'Edit' : 'Add'} {settingTitle}</div>

                <div className="overflow-hidden min-h-[500px]" >
                    <div className="custom-input-group">
                        <div className="custom-input-group-label">Label</div>
                        <input
                            name='label'
                            value={currentSetting?.label}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={handleChange}
                            placeholder={'Add label'}
                        />
                    </div>
                    {settingValue > 1 && <CustomSelect 
                    value={currentSetting?.categoryId}
                    classname='user-select-dropdown' width="100%" required={true} label={`Select category`}
                            placeholder='Choose' options={categoryData?.categories} onChange={handleSelectChange}
                        />}
                    {settingValue === 3 && currentSetting?.categoryId && <CustomSelect 
                    value={currentSetting?.category2Id}
                    classname='user-select-dropdown' width="100%" required={true} label={`Select sous category`}
                        placeholder={'Choose'} options={subCategories} onChange={handleSelectChange2}
                    />}
                    <div className="custom-input-group">
                        <div className="custom-input-group-label">Pourcentage de commission</div>
                        <input
                            name='percent'
                            value={currentSetting?.percent}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={handleChange}
                            placeholder={'Add percent'}
                        />
                    </div>
                    <div className="custom-input-check">
                        <label className={`option capitalize`}>
                            {`${currentSetting?.suspended ? 'Suspendu' : 'Pas suspendu'}`}
                            <input
                                type="checkbox"
                                checked={currentSetting?.suspended}
                                value={currentSetting?.suspended}
                                onChange={(e: any) => setCurrentSetting({ ...currentSetting, suspended: !currentSetting?.suspended})}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    {!imageSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                        {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                            <ScaleLoader width={3} height={20} color="#F4A607" />
                        </div>
                    :
                        <div className="w-full">
                            <FileDropZone
                                onChange={(data: Array<Blob>) => {
                                    handleDropZone(data, 'image')
                                }}
                                accept={IMAGE_ACCEPT}
                                maxFiles={1}
                                width={"100%"}
                                height={201}
                                multipleFiles={false}
                                label='Add image'
                            />
                        </div>    
                    }
                        
                    </div>
                        :
                        <div className="mt-4 mb-10 flex items-center justify-center">
                            <div className="icon-result">
                                <img
                                    src={API_FILE_URL + '/categories/' + imageSrc?.path}
                                    width={100}
                                    height={80}
                                    className='rounded-md'
                                    alt="Picture of the author"
                                />
                                {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>:
                                <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                    removeImage({folder: 'categories', path: imageSrc?.path, id: imageSrc?._id}, 'image')
                                }}>Remove image</div>}
                            </div>
                        </div>
                    }

                    {!iconSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                    {currentType === 'icon' && imageLoading ? <div className="flex justify-center my-10">
                            <ScaleLoader width={3} height={20} color="#F4A607" />
                        </div>
                    :
                        <div className="w-full">
                            <FileDropZone
                                onChange={(data: Array<Blob>) => {
                                    handleDropZone(data, 'icon')
                                }}
                                accept={IMAGE_ACCEPT}
                                maxFiles={1}
                                width={"100%"}
                                height={201}
                                multipleFiles={false}
                                label='Add icon'
                            />
                        </div>}
                    </div>
                        :
                        <div className="mt-4 mb-10 flex items-center justify-center">
                            <div className="icon-result">
                                <img
                                    src={API_FILE_URL + '/categories/' + iconSrc?.path}
                                    width={100}
                                    height={80}
                                    className='rounded-md'
                                    alt="Picture of the author"
                                />
                                {currentType === 'icon' && imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>:
                                <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                    removeImage({folder: 'categories', path: iconSrc?.path, id: iconSrc?._id}, 'icon')
                                }}>Remove icon</div>}
                            </div>
                        </div>
                    }

                    <div className="flex justify-end w-full">
                        <div className="flex item-center space-x-3 actions-buttons">
                            <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                onClick={() => {
                                    {
                                        setCurrentSetting(settingValue === 1 ? defaultSetting : settingValue === 1 ? defaultSetting2: defaultSetting3)
                                        toggleModal()
                                    }
                                }}
                            >Cancel</div>
                            <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                style={(!currentSetting?.label?.trim() || (settingValue > 1 && !currentSetting?.categoryId ) || (settingValue === 3 && !currentSetting?.category2Id )) ? {
                                    backgroundColor: "#bdbdbd",
                                    cursor: "not-allowed"
                                } : {}}
                                onClick={() => {
                                    currentSetting?.label?.trim() && !loading && upsertSetting()
                                }}
                            >{loading ?
                                <ScaleLoader width={3} height={20} color="white" />
                                : (currentSetting?._id ? 'Edit' : 'Create')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </CustomModal>
    )
}

export default AddSetting