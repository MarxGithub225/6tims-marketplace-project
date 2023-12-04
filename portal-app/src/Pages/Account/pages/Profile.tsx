import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { notifySuccess, notifyError } from "../../../Components/CustomAlert";
import CustomSelect from "../../../Components/CustomSelect";
import useIcon from "../../../hooks/useIcon";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { MorroccoCities } from "../../../sdks/user-v1/utils/DataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import { AuthContext, AuthStatus } from "../../../context/auth";
import useUser from "../../../hooks/userUser";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import { Icon } from "../../../sdks/icon-v1/utils/DataSchemas";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import CustumButton from "../../../Components/CustumButton";

function Profile() {

    const [passData, setPassData] = useState<any>({
        oldPassword: '',
        newPassword: ''
    })
    const [confirmPass, setConfirmPass] = useState<string>('')

    const { client: iconClient} = useIcon()
    const handleSelectChangeCity = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, address: {...currentSetting?.address, city: selectedOption?.value}})
     }
     const handleChangeAdress = (e: any) => {
      e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, address: {...currentSetting?.address, [name]: value}})
    }
    const handleSelectChangeGender = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, gender: selectedOption?.value})
    }

    const { data: iconData, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['iconsData'],
        queryFn: async () => {
            let result: Pagination<Icon> = await iconClient.getAllIcones({ page: 1, limit: 100})
            return result?.docs
        }
    })
    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
    }
    const [currentSetting, setCurrentSetting] = useState<any>(null)

    const upsertMutationProfileImage = useMutation({
        mutationFn: async (id: string) => {
            return await client?.updateProfile(sessionInfo?.userInfo?.id, {...sessionInfo?.userInfo, imageId: id})
        },
        onSuccess: (response) => {
            notifySuccess({ message: `Icône changée avec succès !` })
            const simpleUser = {
                ...sessionInfo?.userInfo,
                imageId: response.imageId,
                image: response.image
            }
            setUserInfo(simpleUser)
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const upsertMutationProfile: any = useMutation({
        mutationFn: async () => {
            return await client?.updateProfile(sessionInfo?.userInfo?.id, {...currentSetting, fullName: `${currentSetting.firstName} ${currentSetting.lastName}`,})
        },
        onSuccess: (response) => {
            notifySuccess({ message: `Profile modifié avec succès !` })
            setUserInfo(currentSetting)
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const upsertMutationPassword: any = useMutation({
        mutationFn: async () => {
            return await client?.changePassword(passData)
        },
        onSuccess: (response) => {
            notifySuccess({ message: `Mot de passe modifié avec succès !` })
            setPassData({
                oldPassword: '',
                newPassword: ''
            })
            setConfirmPass('')
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })
  
      const handleSelectImage = (data: File) => {
        upsertMutationProfileImage.mutate(data?._id)
      }

      const { client } = useUser()
      const { authStatus, sessionInfo, setUserInfo } = useContext(AuthContext)

      const navigate = useNavigate()

      useEffect(() => {
        if(authStatus === AuthStatus.SignedOut ) {
          navigate('/')
          let errMessage = "Aucun compte connecté. Merci de vous connecter";
          toast.error(
          errMessage,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }else {
          setCurrentSetting(sessionInfo?.userInfo)
        }
      }, [])
  return <>
    {/* <h4 className="title-create-item mb-[20px]">Changer d'icône</h4>
    <div className="icons-tab mb-[20px]">
    
        {iconData?.map((icon: Icon, key: number) => {
            return <div className="custom-input-check border border-color-gray w-[100px] ">
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
                    checked={sessionInfo?.userInfo?.imageId === icon?._id}
                    value={icon?._id}
                    onChange={() => {
                        handleSelectImage(icon)
                    }}
                />
                <span className="checkmark"></span>
            </label>
        </div>
        })}
    </div> */}
    <div className="flat-tabs tab-create-item mt-[30px] intermWidth:mt-[0px]">
    <div className="content-tab">
        <div className="content-inner">
            <h4 className="title-create-item mb-[20px]">Informations personnelles</h4>
            <div>
                <div className="row-form style-3">
                    <div className="inner-row-form">
                        <h4 className="title-create-item">Nom</h4>
                        <input type="text" className="mb-[24px]" id="lastName" name="lastName" placeholder="Nom" value={currentSetting?.lastName}
                        onChange={handleChange} />
                    </div>

                    <div className="inner-row-form">
                        <h4 className="title-create-item">Prénom</h4>
                        <input type="text" className="mb-[24px]" id="firstName" name="firstName" placeholder="Prénoms" value={currentSetting?.firstName}
                        onChange={handleChange} />
                    </div>
                    <div className="inner-row-form">
                        <h4 className="title-create-item">Genre</h4>
                        <CustomSelect
                            value={currentSetting?.gender}
                            options={[
                            {
                                name: 'man', value: 'man'
                            },
                            {
                                name: 'woman', value: 'woman'
                            }
                            ]}
                            onChange={handleSelectChangeGender}
                            placeholder="Genre"
                        />
                    </div>
                </div>
                
                <h4 className="title-create-item">E-mail</h4>
                <input type="email" className="mb-[24px]" id="email" readOnly name="email" placeholder="Adresse e-mail" value={currentSetting?.email}
                onChange={handleChange} />
                
                <div className="row-form style-3">
                <div className="inner-row-form">
                    <h4 className="title-create-item">Ville</h4>
                    <CustomSelect
                    value={currentSetting?.address?.city}
                    options={MorroccoCities}
                    onChange={handleSelectChangeCity}
                    placeholder="Ville"
                    height={'h-[56px]'}
                    marginBottom="mb-[24px]"
                    rounded={'rounded-[8px]'}
                    />
                </div>
                <div className="inner-row-form">
                    <h4 className="title-create-item">Code postale</h4>
                    <input type="text"
                    id="zipCode" name="zipCode"
                    onChange={handleChangeAdress} 
                    value={currentSetting?.address?.zipCode}
                    placeholder="Code postale"
                    />
                </div>
                <div className="inner-row-form">
                    <h4 className="title-create-item">Numéro de téléphone</h4>
                    <input type="text"
                    value={currentSetting?.address?.phone}
                    id="phone" name="phone"
                    onChange={handleChangeAdress}
                    placeholder={"Numéro de téléphone"}
                    />
                </div>
                </div>
                <h4 className="title-create-item">Adresse complète</h4>
                <input type="text"
                id="fullLocation" name="fullLocation"
                value={currentSetting?.address?.fullLocation}
                onChange={handleChangeAdress} 
                placeholder="Adresse complète"
                />
                <div className="inline-flex mt-[10px] ">
                <div className="w-full intermWidth:w-[300px]  ">
                <CustumButton
                label="Modifier"
                backgroundColor="#f7a700"
                color="#fff"
                onclick={() => !upsertMutationProfile?.isLoading && upsertMutationProfile.mutate()}
                isLoading={upsertMutationProfile?.isLoading}
                />
                </div>
                </div>
            </div>
        </div>
        <div className="content-inner mt-[30px] ">
            <h4 className="title-create-item mb-[20px]">Changer de mot de passe</h4>
            <div>
                <h4 className="title-create-item">Mot de passe actuel</h4>
                <input type="password" className="mb-[24px]" id="oldPassword" name="oldPassword" placeholder="******" value={passData?.oldPassword}
                onChange={(e: any) => setPassData({...passData, oldPassword: e.target.value})} />
                <h4 className="title-create-item">Nouveau mot de passe</h4>
                <input type="password" className="mb-[24px]" id="newPassword" name="newPassword" placeholder="******" value={passData?.newPassword}
                onChange={(e: any) => setPassData({...passData, newPassword: e.target.value})} />
                <h4 className="title-create-item">Confirmer le mot de passe</h4>
                <input type="password" className="mb-[24px]" id="confirmPass" name="confirmPass" placeholder="******" value={confirmPass}
                onChange={(e: any) => setConfirmPass(e.target.value)} />
                <div className="inline-flex mt-[10px] ">
                <div className="w-full intermWidth:w-[300px]  ">
                <CustumButton
                label="Changer"
                backgroundColor="#f7a700"
                color="#fff"
                disabled={!passData?.oldPassword || !passData?.newPassword || passData?.newPassword !== confirmPass}
                onclick={() => !upsertMutationPassword?.isLoading && upsertMutationPassword.mutate()}
                isLoading={upsertMutationPassword?.isLoading}
                />
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </>;
}

export default Profile;
