import React from "react";

function TopCountryItem() {
    return <div className="auction-item w-full">
        <div className="flex justify-between items-center">
            <div className="auction-item-time flex items-center">
                <div className="auction-item-full-date">
                    <div className="auction-item-date">Togo</div>
                </div>
            </div>

            <div className="auction-stats flex items-center space-x-8">
                <div className="state flex flex-col items-center  space-y-1">
                    <div className="count">3</div>
                    <div className="label">City</div>
                </div>

                <div className="car flex flex-col items-end  space-y-1">
                    <div className="count">24</div>
                    <div className="label-2">Organisation</div>
                </div>
            </div>
        </div>
    </div>;
}

export default TopCountryItem;
