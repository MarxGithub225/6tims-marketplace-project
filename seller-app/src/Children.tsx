import Copyright from "./global-components/Copyright";
import Header from "./global-components/Header";
import SessionExpiredPopup from "./global-components/SessionExpiredPopup";
import { setSessionExpired } from "./redux/features/authSlice";
import { RootState } from "./redux/store";
import { LinksEnum } from "./utilities/pagesLinksEnum";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileSideMenu from "./global-components/MobileSideMenu";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Custom404 from "./pages/Not-fount/page";
import { AuthContext, AuthStatus } from "./context/auth";
import ProductPage from "./pages/Products";

function Children({ isCollapsed, lng }: any) {
  const {signOut, authStatus } = useContext(AuthContext)
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
            < Route path={LinksEnum.products} element={ <ProductPage /> } />
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
