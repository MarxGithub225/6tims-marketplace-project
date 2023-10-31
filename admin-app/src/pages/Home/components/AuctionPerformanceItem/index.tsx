import React from "react";
import Car from "../../../../assets/images/car.png"
import {ReactComponent as Star} from "../../../../assets/icons/Star.svg"
function AuctionPerformanceItem() {
    return <div className="auction-item w-full">
        <div className="flex justify-between items-center">
            <div className="auction-item-time flex items-center">
                <div className="auction-item-bg bg-cover bg-center bg-no-reapeat"
                    style={{ backgroundImage: `url(${Car})` }}>
                </div>
                <div className="auction-item-full-label w-36">
                    <div className="auction-item-label">2013 Subaru Forester Premium Plus</div>
                </div>
            </div>

            <div className="auction-stats flex items-center space-x-8">
                <div className="state flex flex-col items-end space-y-1">
                    <div className="count">1,600</div>
                    <div className="label">Booked</div>
                </div>

                <div className="car hidden miniWidth:flex flex-col items-end  space-y-1">
                    <div className="count-star flex items-center space-x-1"><Star className="w-4 h-auto" /> <span>4.96</span></div>
                    <div className="label">Reviews</div>
                </div>
            </div>
        </div>
    </div>;
}

export default AuctionPerformanceItem;
