import React from "react";
import {ReactComponent as TopCalendar} from "../../../../assets/icons/TopCalendar.svg"
function TopAgencyItem() {
    return <div className="auction-item w-full">
        <div className="flex justify-between items-center">
            <div className="auction-item-time flex items-center">
                <div className="auction-item-icon">
                    <TopCalendar className="h-5 w-auto" />
                </div>
                <div className="auction-item-full-date">
                    <div className="auction-item-date">14 January 2021</div>
                    <div className="auction-item-day">Monday</div>
                </div>
            </div>

            <div className="auction-stats flex items-center space-x-8">
                <div className="state flex flex-col items-end  space-y-1">
                    <div className="count">52</div>
                    <div className="label">Booking</div>
                </div>

                <div className="car flex flex-col items-end  space-y-1">
                    <div className="count">2,1k</div>
                    <div className="label-2">Rating</div>
                </div>
            </div>
        </div>
    </div>;
}

export default TopAgencyItem;
