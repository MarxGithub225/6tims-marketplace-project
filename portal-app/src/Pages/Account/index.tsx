/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { Heart, Loader, LogOut, ShoppingBag, User } from "react-feather";
import { AuthContext } from "../../context/auth";
import { API_FILE_URL } from "../../utilities/constants";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Profile from "./pages/Profile";
import { useMutation } from "@tanstack/react-query";
function ProfilePage() {
  const { signOut, sessionInfo } = useContext(AuthContext)
  const menu = [
    {icon: <User/>, title: "Mon profile", link: "/account/profile"},
    {icon: <ShoppingBag/>, title: "Mes commandes", link: "/account/orders"},
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
                {/* <Route path={'orders'} element={ <Orders /> } />
                <Route path={'addresses'} element={ <Addresses /> } />
                <Route path={'bank-cards'} element={ <BankCards /> } />
                <Route path={'data/update'} element={ <UpdateData /> } />
                <Route path={'password/update'} element={ <UpdatePass /> } /> */}
            </Routes>
          
        </div>
      </div>

    </div>

  </div>
</section>

  </>;
}

export default ProfilePage;
