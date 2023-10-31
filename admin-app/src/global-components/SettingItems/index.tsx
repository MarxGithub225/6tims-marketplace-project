import React from "react";
import { ArrowRight } from "react-feather";
import { useDispatch } from "react-redux";
import { setHeaderBreadcrumbData } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
function SettingItems({ item, userData }: any) {
    const router = useNavigate();
    const dispatch = useDispatch()

    const goToSetting = () => {
        dispatch(setHeaderBreadcrumbData({
            role: userData?.roles[0]?.group?.name,
            fullname: userData?.roles[0]?.name?.toLowerCase() == 'agency' ? userData?.personalData?.company_name : `${userData?.firstname} ${userData?.lastname}`,
            page: item?.label,
            parentLink: `user-settings/${userData?.id}`
        }))
        router(`${item.link}/${userData?.id}`)
    }

    return <div className="setting-item w-full" onClick={goToSetting} >
        <div className="flex justify-between items-center">
            <div className="setting-item-time flex items-center">
                <div className="setting-item-icon">
                    {item.icon}
                </div>
                <div className="setting-item-full-date">
                    <div className="setting-item-date font-bold">{item.label}</div>
                    <div className="setting-item-day">{item.info}</div>
                </div>
            </div>
            <div className="arrow-icon">
                <ArrowRight color="#F4A607" />
            </div>
        </div>
    </div>;
}

export default SettingItems;
