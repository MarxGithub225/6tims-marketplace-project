/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useState } from 'react'
import { ScaleLoader } from "react-spinners";
import FileDropZone from "../../../../global-components/FileDropZone";
import { Blob } from "buffer";
import { IMAGE_ACCEPT } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import { CreateRequest } from '../../../../sdks/brand-v1/utils/DataSchemas';

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
    label: "",
    suspended: false
}

function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle}: AddSettingProps) {

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
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
                        <div className="custom-input-group-label">Label</div>
                        <input
                            name='label'
                            value={currentSetting?.label}
                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                            onChange={handleChange}
                            placeholder={'Add label'}
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
                                style={!currentSetting?.label?.trim() ? {
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