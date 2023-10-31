"use client";
import { setCollapse } from "./redux/features/sidebarSlice";
import { RootState } from "./redux/store";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Login from "./pages/Login";
import PassForgot from "./pages/Forgotten-password/page";
import Sidebar from "./global-components/SideMenu";
import Children from "./Children";
import PassChange from "./pages/Password-change/page";
import { config } from "./utilities/helper";
import AuthProvider, { AuthIsSignedIn, AuthIsNotSignedIn } from "./context/auth";
import { LinksEnum } from "./utilities/pagesLinksEnum";


function App({ children }: any) {
  const {pathname} = useLocation();
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname]);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 0 && window.innerWidth <= 1400)
        dispatch(setCollapse(true));
      else dispatch(setCollapse(false));
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {

    let link: any = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = theme === 'light' ? config.tims_icon_official : config.tims_icon_officialtims_icon_white;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, isCollapsed]);

  return <><AuthProvider>
  <AuthIsSignedIn>
    <Sidebar />
    <Children isCollapsed={isCollapsed}>{children}</Children>
  </AuthIsSignedIn>

  <AuthIsNotSignedIn>
    <Routes>
      < Route path={LinksEnum.login} element={ <Login /> } />
      < Route path={LinksEnum.forgotten_password} element={ <PassForgot /> } />
      < Route path={LinksEnum.change_password} element={ <PassChange /> } />
      <Route path={LinksEnum.home} element={<Navigate to={LinksEnum.login} />} />
      <Route path={'*'} element={<Navigate replace to={LinksEnum.login} state={{ pathname: pathname }} />} />
    </Routes>
  </AuthIsNotSignedIn>

</AuthProvider></>
}

export default App;
