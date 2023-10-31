import React from "react";
import Car from "../../../../assets/images/car.png"
import {ReactComponent as Star} from '../../../../assets/icons/Star.svg';

function TopDriverItem() {
    return <div className="auction-item w-full">
        <div className="flex justify-between items-center">
            <div className="auction-item-time flex items-center space-x-5">
                <div className="top-driver-item-bg bg-cover bg-center bg-no-reapeat"
                    style={{ backgroundImage: `url(${Car})` }}>
                </div>
                <div className="top-driver-name w-36">
                    Chance Mango
                </div>
            </div>

            <div className="auction-stats flex items-center space-x-8">
                <div className="state flex flex-col items-center space-y-1">
                    <div className="count">25</div>
                    <div className="label">Trip</div>
                </div>

                <div className="car hidden miniWidth:flex flex-col items-end  space-y-1">
                    <div className="count-star flex items-center space-x-1"><Star className="w-4 h-auto" /> <span>4.96</span></div>
                    <div className="label">Reviews</div>
                </div>
            </div>
        </div>
    </div>;
}

export default TopDriverItem;
