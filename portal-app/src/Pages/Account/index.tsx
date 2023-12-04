/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { Heart, Loader, LogOut, ShoppingBag, User } from "react-feather";
import { AuthContext, AuthStatus } from "../../context/auth";
import { API_FILE_URL } from "../../utilities/constants";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Profile from "./pages/Profile";
import { useMutation } from "@tanstack/react-query";
import { toast, Slide } from "react-toastify";
import Orders from "./pages/Orders";
import avatar  from '../../assets/images/avt-1.jpg'
function ProfilePage() {
  const { signOut, sessionInfo, authStatus } = useContext(AuthContext)
  const menu = [
    {icon: <User/>, title: "Mon profile", link: "/profile"},
    {icon: <ShoppingBag/>, title: "Mes commandes", link: "/profile/orders"},
    {icon: <Heart/>, title: "Mes favoris", link: "/favorites"},
    // {icon: <CreditCard/>, title: "Mes cartes", link: "/account/bank-cards"},
  ]

  const navigate = useNavigate()

  const mutation: any = useMutation({
    mutationFn: async () => {
      return await signOut();
    },
    onSuccess: (response) => {
      navigate('/')
    },
  });
  useEffect(() => {
  if(authStatus === AuthStatus.SignedOut) {
      navigate('/')
      let errMessage = "Aucun compte connecté. Merci de vous connecter";
      toast.error(
      errMessage,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
  }
  }, [authStatus])
  return <>
  <PageHeader/>
   <section className="tf-dashboard tf-tab2">
  <div className="tf-container">
    <div className="row ">
      <div className="col-xl-3 col-lg-12 col-md-12">
        <div className="dashboard-user shadow-lg " >
          <div className="dashboard-infor">
            <div className="avatar shadow">
            <img className="shadow-lg" src={avatar} alt={`6tims | Tim's group - ${sessionInfo?.userInfo?.fullName}`} />
            {/* <img className="shadow-lg" src={`${API_FILE_URL}/icons/${sessionInfo?.userInfo?.image?.path}`} alt={`6tims | Tim's group - ${sessionInfo?.userInfo?.fullName}`} /> */}
            </div>
            <div className="name">{sessionInfo?.userInfo?.fullName}</div>
            <div className="pax">{sessionInfo?.userInfo?.email}</div>
            <div className="description">
              {`${sessionInfo?.userInfo?.address?.city}, ${sessionInfo?.userInfo?.address?.fullLocation} - ${sessionInfo?.userInfo?.address?.zipCode}`}
            </div>
          </div>
          <div className="dashboard-filter">
            {menu.map((m: any, index: number) => {
                    return <div key={index} 
                    onClick={() => navigate(m.link)}
                    className="menu-item flex items-center gap-x-3">
                    {m.icon}
                    <span>{m.title}</span>
                </div>
            })}
             <div className="menu-item flex items-center gap-x-3"
             onClick={() => !mutation.isLoading && mutation.mutate()}
             >
                    {!mutation.isLoading ?<>
                    <LogOut/>
                    <span>Déconnexion</span>
                    </>: <><Loader className="animate-spin" /> &nbsp; Processing ...</>}
              </div>
          </div>
        </div>
      </div>
      <div className="col-xl-9 col-lg-6 col-md-12 col-12">
        <div className="form-create-item">
            <Routes>
                <Route path={''} element={ <Profile /> } />
                <Route path={'orders'} element={ <Orders /> } />
                
            </Routes>
          
        </div>
      </div>

    </div>

  </div>
</section>

  </>;
}

export default ProfilePage;
