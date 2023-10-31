/* eslint-disable jsx-a11y/img-redundant-alt */
import CustomModal from '../../../global-components/CustomModal';
import CustomSelect from '../../../global-components/CustomSelect/CustomSelect';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { notifyError, notifySuccess } from '../../../global-components/CustomAlert';
import { transformArray } from '../../../utilities/functions';
import CustomButton from '../../../global-components/CustomButton';
import FileDropZone from '../../../global-components/FileDropZone';
import { API_FILE_URL, IMAGE_ACCEPT } from '../../../utilities/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {ReactComponent as FileIcon} from '../../../assets/icons/fileIcon.svg';
import { AdminRoles, MorroccoCities } from '../../../sdks/user-v1/utils/DataSchemas';
import useImage from '../../../hooks/useImage';
import { ScaleLoader } from 'react-spinners';
import useIcon from '../../../hooks/useIcon';
import { Pagination } from '../../../sdks/GlobalDataSchemas';
import { Icon } from '../../../sdks/icon-v1/utils/DataSchemas';
import { File } from '../../../sdks/image-v1/utils/DataSchemas';

type Inputs = {
    firstName: string
    lastName: string
    email: string
    address: {
        phone: string
        fullLocation: string
        zipCode: string
    }
};

interface AddUserFormProps {
    modalOpened: boolean
    groupName?: string
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean
}

const defaultValue: any = {
    imageId:  null,
    role: "",
    gender: "",
    address: {
        city: "",
    },
    deleted: false,
    suspended: false,
    newsletterSubscribed: false
}

function AddUserForm({ modalOpened, toggleModal, groupName = "User",  upsertSetting, currentSetting, setCurrentSetting, loading }: AddUserFormProps) {
    const { client } = useImage()
    const { client: iconClient} = useIcon()
    const [userType, setUserType] = useState<string>("")
    const [userCity, setUserCity] = useState<string>("")
    const [userGender, setUserGender] = useState<string>("man")
    const [user, setUser] = useState<any>(currentSetting)
    const [imageSrc, setImageSrc] =
        useState<any>(currentSetting?.image ? currentSetting?.image : null)

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const handleSelectChange = (selectedOption: any) => {
        setUserType(selectedOption?.value)
        setCurrentSetting({ ...currentSetting, role: selectedOption?.value})
    }

    const handleSelectChangeCity = (selectedOption: any) => {
        setUserCity(selectedOption?.value)
        setCurrentSetting({ ...currentSetting, address: {...currentSetting?.address, city: selectedOption?.value}})
    }

    const handleSelectChangeGender = (selectedOption: any) => {
        setUserGender(selectedOption?.value)
        setCurrentSetting({ ...currentSetting, gender: selectedOption?.value})
    }

    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        console.log('data', currentSetting)
        if (currentSetting?.role !== "" && currentSetting?.address?.city !== "" && currentSetting?.gender !== "" && !loading) {
            upsertSetting({...data, ...currentSetting, address: {...data.address, city: currentSetting.address.city}})
        }
    }



    const handleSelectImage = (data: File) => {
        setImageSrc(data)
        setCurrentSetting({ ...currentSetting, imageId: data?._id })
    }


    const { data: iconData, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['iconsData'],
        queryFn: async () => {
            let result: Pagination<Icon> = await iconClient.getAllIcones({ page: 1, limit: 100})
            return result?.docs
        },
        keepPreviousData: true
    })
    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="user-add"
        >
            <div className="px-12 py-7 no-scrollbar w-full"
            >
                <div className="modal-label">Add {groupName} information</div>
                <form className="m" onSubmit={handleSubmit(onSubmit)} id='user-form'>
                    <div >
                        <CustomSelect classname='user-select-dropdown' value={currentSetting?.role} width="100%" required={true} label={`Select role`}
                            placeholder='Choose' options={AdminRoles} onChange={handleSelectChange}
                        />
                    </div>

                    <div >
                        <CustomSelect classname='user-select-dropdown' value={currentSetting?.gender} width="100%" required={true} label={`Select gender`}
                            placeholder='Choose' options={[
                                {
                                    name: 'man', value: 'man'
                                },
                                {
                                    name: 'woman', value: 'woman'
                                }
                            ]} onChange={handleSelectChangeGender}
                        />
                    </div>

                    <div>
                        <div className="custom-input-group">
                            <div className="custom-input-group-label">First name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('firstName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.firstName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                defaultValue={user.firstName} />
                            {errors.firstName?.type === 'required' && <p style={{ color: 'red' }} role="alert">First name is required</p>}
                            {errors.firstName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">First name should have at least 5 characters</p>}
                        </div>
                        

                        <div className="custom-input-group">
                            <div className="custom-input-group-label">Last name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('lastName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.lastName ? "true" : "false"}
                                className='custom-input-group-value '
                                placeholder={"Doe"}
                                defaultValue={user.lastName} />
                            {errors.lastName?.type === 'required' && <p style={{ color: 'red' }} role="alert">Last name is required</p>}
                            {errors.lastName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Last name should have at least 5 characters</p>}
                        </div>
                        

                        <div className="custom-input-group">
                            <div className="custom-input-group-label">Email <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        maxLength: (v: any) => v.length <= 50,
                                        matchPattern: (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
                                    }
                                })}
                                aria-invalid={errors.email ? "true" : "false"}
                                className='custom-input-group-value'
                                placeholder={"john.doe@gmail.com"}
                                defaultValue={user.email} />
                            {errors.email?.type === 'required' && <p style={{ color: 'red' }} role="alert">Email is required</p>}
                            {errors.email?.type === 'maxLength' && <p style={{ color: 'red' }} role="alert">Email should have at most 50 characters</p>}
                            {errors.email?.type === 'matchPattern' && <p style={{ color: 'red' }} role="alert">Email address must be a valid address</p>}
                        </div>
                        

                        <div className="custom-input-group">
                            <div className="custom-input-group-label">Phone number <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('address.phone', { required: true })}
                                aria-invalid={errors.address?.phone ? "true" : "false"}
                                className='custom-input-group-value'
                                placeholder={"920977638"}
                                defaultValue={user.address?.phone} />
                            {errors.address?.phone?.type === 'required' && <p style={{ color: 'red' }} role="alert">Phone number is required</p>}
                        </div>

                        <div >
                        <CustomSelect classname='user-select-dropdown' value={currentSetting?.address?.city} width="100%" required={true} label={`Select city`}
                            placeholder='Choose' options={MorroccoCities} onChange={handleSelectChangeCity}
                        />
                        </div>

                        <div className="custom-input-group mb-5">
                            <div className="custom-input-group-label">Address</div>
                            <input
                                {...register('address.fullLocation', { required: true })}
                                aria-invalid={errors.address?.fullLocation ? "true" : "false"}
                                className='custom-input-group-value'
                                placeholder={"920977638"}
                                defaultValue={user.address?.fullLocation} />
                            {errors.address?.fullLocation?.type === 'required' && <p style={{ color: 'red' }} role="alert">Full address is required</p>}
                        </div>

                        <div className="custom-input-group mb-5">
                            <div className="custom-input-group-label">Zip code</div>
                            <input
                                {...register('address.zipCode', { required: true })}
                                aria-invalid={errors.address?.zipCode ? "true" : "false"}
                                className='custom-input-group-value'
                                placeholder={"00212"}
                                defaultValue={user.address?.zipCode} />
                            {errors.address?.zipCode?.type === 'required' && <p style={{ color: 'red' }} role="alert">Zip code is required</p>}
                        </div>

                        <div className="custom-input-check">
                            <label className={`option capitalize`}>
                                {`${currentSetting?.suspended ? 'Suspendu' : 'Pas suspendu'}`}
                                <input
                                    type="checkbox"
                                    checked={currentSetting?.suspended}
                                    value={currentSetting?.suspended}
                                    onChange={() => setCurrentSetting({ ...currentSetting, suspended: !currentSetting?.suspended})}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <div className="custom-input-check">
                            <label className={`option capitalize`}>
                                {`${currentSetting?.deleted ? 'Supprimé' : 'Pas supprimé'}`}
                                <input
                                    type="checkbox"
                                    checked={currentSetting?.deleted}
                                    value={currentSetting?.deleted}
                                    onChange={() => setCurrentSetting({ ...currentSetting, deleted: !currentSetting?.deleted})}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="custom-input-group my-5">
                            <div className="custom-input-group-label">Icone</div>
                            <div className="mt-4 w-full grid grid-cols-5 gap-4">
                            {iconData?.map((icon: Icon, key: number) => {
                                return <div className="custom-input-check">
                                <label className={`option capitalize`}>
                                <img
                                key={key}
                                src={API_FILE_URL + '/icons/' + icon?.path}
                                width={100}
                                height={80}
                                className='rounded-md'
                                alt="Picture of the author"
                                />
                                    <input
                                        type="checkbox"
                                        checked={imageSrc?._id === icon?._id}
                                        value={icon?._id}
                                        onChange={() => {
                                            handleSelectImage(icon)
                                        }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            })}
                            </div>
                        </div>

                        <div className="flex justify-end w-full mt-10">
                            <div className="flex item-center space-x-3 actions-buttons">
                                <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                    onClick={() => {setCurrentSetting(defaultValue) ; toggleModal()}}
                                >Cancel</div>
                                <CustomButton
                                    label={(currentSetting?._id ? 'Edit' : 'Create')}
                                    disabled={currentSetting?.role === "" || loading}
                                    classname='custom-button-40'
                                    background={'#E73A5D'}
                                    color={'#FFFFFF'}
                                    type="submit"
                                    isLoading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </CustomModal >
    )
}

export default AddUserForm