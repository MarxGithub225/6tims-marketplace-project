"use client";

import React, { useContext, useRef, useState } from "react";
import {ReactComponent as Bell} from "../../assets/icons/BellIcon.svg";
import {ReactComponent as Logo} from "../../assets/icons/Logo/MobileLogo.svg"
import {ReactComponent as MenuIcon} from "../../assets/icons/MenuIcon.svg"
import {ReactComponent as EmptyPic} from "../../assets/icons/EmptyPic.svg";
import {ReactComponent as DashIcon} from "../../assets/icons/LightSunIcon.svg";
import {ReactComponent as DarkMoon} from "../../assets/icons/DarkMoon.svg";

import useOnClickOutSide from "../../utilities/onClickOutSide";
import {ReactComponent as LeftArrow}  from "../../assets/icons/LeftArrow.svg";
import {ReactComponent as Arrow}  from "../../assets/icons/Arrow.svg";
import {ReactComponent as People}  from "../../assets/icons/People.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/features/themeSlice";
import { RootState } from "../../redux/store";
import {ReactComponent as MenuUser} from "../../assets/icons/MenuUser.svg";
import {ReactComponent as MenuGear} from "../../assets/icons/MenuGear.svg";
import {ReactComponent as OrganisationIcon} from "../../assets/icons/side-bar-icons/OrganisationIcon.svg";
import {ReactComponent as MenuLogout} from "../../assets/icons/MenuLogout.svg";
import {ReactComponent as MenuStats} from "../../assets/icons/MenuStats.svg";
// import { delTokens } from "../../utilities/apiFetchers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import { setUserInfos } from "../../redux/features/authSlice";
import { setBackButton, setMobileSidemenu } from "../../redux/features/headerSlice";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../../utilities/helper";
import { AuthContext } from "../../context/auth";

interface HeaderProps {
    title?: string;
    page?: string;
    noTitle?: boolean;
    backButton?: boolean;
}

function Header({ noTitle = false }: HeaderProps) {
    const router = useNavigate();
    
    const { sessionInfo, signOut } = useContext(AuthContext)
    let notificationsRef: any = useRef();
    let profileRef: any = useRef();
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const title = useSelector((state: RootState) => state.header.title);
    const page = useSelector((state: RootState) => state.header.page);
    const userInfos: any = useSelector((state: RootState) => state.auth.userInfos);
    const backButton = useSelector((state: RootState) => state.header.backButton);
    const noHeader = useSelector((state: RootState) => state.header.noHeader);
    const headerBreadcrumbData = useSelector((state: RootState) => state.auth.headerBreadcrumbData)

    const [showNotifications, setShowNotification] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    useOnClickOutSide(notificationsRef, () => setShowNotification(false));
    useOnClickOutSide(profileRef, () => setShowProfile(false));

    const getUserInfos = async () => {
        return {}
    }

    useQuery({
        queryFn: async () => await getUserInfos(),
        onSuccess: (response) => {
            dispatch(setUserInfos(response))
        }
    })

    const mutation = useMutation({
        mutationFn: async () => await logout(),
        onSuccess: (res: any) => {
            router(LinksEnum.login);
        },
        onError: (e: any) => {
            console.log("error ", e);
            router(LinksEnum.login);
        },
    });

    const logout = async () => {
        try {
            await signOut();
          } catch (err) {
            console.error(err);
          }
    };

    if (noHeader) return <></>;

    const goBack = () => {
        dispatch(setBackButton(false))
        router(-1)
    }

    return (
        <>
            <div className="page-content flex justify-center">
                <div className="max-width w-full my-8 flex items-center justify-between">
                    <div className="flex item-center">
                        {backButton && (
                            <div className="back-button mr-3" onClick={goBack}>
                                <LeftArrow className="h-5 w-auto" />
                            </div>
                        )}
                        {!backButton && <div className="otherWidth:hidden flex items-center space-x-3 logo-brand">
                            <img className="h-6 w-auto" src={config.tims_icon_official} alt="" />
                            <MenuIcon className="h-4 w-auto menu-icon"
                                onClick={() => {
                                    dispatch(setMobileSidemenu(true))
                                }}
                            />
                        </div>}
                        {title !== "" && (
                            <div className="hidden otherWidth:block header-title">
                                {title}
                            </div>
                        )}
                    </div>


                    <div className="header-menu flex space-x-5 items-center">
                        <div
                            className={`flex cursor-pointer items-center ${theme === "light"
                                ? "theme-button-light  transform rotate-180"
                                : "theme-button-dark"
                                }`}
                            onClick={() =>
                                dispatch(setTheme(theme === "light" ? "dark" : "light"))
                            }
                        >
                            {theme === "light" ?<DashIcon className="h-5 w-auto" />:
                            <DarkMoon className="h-5 w-auto moon-svg-icon" />}
                        </div>
                        <div className="relative notifications">
                            <div className="relative bell-icon">
                                <Bell
                                    className="w-auto h-5 cursor-pointer"
                                    onClick={() => setShowNotification(!showNotifications)}
                                />
                                <div
                                    className="absolute -top-2 -right-1 w-1.5 h-1.5 rounded-full"
                                    style={{ background: "#FBB0BF" }}
                                />
                            </div>
                        </div>
                        <div className="user-profile">
                            <div className="relative pic-icon"
                                        ref={profileRef}>
                                {userInfos && userInfos?.image?.is_active ? <button type="button"
                                    className="w-10 h-10 rounded-full bg-center bg-cover bg-no-repeat cursor-pointer"
                                    onClick={() => setShowProfile(!showProfile)}
                                    style={{
                                        backgroundImage: `url(\'${process.env.NEXT_PUBLIC_VROOM_STATIC + userInfos?.image?.path}'\)`,
                                    }}/>
                                    : <button onClick={() => setShowProfile(!showProfile)} type="button"><EmptyPic className="h-8 w-auto empty-pic-svg"  /></button>}
                                {showProfile && (
                                    <div
                                        className="absolute right-0 top-12 user-dowpdown"
                                    >
                                        <Link
                                            to={`${LinksEnum.users_settings}/${sessionInfo?.userInfo?.id}`}
                                            onClick={() => setShowProfile(!showProfile)}
                                            className="dropdown-menu-item flex items-center"
                                        >
                                            <MenuUser className="h-4 w-auto mr-3" /> Profile
                                        </Link>
                                        <div className="user-dowpdown-divider-content">
                                            <div className="user-dowpdown-divider"></div>
                                        </div>
                                        <Link
                                            to={LinksEnum.home}
                                            className="dropdown-menu-item flex items-center"
                                        >
                                            <MenuStats className="h-4 w-auto mr-3" /> Analytics
                                        </Link>
                                        <div className="user-dowpdown-divider-content">
                                            <div className="user-dowpdown-divider"></div>
                                        </div>
                                        <Link
                                            to={LinksEnum.home}
                                            className="dropdown-menu-item flex items-center"
                                        >
                                            <MenuGear className="h-4 w-auto mr-3" /> Settings
                                        </Link>
                                        <div className="user-dowpdown-divider-content">
                                            <div className="user-dowpdown-divider"></div>
                                        </div>
                                        <div
                                            className={`dropdown-menu-item logout flex items-center ${mutation.isLoading ? "cursor-not-allowed" : "cursor-pointer"
                                                }`}
                                            onClick={() => mutation.mutate()}
                                        >
                                            <MenuLogout className="h-4 w-auto mr-3" />{" "}
                                            {mutation.isLoading ? "Loading..." : "Logout"}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {title !== "" && (
                <div className="otherWidth:hidden flex justify-center  max-width w-full">
                    <div className="header-title">
                        {title === "user-details" ? (
                            <div className="user-breadcrumb flex items-center space-x-8">
                                <People className="w-5 h-auto" />
                                <div className="user-breadcrumb-item capitalize">{headerBreadcrumbData?.role}</div>
                                <Arrow className="h-3 w-auto ml-2" />
                                <p onClick={() => router(-1)}
                                    className={`user-breadcrumb-item cursor-pointer line-clamp-1 ${!headerBreadcrumbData ? 'current' : ''}`}>{headerBreadcrumbData?.fullname}</p>
                                {headerBreadcrumbData?.page && <><Arrow className="h-3 w-auto ml-2" /><Link
                                    to='/gallery-brands'
                                    className="user-breadcrumb-item current">{headerBreadcrumbData?.page}</Link></>}
                            </div>
                        ) : title === "booking-details" ? (
                            <div className="user-breadcrumb flex items-center space-x-8">
                                <div className="booking-breadcrumb-item">Booking details</div>

                                {page && (
                                    <>
                                        <Arrow className="h-3 w-auto ml-2" />
                                        <Link
                                            to={LinksEnum.products}
                                            className="user-breadcrumb-item current-booking"
                                        >
                                            {page}
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>{title}</>
                        )}
                    </div>
                </div>

            )}
        </>

    );
}

export default Header;
