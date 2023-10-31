"use client"

import { useContext, useRef, useState } from "react";
import {ReactComponent as Close} from "../../assets/icons/Close.svg"

import { Link, useLocation, useParams } from "react-router-dom";
import classnames from 'classnames';
import { useTranslation } from '../../i18n/client'
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import { setMobileSidemenu } from "../../redux/features/headerSlice";
import {ReactComponent as DashIcon} from "../../assets/icons/side-bar-icons/DashboardIcon.svg"
import {ReactComponent as Saved} from "../../assets/icons/side-bar-icons/SavedIcon.svg"
import {ReactComponent as Users} from "../../assets/icons/side-bar-icons/UserIcon.svg"
import {ReactComponent as Gear} from "../../assets/icons/side-bar-icons/SettingsIcon.svg"
import {ReactComponent as CategoryIcon} from "../../assets/icons/side-bar-icons/CategoryIcon.svg";
import {ReactComponent as OrganisationIcon} from "../../assets/icons/side-bar-icons/OrganisationIcon.svg";
import {ReactComponent as FrantIcon} from "../../assets/icons/FrantIcon.svg";
import {ReactComponent as HorizontalTwiceArrow} from "../../assets/icons/HorizontalTwiceArrow.svg";
import {ReactComponent as LeftArrow} from "../../assets/icons/LeftArrow.svg";
import {ReactComponent as MenuStats} from "../../assets/icons/MenuStats.svg";
import {ReactComponent as MoneyIcon} from "../../assets/icons/MoneyIcon.svg";
import {ReactComponent as HelpCenter} from "../../assets/icons/Sidebar/HelpCenter.svg";
import {ReactComponent as ZoomIcon} from "../../assets/icons/ZoomIcon.svg";
import {ReactComponent as SellerIcon} from "../../assets/icons/CommunityIcon.svg";
import {ReactComponent as Theme} from "../../assets/icons/website/Theme.svg";
import {ReactComponent as WarantyTermsIcon} from "../../assets/icons/WarantyTermsIcon.svg";
import {ReactComponent as Listings} from "../../assets/icons/Sidebar/Listings.svg";
import {ReactComponent as BookingIcon} from "../../assets/icons/side-bar-icons/BookingIcon.svg";
import { MenuInterface, MenuItemInterface } from "../SideMenu";

import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import { config } from "../../utilities/helper";
import { AuthContext } from "../../context/auth";
function MobileSideMenu() {
    let menuRef: any = useRef()
    const { isMaster } = useContext(AuthContext)
    const dispatch = useDispatch();
    let mobileSideRef: any = useRef()
    const {pathname} = useLocation();
    const {lng} = useParams();
    const { t } = useTranslation(lng ?? 'fr', 'common')
    const theme = useSelector((state: RootState) => state.theme.theme)
    const mobileSidemenu = useSelector((state: RootState) => state.header.mobileSidemenu)
    
    const [menuSelected, setMenuSelected] = useState<MenuInterface>()

    const [modalOpened, setModalOpen] = useState<boolean>(false)

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const getActiveClassname = (link?: string, linkExtend?: Array<string>) => {
        const extendLings = () => {
            if (linkExtend) {
                linkExtend.forEach(element => {
                    return pathname === element ? link : ''
                });
            } else return ''
        }
        return classnames({
            'active-menu': linkExtend ? pathname === extendLings() : pathname === link
        })
    }

    const getActiveClassnameSubmenu = (link?: string, linkExtend?: Array<string>) => {
        const extendLings = () => {
            if (linkExtend) {
                linkExtend.forEach(element => {
                    return pathname === element ? link : ''
                });
            } else return ''
        }
        return classnames({
            'active-sub-menu': linkExtend ? pathname === extendLings() : pathname === link
        })
    }

    const menuItems = [
        {
            header: '',
            menu: [
                {
                    link: LinksEnum.home,
                    title: t('dashboard'),
                    icon: <DashIcon className="w-6 h-auto" />,
                    master: false
                }
            ]
        },
        {
            header: t('general.title'),
            menu: [
                {
                    link: LinksEnum.partners,
                    title: t('general.partners'),
                    icon: <OrganisationIcon className="w-6 h-auto" />,
                    master: true
                },
                {
                    link: LinksEnum.sellers,
                    title: t('general.sellers'),
                    icon: <SellerIcon className="w-6 h-auto" />,
                    master: true
                },
                {
                    link: LinksEnum.users,
                    title: t('general.users'),
                    icon: <Users className="w-6 h-auto" />,
                    master: false
                },
                // {
                //     link: LinksEnum.user_groups,
                //     title: t('general.user_access'),
                //     icon: <UserRole />,
                //     master: false
                // }
            ]

        },

        {
            header: t('manage.title'),
            menu: [
                {
                    link: LinksEnum.orders,
                    title: t('manage.orders'),
                    icon: <FrantIcon className="w-4 h-auto" />,
                    master: false
                },
                {
                    link: LinksEnum.products,
                    title: t('manage.products'),
                    icon: <HelpCenter className="w-4 h-auto" />,
                    master: false
                },
                {
                    link: LinksEnum.product_cancelling,
                    title: t('manage.product_cancelling'),
                    icon: <ZoomIcon className="w-4 h-auto" />,
                    master: false
                },
                {
                    link: LinksEnum.returns,
                    title: t('manage.returns'),
                    icon: <LeftArrow className="w-4 h-auto" />,
                    master: false
                },
                {
                    title: t('manage.settings'),
                    icon: <Gear />,
                    master: true,
                    subMenu: [
                        {
                            link: LinksEnum.icons,
                            title: t('manage.icons'),
                            icon: <BookingIcon className="w-5 h-auto" />,
                            master: true
                        },
                        {
                            link: LinksEnum.blogs,
                            title: t('manage.blogs'),
                            icon: <Saved className="w-4 h-auto" />,
                            master: true
                        },
                        {
                            link: LinksEnum.brands,
                            title: t('manage.brands'),
                            icon: <Listings className="w-4 h-auto" />,
                            master: true
                        },
                        {
                            link: LinksEnum.banners,
                            title: t('manage.banners'),
                            icon: <WarantyTermsIcon className="w-4 h-auto" />,
                            master: true
                        },
                        {
                            link: LinksEnum.categories,
                            title: t('manage.cartegories'),
                            icon: <CategoryIcon className="w-5 h-auto" />,
                            master: true
                        },
                        {
                            link: LinksEnum.colors,
                            title: t('manage.colors'),
                            icon: <Theme className="w-5 h-auto" />,
                            master: true
                        }
                    ]
                }

            ]

        },

        {
            header: t('accounting.title'),
            menu: [
                {
                    link: LinksEnum.clients_refunds,
                    title: t('accounting.clients_refunds'),
                    icon: <HorizontalTwiceArrow className="w-6 h-auto" />,
                    master: false
                },
                {
                    link: LinksEnum.sellers_accounting,
                    title: t('accounting.sellers_accounting'),
                    icon: <MoneyIcon className="w-5 h-auto" />,
                    master: false
                }
            ]

        },
        {
            header: t('data.title'),
            menu: [
                {
                    link: LinksEnum.statistics,
                    title: t('data.statistics'),
                    icon: <MenuStats className="w-5 h-auto" />,
                    master: false
                },
            ]
        }
    ]

    useOnClickOutSide(mobileSideRef, () => dispatch(setMobileSidemenu(false)))
    useOnClickOutSide(menuRef, () => {setMenuSelected(undefined)})
    return <div 
    ref={mobileSideRef}
    className={`block otherWidth:hidden mobile-side-shadow ease-in-out transition-all duration-500 fixed h-screen top-0 left-0 side-bar overflow-y-auto no-scrollbar transform ${!mobileSidemenu ? '-translate-x-[100%]' : 'translate-x-0'}`}>
        <div className="px-7">
            <div className="flex items-center justify-between w-full">
                <div className="logo-brand">
                <img className="h-8 w-auto" src={theme === 'light' ? config.tims_logo_oficiel: config.tims_logo_white} alt="" />
                </div>

                <Close className="h-3 w-auto mobile-close" onClick={() => dispatch(setMobileSidemenu(false))}/>
            </div>
            

            <div className="menu-items">
            {menuItems.map((item: MenuItemInterface, key: number) => {
                if (key === (menuItems.length - 1) && isMaster) {
                    return <></>
                }
                return <div className="menu-item" key={key} >
                    {item?.header && <div className="menu-header"> {item?.header} </div>}
                    {item?.menu && <div className="menu-list">
                        {
                            item?.menu.map((m: MenuInterface, index: number) => {
                                if (!m?.master) {
                                    return <>
                                        {!m?.subMenu ? <Link className={`menu ${getActiveClassname(m.link)}`} to={m.link ?? ''} key={index} >
                                            <div className="m-icon flex items-center"> {m.icon} </div>
                                            <div className="m-title"> {m.title} </div>
                                          </Link>: <div ref={menuRef}  className="w-full">
                                            <div className={`menu justify-between ${menuSelected?.title === m.title ? 'active-menu': ''}`} key={index}
                                            onClick={() => {
                                                if(menuSelected) {
                                                    setMenuSelected(undefined)
                                                }else {
                                                    setMenuSelected(m)
                                                }
                                            }}
                                            >
                                                <div className="flex items-center">
                                                    <div className="m-icon flex items-center"> {m.icon} </div>
                                                    <div className="m-title"> {m.title} </div>
                                                </div>
                                                <Arrow  className={`menu-arrow-multiple w-2 h-auto transform ${menuSelected?.title === m.title ? 'rotate-90': '-rotate-90'}`} />
                                            </div>
                                            {menuSelected?.title === m.title &&  <div className="mt-3 sub-menu-items">
                                            {
                                                m?.subMenu?.map((subm: MenuInterface, subindex: number) => {
                                                    return <Link className={`menu ${getActiveClassnameSubmenu(subm.link)}`} to={subm.link ?? ''} key={subindex} >
                                                    <div className="m-icon flex items-center"> {subm.icon} </div>
                                                    <div className="m-title"> {subm.title} </div>
                                                </Link>
                                                })
                                            }
                                        </div>}
                                        </div>
                                        }
                                        
                                    </>
                                } else if (m?.master && isMaster) {
                                    return <>
                                    {!m?.subMenu ? <Link className={`menu ${getActiveClassname(m.link)}`} to={m.link ?? ''} key={index} >
                                        <div className="m-icon flex items-center"> {m.icon} </div>
                                        <div className="m-title"> {m.title} </div>
                                    </Link>: <div ref={menuRef}  className="w-full">
                                            <div className={`menu justify-between ${menuSelected?.title === m.title ? 'active-menu': ''}`} key={index}
                                            onClick={() => {
                                                if(menuSelected) {
                                                    setMenuSelected(undefined)
                                                }else {
                                                    setMenuSelected(m)
                                                }
                                            }}
                                            >
                                                <div className="flex items-center">
                                                    <div className="m-icon flex items-center"> {m.icon} </div>
                                                    <div className="m-title"> {m.title} </div>
                                                </div>
                                                <Arrow  className={`menu-arrow-multiple w-2 h-auto transform ${menuSelected?.title === m.title ? 'rotate-90': '-rotate-90'}`} />
                                            </div>
                                            {menuSelected?.title === m.title &&  <div className="mt-3 sub-menu-items">
                                            {
                                                m?.subMenu?.map((subm: MenuInterface, subindex: number) => {
                                                    return <Link className={`menu ${getActiveClassnameSubmenu(subm.link)}`} to={subm.link ?? ''} key={subindex} >
                                                    <div className="m-icon flex items-center"> {subm.icon} </div>
                                                    <div className="m-title"> {subm.title} </div>
                                                </Link>
                                                })
                                            }
                                        </div>}
                                        </div>}
                                    </>
                                } else return <></>
                            })
                        }
                    </div>}
                </div>
            })}
        </div>
        </div>

        <div className="copyright w-full mt-32">
            <div className="terms flex flex-col space-y-5 ml-14">
                <div className="terms-item" onClick={toggleModal} >Privacy Policy</div>
                <div className="terms-item" onClick={toggleModal}>Term of Use</div>
                <span>© 2021 All rights reserved</span>
            </div>
            
        </div>


    </div>;
}

export default MobileSideMenu;
