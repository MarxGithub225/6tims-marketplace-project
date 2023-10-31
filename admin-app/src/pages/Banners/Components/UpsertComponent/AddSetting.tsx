/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useState } from 'react'
import { ScaleLoader } from "react-spinners";
import FileDropZone from "../../../../global-components/FileDropZone";
import { Blob } from "buffer";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { API_FILE_URL, IMAGE_ACCEPT, dateToLocalString } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import { CreateRequest } from '../../../../sdks/banner-v1/utils/DataSchemas';
import { notifyError, notifySuccess } from "../../../../global-components/CustomAlert";
import useImage from '../../../../hooks/useImage';
import moment from 'moment';
interface AddSettingProps {
    modalOpened: boolean
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean,
    settingTitle: string
}
const defaultSetting: CreateRequest = {
    link: "",
    suspended: false,
    imageId: null,
    startDate: new Date(),
    endDate: new Date (new Date().setDate(new Date().getDate() + 7))
}

function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle}: AddSettingProps) {
    const { client } = useImage()
    const [imageSrc, setImageSrc] =
        useState<any>(currentSetting?.image ? currentSetting?.image : null)
    const [imageLoading, setLoading] = useState(false)
    
    const removeImage = (data: any) => {
        setLoading(true)
        !deleteMutation.isLoading && deleteMutation.mutate(data)
    }

    const handleDropZone = (data: Array<any>) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                upsertFile(data[0], 'banner')
            };
        }
    }

    const upsertMutation = useMutation({
        mutationFn: async (body: any) => {
            return await client?.createImage(body)
        },
        onSuccess: (response: any) => {
            setImageSrc(response)
            setCurrentSetting({ ...currentSetting, imageId: response?._id })
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
            setImageSrc(null)
            setCurrentSetting({ ...currentSetting, imageId: "" })
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

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
    }


    const onChangeDate = (type: string, e:any) => {
        let dt = new Date(e.target.value).getTime();
        let current_timestamp = dt
        let seconds = 0
        if (type === 'start') {
            setCurrentSetting({ ...currentSetting, startDate: e.target.value });
        } else {
          if (currentSetting.startDate) {
            seconds = (current_timestamp - currentSetting.startDate)
            if (seconds < 0) {
              alert('Impossible de choisir une date arrière')
            } else {
            setCurrentSetting({ ...currentSetting, endDate: e.target.value });
            }
          }
        }
      }

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
                        <div className="custom-input-group-label">Lien</div>
                        <input
                            name='link'
                            value={currentSetting?.link}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={handleChange}
                            placeholder={'Add link'}
                        />
                    </div>

                    {!imageSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                        {imageLoading ? <div className="flex justify-center my-10">
                            <ScaleLoader width={3} height={20} color="#F4A607" />
                        </div>
                    :
                        <div className="w-full">
                            <FileDropZone
                                onChange={(data: Array<Blob>) => {
                                    handleDropZone(data)
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
                                    src={API_FILE_URL + '/banners/' + imageSrc?.path}
                                    width={100}
                                    height={80}
                                    className='rounded-md'
                                    alt="Picture of the author"
                                />
                                {imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>:
                                <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                    removeImage({folder: 'banners', path: imageSrc?.path, id: imageSrc?._id})
                                }}>Remove image</div>}
                            </div>
                        </div>
                    }

                    <div className="custom-input-group">
                        <div className="custom-input-group-label">Début</div>
                        <input
                            name='start'
                            type="datetime-local"
                            value = {moment(dateToLocalString(currentSetting.startDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={e => onChangeDate('start', e)}
                            placeholder={'Add start date'}
                        />
                    </div>

                    <div className="custom-input-group">
                        <div className="custom-input-group-label">Fin</div>
                        <input
                            name='end'
                            type="datetime-local"
                            value = {moment(dateToLocalString(currentSetting.endDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={e => onChangeDate('end', e)}
                            placeholder={'Add end date'}
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
                    

                    <div className="flex justify-end w-full">
                        <div className="flex item-center space-x-3 actions-buttons">
                            <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                onClick={() => {
                                    {
                                        setCurrentSetting(defaultSetting)
                                        toggleModal()
                                    }
                                }}
                            >Cancel</div>
                            <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                style={(!currentSetting?.link?.trim() || !imageSrc) ? {
                                    backgroundColor: "#bdbdbd",
                                    cursor: "not-allowed"
                                } : {}}
                                onClick={() => {
                                    currentSetting?.link?.trim() && !loading && upsertSetting()
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