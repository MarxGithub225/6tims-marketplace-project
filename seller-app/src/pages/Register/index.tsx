/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useRef, useState } from 'react'
import { ScaleLoader } from "react-spinners";
import { Blob } from "buffer";
import useImage from '../../hooks/useImage';
import { API_FILE_URL, DOCUMENT_ACCEPT, IMAGE_ACCEPT, hasLowerCase, hasNumber, hasSpecialChar, hasUppercase } from "../../utilities/constants";
import CustomModal from '../../global-components/CustomModal';
import { useMutation, useQuery } from '@tanstack/react-query'
import { notifyError } from "../../global-components/CustomAlert";
import { File } from '../../sdks/image-v1/utils/DataSchemas';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomButton from '../../global-components/CustomButton';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow.svg';
import { ReactComponent as FileIcon } from '../../assets/icons/fileIcon.svg';
import { CreateRequest } from '../../sdks/seller-v1/utils/DataSchemas';
import useIcon from '../../hooks/useIcon';
import { Pagination } from '../../sdks/GlobalDataSchemas';
import { Icon } from '../../sdks/icon-v1/utils/DataSchemas';
import CustomSelect from '../../global-components/CustomSelect/CustomSelect';
import { MorroccoCities } from '../../sdks/user-v1/utils/DataSchemas';
import useSeller from '../../hooks/useSeller';
import { CreateRequest as CreateRequestSeller } from '../../sdks/seller-v1/utils/DataSchemas';
import { LinksEnum } from '../../utilities/pagesLinksEnum';
import { Link } from 'react-router-dom';
import FileDropzone from '../../global-components/FileDropZone';

interface RegisterPageProps {
    modalOpened: boolean
    toggleModal: () => void
}

type Inputs = CreateRequest

const steps = [
    {
        id: 1,
        label: 'Personnal informations',
    },
    {
        id: 2,
        label: 'Location & Company informations',
    },
    {
        id: 3,
        label: 'Bank informations'
    },
    {
        id: 4,
        label: 'Information verification'
    }
]

function RegisterPage({ modalOpened, toggleModal}: RegisterPageProps) {
    const [success, setSuccess] = useState<boolean>(false)
    const [currentType, setCurrentType] =  useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null);
    const bankFileInputRef = useRef<HTMLInputElement>(null);
    const { client: iconClient} = useIcon()
    const { client: imageClient } = useImage()
    const { register, handleSubmit, watch, trigger, getValues, formState: { errors } } = useForm<Inputs>({ mode: "all" });
    let [stepActive, setStepActive] = useState<number>(0)
    let [confirmPassword, setPassword] = useState<string>("")
    let [identityType, setIdType] = useState<string>("")
    const [filteData, setFileData] = useState<any | null>(null)
    const currentSetting: any = null
    const { client } = useSeller()
    const [imageLoading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] =
        useState<any>( null)
    const [idFile, setIdFile] =
        useState<any>( null)
    const [bankFile, setBankFile] =
        useState<any>( null)
    const [bankFileData, setBankFileData] =
        useState<any>( null)
        const [userCity, setUserCity] = useState<string>("")
    
    const handleSelectChangeIDType = (selectedOption: any) => {
        setIdType(selectedOption?.value)
    }
    const removeFile = (data: any, type: string) => {
        setCurrentType(type)
        setLoading(true)
        !deleteMutation.isLoading && deleteMutation.mutate(data)
    }

    const removeImage = (data: any) => {
        setLoading(true)
        !deleteImageMutation.isLoading && deleteImageMutation.mutate(data)
    }


    const upsertMutation = useMutation({
        mutationFn: async (body: any) => {
            return await imageClient?.createFile(body)
        },
        onSuccess: (response: any) => {
            if(currentType === 'id_file') {
                setIdFile(response)
            } else {
                setBankFile(response)
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

    const upsertImageMutation = useMutation({
        mutationFn: async (body: any) => {
            return await imageClient?.createImage(body)
        },
        onSuccess: (response: any) => {
            setImageSrc(response)
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
        mutationFn: async (body: any) => await imageClient?.deleteFile(body?.folder, body?.path, body?.id),
        onSuccess: (response: any) => {
            if(currentType === 'id_file') {
                setIdFile(null)
                setFileData(null)
            } else {
                setBankFile(null)
                setBankFileData(null)
            }
            setLoading(false)
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
            setLoading(false)
        }
    })

    const deleteImageMutation = useMutation({
        mutationFn: async (body: any) => await imageClient?.deleteFile(body?.folder, body?.path, body?.id),
        onSuccess: (response: any) => {
            setImageSrc(null)
            setLoading(false)
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
            setLoading(false)
        }
    })

    const upsertFile = (file: Blob, path: string) => {
        setLoading(true)
        !upsertMutation.isLoading && upsertMutation.mutate({file, path})
    }

    const upsertImage= (image: Blob) => {
        setLoading(true)
        !upsertImageMutation.isLoading && upsertImageMutation.mutate({image, path: 'icon'})
    }

    const handleSelectChangeCity = (selectedOption: any) => {
        setUserCity(selectedOption?.value)
    }


    const checkStepCompleted = () => {
        if (stepActive === 0 && getValues('email')
        && getValues('password') 
        && (getValues('password') === confirmPassword)
        && getValues('personnalInfo.firstName') 
        && getValues('personnalInfo.lastName') 
        && identityType
        && getValues('personnalInfo.identityCardNumber') 
        && idFile) {
            return true
        } else if (stepActive === 1
            && userCity
            && imageSrc
            && getValues('personnalInfo.number') 
            && getValues('locationInfo.postalCode') 
            && getValues('companyInfo.companyName') 
            && getValues('companyInfo.commercialRegister') 
            && getValues('companyInfo.taxpayerAccountNumber') 
        ) {
            return true
        } else if (stepActive === 2 && getValues('bankInfo.rib') 
        && getValues('bankInfo.bankName') 
        && getValues('bankInfo.bankCode') 
        && getValues('bankInfo.iban') 
        && bankFile 
        && getValues('bankInfo.ownerFullName') ) {
            return true
        } else if (stepActive === 3) {
            return true
        } else {
            return false
        }
    }


    const handleFileChange = (event: any, type: string) => {
        setCurrentType(type)
        let input = event.target.files;
        if (!input) return;
        upsertFile(input[0], 'file')
        if(type === 'id_file') {
            setFileData(input[0])
        }else {
            setBankFileData(input[0])
        }
        
    };

    const addSeller = useMutation({
        mutationFn: async (data: CreateRequestSeller) => {
            return client.createSeller(data)
        },
        onSuccess: () => {
            console.log('ok')
            setSuccess(true)
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const handleDropZone = (data: Array<any>) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                upsertImage(data[0])
            };
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        const isValid = await trigger();
        if (isValid) {
            addSeller.mutate({ ...data,
                personnalInfo: {...data.personnalInfo, imageId: imageSrc?._id, identityCardType: identityType, identityCardFileId: idFile?._id},
                locationInfo: {...data.locationInfo, cityName: userCity},
                bankInfo: {...data.bankInfo, ribFileId: bankFile?._id},
                suspended: false,
                deleted: false
            })
        }
    }

    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="feature-add full-modal"
        >
            <div className="py-10 w-full h-auto flex justify-center">
               {!success ? <div className="no-scrollbar h-auto w-[100%] intermWidth:w-[992px]"
                >
                    <div className="modal-label">Registration</div>

                <div className="stepper w-full flex items-center justify-between">

                {steps.map((step: any, index: number) => {
                    return <div
                        className={`step ${(stepActive >= index) ? 'step-active' : ''} w-full flex items-center`}
                        key={index}>
                        <div className="step-label w-20 flex flex-col items-center">
                            <div className="step-number flex items-center justify-center">{step?.id}</div>
                            <span>{step?.label}</span>
                        </div>
                        <div
                            className={`relative step-separator ${(stepActive > index) ? 'step-separator-active' : ''} grow`}></div>
                    </div>
                })}

                </div>

                <div className="step-header px-[2px] mb-6">
                    <div className="step-header-label">
                        {steps[stepActive]?.label}
                    </div>
                    <div className="step-header-infos">
                        {stepActive < (steps.length - 1) ? 'Enter information and add scanned documents' : 'Check the information below and validate'}
                    </div>
                    {stepActive < (steps.length - 1) && <div className="step-header-requirements">
                        * Required fields
                    </div>}
                </div>
                <form className="mt-11" onSubmit={handleSubmit(onSubmit)} id='user-form'>
                {stepActive === 0 && <div
                        className="w-full flex justify-between otherWidth:justify-start flex-wrap gap-x-[60px] gap-y-6 px-0 bigTablet:px-[2px]">
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">First name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('personnalInfo.firstName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.personnalInfo?.firstName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.personnalInfo?.firstName?.type === 'required' && <p style={{ color: 'red' }} role="alert">First name is required</p>}
                                {errors.personnalInfo?.firstName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">First name should have at least 2 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Last name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('personnalInfo.lastName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.personnalInfo?.lastName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.personnalInfo?.lastName?.type === 'required' && <p style={{ color: 'red' }} role="alert">Last name is required</p>}
                            {errors.personnalInfo?.lastName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Last name should have at least 5 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                                <div className="custom-input-group-label"> Email <span style={{ color: "red" }}>*</span>
                                </div>
                                <input
                                    {...register('email', {
                                        required: true,
                                        validate: {
                                            maxLength: (v: any) => v.length <= 50,
                                            matchPattern: (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
                                        }
                                    })}
                                    aria-invalid={errors?.email ? "true" : "false"}
                                    type={"email"}
                                    className='custom-input-group-value custom-input-group-value-2 w-full'
                                    placeholder={"vroom@carrental.tg"} />
                            </div>
                            {errors?.email?.type === 'required' &&
                                <p style={{ color: 'red' }} role="alert">Email is required</p>}
                            {errors?.email?.type === 'minLength' &&
                                <p style={{ color: 'red' }} role="alert">Email should have at least 5
                                    characters</p>}
                            {errors?.email?.type === 'matchPattern' &&
                                <p style={{ color: 'red' }} role="alert">Email address must be a valid address</p>}
                        </div>

                        <div className="w-full itemWidth:w-[45%]">
                        <CustomSelect 
                        classname='user-select-dropdown' value={identityType} width="100%" required={true} label={`Select ID type`}
                            placeholder='Choose' options={[
                                {
                                    name: 'cni', value: 'cni'
                                },
                                {
                                    name: 'passport', value: 'passport'
                                },
                                {
                                    name: 'Certificat d\'identité', value: 'identity-certificate'
                                },
                                {
                                    name: 'Carte de résidence', value: 'resident-card'
                                }
                            ]} onChange={handleSelectChangeIDType}
                        />
                        </div>
                        
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">ID Number <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('personnalInfo.identityCardNumber', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.personnalInfo?.identityCardNumber ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"CNI N° 0000000"}
                                />
                                
                            </div>
                            {errors.personnalInfo?.identityCardNumber?.type === 'required' && <p style={{ color: 'red' }} role="alert">ID Number is required</p>}
                                {errors.personnalInfo?.identityCardNumber?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">ID Number should have at least 5 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group h-[72px] ">
                            <div className="custom-input-group-label">ID File <span style={{ color: "red" }}>*</span></div>
                            {!idFile ? <>
                                {imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>
                                :
                            <div className="m-0 p-0 flex justify-between">
                                <input
                                    id='id_file'
                                    name="id_file"
                                    onChange={(e: any) => handleFileChange(e, 'id_file')}
                                    className={`w-full custom-file-input`}
                                    placeholder="Add driving licence"
                                    type="file"
                                    accept={DOCUMENT_ACCEPT}
                                    ref={fileInputRef}
                                />
                                <FileIcon className="mr-2 file-input-icon cursor-pointer" onClick={() => fileInputRef.current?.click()} />
                            </div>}
                            </>  :<div className="m-0 p-0 flex justify-between">
                                    <div className='w-full driver-license'>
                                        {filteData?.name}
                                    </div>
                                    <div className="remove-file cursor-pointer" onClick={() => removeFile({folder: 'files', path: imageSrc?.path, id: imageSrc?._id}, 'id_file')}>Remove</div>
                                </div>
                            }
                            </div>
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Password <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('password', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 6,

                                    }
                                })}
                                aria-invalid={errors.password ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"*********"}
                                type='password'
                                />
                                
                            </div>
                            {errors.password?.type === 'required' && <p style={{ color: 'red' }} role="alert">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Password should have at least 6 characters</p>}
                            {(getValues('password') && !hasLowerCase(getValues('password'))) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 lowercase character</p>}
                            {(getValues('password') && !hasUppercase(getValues('password'))) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 uppercase character</p>}
                            {(getValues('password') && !hasNumber(getValues('password'))) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 number character</p>}
                            {(getValues('password') && !hasSpecialChar(getValues('password'))) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 character spècial character {`!@#$%^&*_+\-=\;':"\\|,.<>\/?`}</p>}
                        </div>

                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Confirmation <span style={{ color: "red" }}>*</span></div>
                            <input
                                 value={confirmPassword}   
                                className='custom-input-group-value w-full'
                                placeholder={"*********"}
                                type='password'
                                onChange={(e: any) => {
                                    setPassword(e.target.value)
                                }}
                                />
                                
                            </div>
                            {(confirmPassword !== getValues('password')) && <p style={{ color: 'red' }} role="alert">Mots de passe différents</p>}
                            {(confirmPassword && !hasLowerCase(confirmPassword)) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 lowercase character</p>}
                            {(confirmPassword && !hasUppercase(confirmPassword)) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 uppercase character</p>}
                            {(confirmPassword && !hasNumber(confirmPassword)) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 number character</p>}
                            {(confirmPassword && !hasSpecialChar(confirmPassword)) && <p style={{ color: 'red' }} role="alert">Password should have at least 1 character spècial character {`!@#$%^&*_+\-=\;':"\\|,.<>\/?`}</p>}
                        </div>

                    </div>}
                    {stepActive === 1 &&
                        <div className="w-full flex justify-between otherWidth:justify-start flex-wrap gap-x-[60px] gap-y-6 px-0 bigTablet:px-[2px]">
                        <div className="w-full itemWidth:w-[45%]">
                        <CustomSelect classname='user-select-dropdown' value={userCity} width="100%" required={true} label={`Select city *`}
                            placeholder='Choose' options={MorroccoCities} onChange={handleSelectChangeCity}
                        />
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Postal code <span style={{ color: "red" }}>*</span></div>
                                <input
                                    {...register('locationInfo.postalCode', {
                                        required: true,
                                        validate: {
                                            minLength: (v: any) => v.length >= 2,
                                        }
                                    })}
                                    aria-invalid={errors.locationInfo?.postalCode ? "true" : "false"}
                                    className='custom-input-group-value w-full'
                                    placeholder={"John"}
                                    />
                                    
                                </div>
                                {errors.locationInfo?.postalCode?.type === 'required' && <p style={{ color: 'red' }} role="alert">Postal code is required</p>}
                                    {errors.locationInfo?.postalCode?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Postal code should have at least 2 characters</p>}
                            </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Company name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('companyInfo.companyName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.companyInfo?.companyName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.companyInfo?.companyName?.type === 'required' && <p style={{ color: 'red' }} role="alert">Company name is required</p>}
                                {errors.companyInfo?.companyName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Company name should have at least 2 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Commercial register <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('companyInfo.commercialRegister', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.companyInfo?.commercialRegister ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.companyInfo?.commercialRegister?.type === 'required' && <p style={{ color: 'red' }} role="alert">Commercial register is required</p>}
                                {errors.companyInfo?.commercialRegister?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Commercial register should have at least 2 characters</p>}
                        </div>

                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Taxe payer account number <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('companyInfo.taxpayerAccountNumber', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.companyInfo?.taxpayerAccountNumber ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.companyInfo?.taxpayerAccountNumber?.type === 'required' && <p style={{ color: 'red' }} role="alert">Taxe payer account number is required</p>}
                                {errors.companyInfo?.taxpayerAccountNumber?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Taxe payer account number should have at least 2 characters</p>}
                        </div>

                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Contact <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('personnalInfo.number', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.personnalInfo?.number ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"ex: +212 97 97 97 97"}
                                />
                                
                            </div>
                            {errors.personnalInfo?.number?.type === 'required' && <p style={{ color: 'red' }} role="alert">Contact is required</p>}
                                {errors.personnalInfo?.number?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Contact should have at least 2 characters</p>}
                        </div>
                       
                        <div className="custom-input-group w-full">
                            <div className="custom-input-group-label">Company logo <span style={{ color: "red" }}>*</span></div>
                            {!imageSrc ? <div className="mt-10 flex items-center justify-center">
                            {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                                <ScaleLoader width={3} height={20} color="#F4A607" />
                            </div>
                            :
                                <div className="w-full">
                                    <FileDropzone
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
                        <div className="mt-4 flex items-center justify-center">
                            <div className="icon-result">
                                <img
                                    src={API_FILE_URL + '/icons/' + imageSrc?.path}
                                    width={100}
                                    height={80}
                                    className='rounded-md'
                                    alt="Picture of the author"
                                />
                                {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>:
                                <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                    removeImage({folder: 'icons', path: imageSrc?.path, id: imageSrc?._id})
                                }}>Remove image</div>}
                            </div>
                        </div>
                    }
                        </div>
                        </div>}
                    {stepActive === 2 &&
                        <div className="w-full flex flex-wrap gap-x-[60px] gap-y-6 px-0 bigTablet:px-[2px]">
                            
                        <div className="w-full itemWidth:w-[45%]">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Your RIB <span style={{ color: "red" }}>*</span></div>
                                <input
                                    {...register('bankInfo.rib', {
                                        required: true,
                                        validate: {
                                            minLength: (v: any) => v.length >= 2,
                                        }
                                    })}
                                    aria-invalid={errors.bankInfo?.rib ? "true" : "false"}
                                    className='custom-input-group-value w-full'
                                    placeholder={"John"}
                                    />
                                    
                                </div>
                                {errors.bankInfo?.rib?.type === 'required' && <p style={{ color: 'red' }} role="alert">Your RIB is required</p>}
                                    {errors.bankInfo?.rib?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Your RIB should have at least 2 characters</p>}
                            </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Bank name <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('bankInfo.bankName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.bankInfo?.bankName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.bankInfo?.bankName?.type === 'required' && <p style={{ color: 'red' }} role="alert">Bank name is required</p>}
                                {errors.bankInfo?.bankName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Bank name should have at least 2 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Bank code <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('bankInfo.bankCode', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.bankInfo?.bankCode ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.bankInfo?.bankCode?.type === 'required' && <p style={{ color: 'red' }} role="alert">Bank code is required</p>}
                                {errors.bankInfo?.bankCode?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Bank code should have at least 2 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">IBAN <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('bankInfo.iban', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.bankInfo?.iban ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.bankInfo?.iban?.type === 'required' && <p style={{ color: 'red' }} role="alert">IBAN is required</p>}
                                {errors.bankInfo?.iban?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">IBAN should have at least 2 characters</p>}
                        </div>

                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group">
                            <div className="custom-input-group-label">Bank account owner <span style={{ color: "red" }}>*</span></div>
                            <input
                                {...register('bankInfo.ownerFullName', {
                                    required: true,
                                    validate: {
                                        minLength: (v: any) => v.length >= 2,
                                    }
                                })}
                                aria-invalid={errors.bankInfo?.ownerFullName ? "true" : "false"}
                                className='custom-input-group-value w-full'
                                placeholder={"John"}
                                />
                                
                            </div>
                            {errors.bankInfo?.ownerFullName?.type === 'required' && <p style={{ color: 'red' }} role="alert">Bank account owner is required</p>}
                                {errors.bankInfo?.ownerFullName?.type === 'minLength' && <p style={{ color: 'red' }} role="alert">Bank account owner should have at least 2 characters</p>}
                        </div>
                        <div className="w-full itemWidth:w-[45%]">
                            <div className="custom-input-group h-[72px] ">
                            <div className="custom-input-group-label">RIB File <span style={{ color: "red" }}>*</span></div>
                            {!bankFile ? <>
                                {imageLoading ? <div className="flex justify-center my-10">
                                    <ScaleLoader width={3} height={20} color="#F4A607" />
                                </div>
                                :
                            <div className="m-0 p-0 flex justify-between">
                                <input
                                    id='bank_file'
                                    name="bank_file"
                                    onChange={(e: any) => handleFileChange(e, 'bank_file')}
                                    className={`w-full custom-file-input`}
                                    placeholder="Add driving licence"
                                    type="file"
                                    accept={DOCUMENT_ACCEPT}
                                    ref={bankFileInputRef}
                                />
                                <FileIcon className="mr-2 file-input-icon cursor-pointer" onClick={() => bankFileInputRef.current?.click()} />
                            </div>}
                            </>  :<div className="m-0 p-0 flex justify-between">
                                    <div className='w-full driver-license'>
                                        {bankFileData?.name}
                                    </div>
                                    <div className="remove-file cursor-pointer" onClick={() => removeFile({folder: 'files', path: imageSrc?.path, id: imageSrc?._id}, 'bank_file')}>Remove</div>
                                </div>
                            }
                            </div>
                        </div>

                        </div>}

                    {stepActive === (steps.length - 1) && <div className="step-resume px-0 bigTablet:px-[12px]">
                        <div className="step-resume-items">
                            <div className="step-resume-header">
                            Personnal informations
                            </div>
                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Image
                                </div>
                                <div className="step-resume-item-value">
                                    {imageSrc && <img className="w-auto h-10"
                                        src={API_FILE_URL + '/icons/' + imageSrc?.path} alt="" 
                                    />}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                ID File
                                </div>
                                {filteData && <div className="step-resume-item-value">
                                {filteData?.name}
                                </div>}
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    First name
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('personnalInfo.firstName')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Last name
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('personnalInfo.lastName')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    ID type
                                </div>
                                <div className="step-resume-item-value">
                                    {identityType}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Email
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('email')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    ID Number
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('personnalInfo.identityCardNumber')}
                                </div>
                            </div>
                           
                        </div>
                        <div className="step-resume-items">
                        <div className="step-resume-header">
                        Location & Company informations
                            </div>
                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                City
                                </div>
                                {userCity && <div className="step-resume-item-value">
                                {userCity}
                                </div>}


                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Postal code
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('locationInfo.postalCode')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Company name
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('companyInfo.companyName')}
                                </div>
                            </div>
                            
                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Commercial register
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('companyInfo.commercialRegister')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                Tax payer account number
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('companyInfo.taxpayerAccountNumber')}
                                </div>
                            </div>

                        </div>
                        <div className="step-resume-items">
                            <div className="step-resume-header">
                            Bank informations
                            </div>
                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    RIB
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('bankInfo.rib')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Bank name
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('bankInfo.bankName')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Bank code
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('bankInfo.bankCode')}
                                </div>
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    IBAN
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('bankInfo.iban')}
                                </div>
                            </div>
                            
                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                RIB File
                                </div>
                                {bankFileData && <div className="step-resume-item-value">
                                {bankFileData?.name}
                                </div>}
                            </div>

                            <div className="step-resume-item w-full flex items-center justify-between gap-x-3">
                                <div className="step-resume-item-label">
                                    Owner name
                                </div>
                                <div className="step-resume-item-value">
                                    {getValues('bankInfo.ownerFullName')}
                                </div>
                            </div>
                            
                        </div>

                    </div>}
                    <div className="flex justify-end w-full mt-10">
                        <div className="flex item-center space-x-3 actions-buttons">
                            {stepActive > 0 && <div
                                className=" w-32 flex items-center justify-center actions-buttons-cancel cursor-pointer gap-x-2"
                                onClick={() => setStepActive(stepActive - 1)}
                            ><Arrow className="w-2 h-auto transform -rotate-180 cropper-profile-close" />
                                <span>Previous</span></div>}
                            <div className="w-32">
                                <CustomButton
                                    label={<div className='flex items-center justify-center gap-x-2 next-arrow'>
                                        <span>{stepActive === steps.length - 1 ? 'Validate' : 'Next'}</span>{((stepActive > 0) && (stepActive < (steps.length - 1))) &&
                                            <Arrow className="w-2 h-auto" />}
                                    </div>}
                                    classname='custom-button-40'
                                    background={'#7963F0'}
                                    color={'#FFFFFF'}
                                    type={stepActive === steps.length ? "submit" : "button"}
                                    onClick={(e: any) => {
                                        if (checkStepCompleted() && stepActive !== steps.length)
                                            setStepActive(stepActive + 1)
                                    }
                                    }
                                    disabled={!checkStepCompleted()}
                                />
                            </div>
                        </div>
                    </div>
                    </form>
                </div>:
                <div className="no-scrollbar h-auto w-[100%] intermWidth:w-[992px]">
                        <div className="modal-label">Success !</div>

                        <div className="flex w-full flex-col items-center gap-4">
                        <p className='custom-input-group-label'>Your account has been created successfully.</p>
                        <p className='custom-input-group-label'>We are processing to some verification, before giving you access to your store.</p>
                        <p className='custom-input-group-label'>You will be soon contacted.</p>
                        <p className='custom-input-group-label'>Thanks.</p>

                             <div className="mt-4 login-reminber flex items-center justify-between">
                            <Link
                            onClick={(e: any) => {
                                e.preventDefault()
                                toggleModal()
                            }}
                            to={LinksEnum.login}>Go back.</Link>
                            </div>
                        </div>
                </div>
            }
            </div>

        </CustomModal>
    )
}

export default RegisterPage