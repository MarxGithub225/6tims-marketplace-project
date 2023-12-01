/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../GlobalScreens/PageHeader";
import CustumButton from "../../../Components/CustumButton";
import CustomSelect from "../../../Components/CustomSelect";
import { useLocation, useNavigate } from "react-router-dom";
import useIcon from "../../../hooks/useIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { Icon } from "../../../sdks/icon-v1/utils/DataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import { CreateRequest, MorroccoCities } from "../../../sdks/user-v1/utils/DataSchemas";
import useUser from "../../../hooks/userUser";
import { notifyError, notifySuccess } from "../../../Components/CustomAlert";
import useAuth from "../../../hooks/useAuth";
import useNewsletter from "../../../hooks/useNewsletter";
import { AuthContext, AuthStatus } from "../../../context/auth";
const defaultValue: CreateRequest = {
  imageId:  null,
  role: "user",
  gender: "",
  lastName: "",
  firstName: "",
  email: "",
  address: {
      city: "",
      fullLocation: "",
      zipCode: "",
      phone: ""
  },
  deleted: false,
  suspended: false,
  newsletterSubscribed: true,
  password: ""
}
function RegisterPage() {
  const { signIn, authStatus } = useContext(AuthContext)
  const { client } = useAuth()
  const { client: newsletterClient } = useNewsletter()
  const { client: iconClient} = useIcon()
  const [imageSrc, setImageSrc] =
        useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [confirmation, setConfirmation] = useState<string>("")
  const search = useLocation().search;
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target
    setCurrentSetting({ ...currentSetting, [name]: value })
}

  const [currentSetting, setCurrentSetting] = useState<CreateRequest>(defaultValue)


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
    }
})

const upsertMutation = useMutation({
  mutationFn: async () => {
      return currentSetting && await client?.register(currentSetting)
  },
  onSuccess: async () => {
      await newsletterClient?.createNewsletter({email: currentSetting.email, suspended: false})
      notifySuccess({ message: `Inscription réussie !` })
      setLoading(false)
      if(search) {
        const urlRequest = new URLSearchParams(search).get('urlRequest');
        const tagData = new URLSearchParams(search).get('tag') ?? '';
        let tag='';
        if(tagData) {
          tag= `&tag=${tagData}`
        }
        window.location.href = `/login?redirect=true&urlRequest=${urlRequest}${tag}`
      }else {
        window.location.href = '/login'
      }
  },
  onError: (e: any) => {
      let error: string = "An error occured, please retry";
      if(e?.errors?.msg?.includes('duplicate')) {
          error = "DUPLICATED_DATA"
      } else error = e?.errors?.msg
      notifyError({ message: error })
  }
})

  const upSave = () => {
    setLoading(true)
    upsertMutation.mutate()
  }

  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      if(search) {
        const urlRequest = new URLSearchParams(search).get('urlRequest');
        const tagData = new URLSearchParams(search).get('tag') ?? '';
        let tag='';
        if(tagData) {
          tag= `?tag=${tagData}`
        }
        navigate(`${urlRequest}${tag}`)
      }else {
        navigate('/profile')
      }
    }
  }, [authStatus])
  return <>
  <PageHeader/>

  <section className="tf-login tf-section">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-12">
          <h2 className="tf-title-heading ct style-1">
          Créer votre compte sur 6tims
          </h2>
          <div className="flat-form box-login-social">
            <div className="box-title-login">
              <h5>Réseau social</h5>
            </div>
            <ul>
              <li>
                <a href="#" className="sc-button style-2 fl-button pri-3">
                  <i className="icon-fl-google-2" />
                  <span>Google</span>
                </a>
              </li>
              <li>
                <a href="#" className="sc-button style-2 fl-button pri-3">
                  <i className="icon-fl-facebook" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flat-form box-login-email">
            <div className="box-title-login">
              <h5>Ou</h5>
            </div>
            <div className="form-inner">
              <form action="#" id="contactform">
                <div className="flex items-center gap-4">
                  <input id="lastName" name="lastName" value={currentSetting.lastName} tabIndex={1}  aria-required="true" required type="text" placeholder="Nom" 
                  onChange={handleChange}
                  />
                  <input onChange={handleChange} id="firstName" name="firstName" value={currentSetting.firstName} tabIndex={1}  aria-required="true" required type="text" placeholder="Prénom(s)" />
                </div>
                <div className="flex items-center gap-4">
                <input onChange={handleChange} id="email" name="email" value={currentSetting.email} tabIndex={2}  aria-required="true" type="email" placeholder={"John@mail.com"} required />
                  <CustomSelect
                  value={currentSetting.gender}
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
                
                <div className="flex items-center gap-4">
                <input id="phone" name="phone" tabIndex={2} 
                onChange={handleChangeAdress}
                aria-required="true" type="text" placeholder={"Numéro de téléphone"} required />
                  <CustomSelect
                 value={currentSetting?.address?.city}
                 options={MorroccoCities}
                 onChange={handleSelectChangeCity}
                placeholder="Ville"
                />
                </div>

                <div className="flex items-center gap-4">
                  <input id="fullLocation" name="fullLocation"
                  value={currentSetting.address.fullLocation}
                  onChange={handleChangeAdress} 
                  tabIndex={1}  aria-required="true" required type="text" placeholder="Adresse complète" />
                  <input id="zipCode" name="zipCode"
                  onChange={handleChangeAdress} 
                  value={currentSetting.address.zipCode}
                  tabIndex={1}  aria-required="true" required type="text" placeholder="Code postale" />
                </div>

                <div className="flex items-center gap-4">
                  <input id="password" name="password"
                  onChange={handleChange} 
                  value={currentSetting.password}
                  tabIndex={1}  aria-required="true" required type="password" placeholder="Mot de passe" />
                  <input id="confirmation" name="confirmation"
                  onChange={(e: any) => setConfirmation(e.target.value)} 
                  value={confirmation}
                  tabIndex={1}  aria-required="true" required type="password" 
                  placeholder="Confirmation" />
                </div>

                <div className="custom-input-group my-5">
                    <div className="custom-input-group-label text-[17px] ">Choisir une icône</div>
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
                
                <CustumButton
                label="Créer votre compte"
                onclick={() => upSave()}
                backgroundColor="#f7a700"
                color="#fff"
                isLoading={loading}
                disabled={
                  currentSetting.lastName.trim() === "" ||
                  currentSetting.firstName.trim() === ""||
                  currentSetting.email.trim() === ""||
                  currentSetting.gender.trim() === ""||
                  currentSetting.address.fullLocation.trim() === ""||
                  currentSetting.address.city.trim() === ""||
                  currentSetting.address.zipCode.trim() === ""||
                  currentSetting.password.trim() === ""||
                  !currentSetting.imageId ||
                  currentSetting.password !== confirmation
                }
                />
                <div className="">
                    <label >J'ai déjà mon compte</label>, <a href="#" 
                    onClick={(e: any) => {
                      e.preventDefault()
                      if(search) {
                        const urlRequest = new URLSearchParams(search).get('urlRequest');
                        const tagData = new URLSearchParams(search).get('tag') ?? '';
                        let tag='';
                        if(tagData) {
                          tag= `&tag=${tagData}`
                        }
            
                        navigate(`/login?redirect=true&urlRequest=${urlRequest}${tag}`)
                      }else navigate('/login')
                    }}
                    className="forgot-pass">Me connecter</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </>;
}

export default RegisterPage;
