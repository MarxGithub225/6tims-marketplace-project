import React from "react";
import SettingItems from "../SettingItems";


import {ReactComponent as UserIcon} from "../../assets/icons/UserIcon.svg"
import {ReactComponent as LaptopIcon} from "../../assets/icons/LaptopIcon.svg"
import {ReactComponent as LoginIcon} from "../../assets/icons/LoginIcon.svg"
import {ReactComponent as MoneyIcon} from "../../assets/icons/MoneyIcon.svg"
import {ReactComponent as ClockIcon} from "../../assets/icons/ClockIcon.svg"
import {ReactComponent as EyeIcon} from "../../assets/icons/EyeIcon.svg"
import {ReactComponent as SettingsIcon} from "../../assets/icons/SettingIcon.svg"
import {ReactComponent as CarIcon2} from "../../assets/icons/CarIcon2.svg"
import {ReactComponent as Reviews} from "../../assets/icons/Reviews.svg"
import {ReactComponent as Mission} from "../../assets/icons/Mission.svg"
import {ReactComponent as BookingManage} from "../../assets/icons/BookingManage.svg"

import {ReactComponent as Booking} from "../../assets/icons/Sidebar/Calendar2.svg"
import { LinksEnum } from "../../utilities/pagesLinksEnum";

function UserSetingsItems({ userData }: any) {

  const userInfos: any = null

  const settingMenu = [
    {
      icon: <UserIcon className="h-5 w-auto" />,
      label: 'Account information',
      info: 'Profile foto, and name',
      link: LinksEnum.account_informations,
      active: true
    },
    // {
    //   icon: <LaptopIcon className="h-5 w-auto" />,
    //   label: 'Security',
    //   info: 'Your credentials',
    //   link: LinksEnum.password_settings,
    // },
    {
      icon: <LoginIcon className="h-5 w-auto" />,
      label: 'Login details',
      info: 'Password & security',
      link: LinksEnum.password_settings,
      active: (userData?.id == userInfos?.user?.id)
    },
    {
      icon: <MoneyIcon className="h-5 w-auto" />,
      label: 'Billing',
      info: 'Setup payment methods',
      link: LinksEnum.account_informations,
      active: (userData?.roles[0].name?.toLowerCase() == 'business client' || userData?.roles[0].name?.toLowerCase() == 'agency' || userData?.roles[0].name?.toLowerCase() == 'client')
    },
    // {
    //   icon: <ClockIcon className="h-5 w-auto" />,
    //   label: 'Notifications',
    //   info: 'Your email notifications',
    //   link: LinksEnum.notifications
    // },
    // {
    //   icon: <EyeIcon className="h-5 w-auto" />,
    //   label: 'Privacy',
    //   info: 'Linked apps and services',
    //   link: LinksEnum.password_settings
    // },
    // {
    //   icon: <SettingsIcon className="h-5 w-auto" />,
    //   label: 'Global preferences',
    //   info: 'Currency and language',
    //   link: LinksEnum.global_references
    // },
    {
      icon: <Reviews className="h-5 w-auto" />,
      label: 'Reviews',
      info: 'Rating & Comments',
      link: LinksEnum.users,
      active: (userData?.roles[0].name?.toLowerCase() == 'business client' || userData?.roles[0].name?.toLowerCase() == 'client' || userData?.roles[0].name?.toLowerCase() == 'driver')
    },
    {
      icon: <Booking className="h-5 w-auto" />,
      label: 'Bookings',
      info: 'Your bookings',
      link: LinksEnum.users,
      active: (userData?.roles[0].name?.toLowerCase() == 'client' || userData?.roles[0].name?.toLowerCase() == 'business client')
    },
    {
      icon: <CarIcon2 className="h-5 w-auto" />,
      label: 'Cars',
      info: 'Your cars... ',
      link: LinksEnum.users,
      active: (userData?.roles[0].name?.toLowerCase() == 'business client' || userData?.roles[0].name?.toLowerCase() == 'agency')
    },
    {
      icon: <Mission className="h-5 w-auto" />,
      label: 'Missions',
      info: 'Your missions... ',
      link: LinksEnum.users,
      active: (userData?.roles[0].name?.toLowerCase() == 'driver')
    },
    {
      icon: <BookingManage className="h-5 w-auto" />,
      label: 'Booking data',
      info: 'Your managed bookings',
      link: LinksEnum.users,
      active: (userData?.roles[0].name?.toLowerCase() == 'agency' || userData?.roles[0].name?.toLowerCase() == 'business client')
    }
  ]
  return <div className="w-full grid gap-x-4 intermWidth:gap-x-8 grid-cols-1 bigTablet:grid-cols-2 intermWidth:grid-cols-3">
    {settingMenu.map((item: any, index: number) => {
      return item?.active && <SettingItems item={item} key={index} userData={userData} />
    })}
  </div>;
}

export default UserSetingsItems;
