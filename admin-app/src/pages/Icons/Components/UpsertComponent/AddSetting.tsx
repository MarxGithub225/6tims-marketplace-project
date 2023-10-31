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

interface AddSettingProps {
    modalOpened: boolean
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean,
    settingTitle: string
}


function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle}: AddSettingProps) {

    const [imageSrc, setImageSrc] =
        useState<any>(currentSetting?.image && currentSetting?.image?.path ? API_FILE_URL + currentSetting?.image?.path : null)
    const [imageToUpload, setImageToUpload] = useState<Blob | null>(null)

    const handleDropZone = (data: Array<any>) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                setImageSrc(reader?.result)
                setImageToUpload(data[0])
            };
        }
    }

    const removeImage = () => {
        setImageSrc("")
        setImageToUpload(null)
        setCurrentSetting({ ...currentSetting, image_id: -1 })
    }

    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="feature-add"
        >
            <div className="px-12 py-10 no-scrollbar h-full w-full"
            >
                <div className="modal-label">{currentSetting?._id ? 'Edit' : 'Add'} {settingTitle}</div>

                <div className="overflow-hidden" >
                    {!imageSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                        <div className="w-full">
                            <FileDropZone
                                onChange={(data: Array<Blob>) => {
                                    handleDropZone(data)
                                }}
                                accept={IMAGE_ACCEPT}
                                maxFiles={1}
                                width={620}
                                height={201}
                                multipleFiles={false}
                            />
                        </div>
                    </div>
                        :
                        <div className="mt-4 mb-10 flex items-center justify-center">
                            <div className="icon-result">
                                <img
                                    src={imageSrc}
                                    width={100}
                                    height={80}
                                    className='rounded-md'
                                    alt="Picture of the author"
                                />
                                <div className="remove-icon text-center cursor-pointer" onClick={removeImage}>Remove icon</div>
                            </div>
                        </div>
                    }

                    <div className="flex justify-end w-full">
                        <div className="flex item-center space-x-3 actions-buttons">
                            <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                onClick={() => {
                                    {
                                        setImageToUpload(null)
                                        toggleModal()
                                    }
                                }}
                            >Cancel</div>
                            <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                style={!imageSrc ? {
                                    backgroundColor: "#bdbdbd",
                                    cursor: "not-allowed"
                                } : {}}
                                onClick={() => {
                                    imageSrc && !loading && upsertSetting(imageToUpload)
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