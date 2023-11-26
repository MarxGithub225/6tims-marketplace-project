/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { CreditCard, Edit, Heart, Home, Lock, Navigation, ShoppingBag, User } from "react-feather";
import author_db from '../../assets/images/author-db.jpeg'
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthStatus } from "../../context/auth";
import { API_FILE_URL } from "../../utilities/constants";
import useIcon from "../../hooks/useIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { Icon } from "../../sdks/icon-v1/utils/DataSchemas";
import useAuth from "../../hooks/useAuth";
import { notifySuccess, notifyError } from "../../Components/CustomAlert";
import useUser from "../../hooks/userUser";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import CustomSelect from "../../Components/CustomSelect";
import { MorroccoCities } from "../../sdks/user-v1/utils/DataSchemas";
function ProfilePage() {
  const { client } = useUser()
  const { client: iconClient} = useIcon()
  const { authStatus, sessionInfo, setUserInfo } = useContext(AuthContext)
  const menu = [
    {icon: <User/>, title: "Mon profile", link: "/account/profile"},
    {icon: <ShoppingBag/>, title: "Mes commandes", link: "/account/orders"},
    {icon: <Heart/>, title: "Mes favoris", link: "/favorites"},
    // {icon: <CreditCard/>, title: "Mes cartes", link: "/account/bank-cards"},
  ]

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

    const upsertMutation = useMutation({
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

    const handleSelectImage = (data: File) => {
      upsertMutation.mutate(data?._id)
    }


    const logout = () => {
      //   confirmAlert({
      //     title: 'Confirmation',
      //     message: 'Êtes-vous sûre de vouloir vous déconnecter ?',
      //     buttons: [
      //     {
      //         label: 'Oui, me deconnecter',
      //         onClick: async () => {
      //           localStorage.removeItem('userData')
      //           localStorage.removeItem('accessToken')
      //           localStorage.removeItem('refreshToken')
      
      //           setTimeout(() => {
      //             window.location.reload()
      //           }, 500);
      //         }
      //     },
      //     {
      //         label: 'Non, rester',
      //         onClick: () => console.log('ok') 
      //     }
      //     ]
      // });
      }
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
  return <>
  <PageHeader/>
   <section className="tf-dashboard tf-tab2">
  <div className="tf-container">
    <div className="row ">
      <div className="col-xl-3 col-lg-12 col-md-12">
        <div className="dashboard-user">
          <div className="dashboard-infor">
            <div className="avatar">
              <img src={`${API_FILE_URL}/icons/${sessionInfo?.userInfo?.image?.path}`} alt={`6tims | Tim's group - ${sessionInfo?.userInfo?.fullName}`} />
            </div>
            <div className="name">{sessionInfo?.userInfo?.fullName}</div>
            <div className="pax">{sessionInfo?.userInfo?.email}</div>
            <div className="description">
              {`${sessionInfo?.userInfo?.address?.city}, ${sessionInfo?.userInfo?.address?.fullLocation} - ${sessionInfo?.userInfo?.address?.zipCode}`}
            </div>
          </div>
          <div className="dashboard-filter">

            
            {menu.map((m: any, index: number) => {
                    return <div key={index}  className="menu-item flex items-center gap-x-3">
                    {m.icon}
                    <span>{m.title}</span>
                </div>
                })}
          </div>
        </div>
      </div>
      <div className="col-xl-9 col-lg-6 col-md-12 col-12">
        <div className="form-create-item">
          <div className="icons-tab">
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
          </div>
          <div className="flat-tabs tab-create-item">
            <h4 className="title-create-item">Select method</h4>
            <ul className="menu-tab tabs">
              <li className="tablinks active"><User />Informations personnelles</li>
              <li className="tablinks"><span className="icon-fl-clock" />Time Auctions</li>
              <li className="tablinks"><span className="icon-fl-icon-22" />Open For Bids</li>
            </ul>
            <div className="content-tab">
              <div className="content-inner">
                <form action="#">
                  <h4 className="title-create-item">Nom</h4>
                  <input type="text" id="lastName" name="lastName" placeholder="Nom" value={currentSetting?.lastName}
                  onChange={handleChange} />
                  <h4 className="title-create-item">Prénom</h4>
                  <input type="text" id="firstName" name="firstName" placeholder="Prénoms" value={currentSetting?.firstName}
                  onChange={handleChange} />
                  <div className="row-form style-3">
                    <div className="inner-row-form">
                      <h4 className="title-create-item">Ville</h4>
                     <CustomSelect
                      value={currentSetting?.address?.city}
                      options={MorroccoCities}
                      onChange={handleSelectChangeCity}
                      placeholder="Ville"
                      height={'h-[46px]'}
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
                </form>
              </div>
              <div className="content-inner">
                <form action="#">
                  <h4 className="title-create-item">Adresse complète</h4>
                  <input type="text"
                  id="fullLocation" name="fullLocation"
                  value={currentSetting?.address?.fullLocation}
                  onChange={handleChangeAdress} 
                  placeholder="Adresse complète"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>

  </>;
}

export default ProfilePage;
