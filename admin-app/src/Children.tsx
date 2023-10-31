import Copyright from "./global-components/Copyright";
import Header from "./global-components/Header";
import SessionExpiredPopup from "./global-components/SessionExpiredPopup";
import { setSessionExpired } from "./redux/features/authSlice";
import { RootState } from "./redux/store";
import { LinksEnum } from "./utilities/pagesLinksEnum";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileSideMenu from "./global-components/MobileSideMenu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import PassForgot from "./pages/Forgotten-password/page";
import Custom404 from "./pages/Not-fount/page";
import { sign } from "crypto";
import { AuthContext, AuthStatus } from "./context/auth";
import UsersPage from "./pages/Users";
import IconePage from "./pages/Icons";
import ColorPage from "./pages/Colors";
import BrandPage from "./pages/Brands";
import CategoryPage from "./pages/Categories";
import BlogPage from "./pages/Blogs";
import BannerPage from "./pages/Banners";
import PartnersPage from "./pages/Partners";
import SellersPage from "./pages/Sellers";
import SellerDetailsPage from "./pages/Sellers/Details";
import ProductPage from "./pages/Products";
import RefusePage from "./pages/Refuse";

function Children({ isCollapsed, lng }: any) {
  const {signOut, authStatus} = useContext(AuthContext)
  const dispatch = useDispatch();
  const isSessionExpired = useSelector((state: RootState) => state.auth.isSessionExpired);

  const popUpAction = async () => {
    try {
      dispatch(setSessionExpired(false));
      await signOut();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      dispatch(setSessionExpired(false));
    }
  }, [authStatus])

  return <><div className={`ease-in-out transition-all h-full flex justify-center duration-500 ${!isCollapsed ? 'main-container' : 'main-container-collapsed'}`}>
    <div className={`w-full flex justify-center items-start h-full overflow-y-auto no-scrollbar`}>
      <div className="relative w-full min-h-screen h-full flex flex-col justify-start items-center">
        <Header />
        <Routes>
            < Route path={LinksEnum.home} element={ <Home /> } />
            < Route path={LinksEnum.users} element={ <UsersPage /> } />
            < Route path={LinksEnum.icons} element={ <IconePage /> } />
            < Route path={LinksEnum.colors} element={ <ColorPage /> } />
            < Route path={LinksEnum.brands} element={ <BrandPage /> } />
            < Route path={LinksEnum.categories} element={ <CategoryPage /> } />
            < Route path={LinksEnum.products} element={ <ProductPage /> } />
            < Route path={LinksEnum.product_cancelling} element={ <RefusePage /> } />
            < Route path={LinksEnum.blogs} element={ <BlogPage /> } />
            < Route path={LinksEnum.banners} element={ <BannerPage /> } />
            < Route path={LinksEnum.partners} element={ <PartnersPage /> } />
            < Route path={`${LinksEnum.sellers}/*`} element={ <SellersPage /> } />
            < Route path={`${LinksEnum.sellers}/:id`} element={ <SellerDetailsPage /> } />
            < Route path={LinksEnum.not_found} element={ <Custom404 /> } />
            <Route path={'*'} element={<Navigate to={LinksEnum.not_found}/>}/>
            <Route path={LinksEnum.login} element={<Navigate to={LinksEnum.home} />} />
          </Routes>
        <Copyright lng={lng} />
        <ToastContainer icon={false} closeButton={false} />
        {isSessionExpired && <SessionExpiredPopup action={popUpAction} />}
      </div>
    </div>
  </div>
  <MobileSideMenu/>
  </>;
}

export default Children;
