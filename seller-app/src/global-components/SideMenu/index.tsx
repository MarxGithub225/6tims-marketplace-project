"use client"

import { useContext, useRef, useState } from "react";
import {ReactComponent as DashIcon} from "../../assets/icons/side-bar-icons/DashboardIcon.svg"
import {ReactComponent as Users} from "../../assets/icons/side-bar-icons/UserIcon.svg"
import {ReactComponent as Gear} from "../../assets/icons/side-bar-icons/SettingsIcon.svg"
import {ReactComponent as CategoryIcon} from "../../assets/icons/side-bar-icons/CategoryIcon.svg";
import {ReactComponent as OrganisationIcon} from "../../assets/icons/side-bar-icons/OrganisationIcon.svg";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import {ReactComponent as FrantIcon} from "../../assets/icons/FrantIcon.svg";
import {ReactComponent as HorizontalTwiceArrow} from "../../assets/icons/HorizontalTwiceArrow.svg";
import {ReactComponent as LeftArrow} from "../../assets/icons/LeftArrow.svg";
import {ReactComponent as MenuStats} from "../../assets/icons/MenuStats.svg";
import {ReactComponent as MoneyIcon} from "../../assets/icons/MoneyIcon.svg";
import {ReactComponent as HelpCenter} from "../../assets/icons/Sidebar/HelpCenter.svg";
import {ReactComponent as ZoomIcon} from "../../assets/icons/ZoomIcon.svg";
import {ReactComponent as Theme} from "../../assets/icons/website/Theme.svg";
import {ReactComponent as WarantyTermsIcon} from "../../assets/icons/WarantyTermsIcon.svg";
import {ReactComponent as Listings} from "../../assets/icons/Sidebar/Listings.svg";
import {ReactComponent as Saved} from "../../assets/icons/Sidebar/Saved.svg";
import {ReactComponent as BookingIcon} from "../../assets/icons/side-bar-icons/BookingIcon.svg";

import classnames from 'classnames';
import { useTranslation } from '../../i18n/client'
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import { Circle } from "react-feather";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import { Link, useLocation, useParams } from "react-router-dom";
import { config } from "../../utilities/helper";
import { AuthContext } from "../../context/auth";

export interface MenuInterface {
    link?: string
    title?: string
    icon?: any
    subMenu?: any
    master?: boolean
}

export interface MenuItemInterface {
    header?: string
    menu?: Array<MenuInterface>
}
function Sidebar() {
    let menuRef: any = useRef()
    const {pathname} = useLocation();
    const {lng} = useParams();
    const { t } = useTranslation(lng ?? 'fr', 'common')
    const theme = useSelector((state: RootState) => state.theme.theme)
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed)
    const [menuSelected, setMenuSelected] = useState<MenuInterface>()

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
                }
            ]
        },
        {
            header: t('manage.title'),
            menu: [
                
                {
                    title: t('manage.orders'),
                    icon: <FrantIcon />,
                    subMenu: [
                        {
                            link: LinksEnum.products,
                            title: t('manage.new_orders'),
                            icon: <Circle size={12} className="minus-icon" />,
                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.orders_transfered'),
                            icon: <Circle size={12} className="minus-icon" />,
                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.orders_in_shipping'),
                            icon: <Circle size={12} className="minus-icon" />,
                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.delivered_orders'),
                            icon: <Circle size={12} className="minus-icon" />                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.cancelled_orders'),
                            icon: <Circle size={12} className="minus-icon" />
                        }
                    ]
                },
                {
                    title: t('manage.products'),
                    icon: <HelpCenter />,
                    subMenu: [
                        {
                            link: LinksEnum.products,
                            title: t('manage.products_list'),
                            icon: <Circle size={12} className="minus-icon" />,
                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.refused_products'),
                            icon: <Circle size={12} className="minus-icon" />,
                        },
                        {
                            link: LinksEnum.products,
                            title: t('manage.archived_products'),
                            icon: <Circle size={12} className="minus-icon" />,
                        }
                    ]
                },

            ]

        },

        {
            header: t('accounting.title'),
            menu: [
                {
                    link: LinksEnum.products,
                    title: t('accounting.sellers_accounting'),
                    icon: <MoneyIcon className="w-5 h-auto" />
                }
            ]

        },
        {
            header: t('data.title'),
            menu: [
                {
                    link: LinksEnum.statistics,
                    title: t('data.statistics'),
                    icon: <MenuStats className="w-5 h-auto" />
                },
            ]
        }
    ]

    useOnClickOutSide(menuRef, () => { setMenuSelected(undefined) })

    return <div className={`ease-in-out transition-all duration-500 fixed h-screen top-0 left-0 ${!isCollapsed ? 'side-bar' : 'side-bar-collapsed'} overflow-y-auto no-scrollbar`}>
        <div className="logo-brand">
            <img className="h-8 w-auto" src={theme === 'light' ? config.tims_logo_oficiel: config.tims_logo_white} alt="" />
        </div>

        <div className="menu-items">
            {menuItems.map((item: MenuItemInterface, key: number) => {
                return <div className="menu-item" key={key} >
                    {item?.header && <div className="menu-header"> {item?.header} </div>}
                    {item?.menu && <div className="menu-list">
                        {
                            item?.menu.map((m: MenuInterface, index: number) => {
                                return <>
                                        {!m?.subMenu ? <Link className={`menu ${getActiveClassname(m.link)}`} to={m.link ?? ''} key={index} >
                                            <div className="m-icon flex items-center"> {m.icon} </div>
                                            <div className="m-title"> {m.title} </div>
                                        </Link> : <div ref={menuRef} className="w-full">
                                            <div className={`menu menu-compose gap-x-3 justify-between ${menuSelected?.title === m.title ? 'active-menu' : ''}`} key={index}
                                                onClick={() => {
                                                    if (menuSelected) {
                                                        setMenuSelected(undefined)
                                                    } else {
                                                        setMenuSelected(m)
                                                    }
                                                }}
                                            >
                                                <div className="flex flex-col size1400:flex-row items-center">
                                                <div className="m-icon flex items-center gap-[2px]"> 
                                                    {m.icon} 
                                                    <Arrow  className={`block size1400:hidden menu-arrow-multiple w-2 h-auto transform ${menuSelected?.title === m.title ? 'rotate-90': 'rotate-0'}`} />
                                                    
                                                    </div>
                                                    <div className="m-title"> {m.title} </div>
                                                </div>
                                                <Arrow  className={`hidden size1400:block menu-arrow-multiple w-2 h-auto transform ${menuSelected?.title === m.title ? 'rotate-90': 'rotate-0'}`} />
                                            </div>
                                            {menuSelected?.title === m.title && <div className="mt-3 sub-menu-items">
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
                            })
                        }
                    </div>}
                </div>
            })}
        </div>
        
    </div>;
}

export default Sidebar;
