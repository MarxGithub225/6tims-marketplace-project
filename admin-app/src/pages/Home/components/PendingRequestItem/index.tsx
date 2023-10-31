import React from "react";
import {ReactComponent as FileIcon} from '../../../../assets/icons/rbnb.svg'
function PendingRequestItem() {
    return <div className="auction-item w-full">
        <div className="flex gap-x-[68px] justify-between items-center h-full">
            <div className="auction-item-time flex items-center gap-x-3 h-full">
                <FileIcon className="w-16 h-auto"/>
                <div className="auction-item-full-label">
                    <div className="auction-item-label">Airbnb</div>
                </div>
            </div>

            <div className="auction-stats flex items-center space-x-3 h-full">
                <div className="state flex flex-col items-end space-y-1">
                    <div className="count-star flex items-center space-x-1"><span>651</span></div>
                    <div className="label">Feet</div>
                </div>

                <div className="car hidden miniWidth:flex flex-col items-start  space-y-1">
                    <div className="count-star flex items-center space-x-1  w-full laptop:w-[201px] vr-txt"><span>2972 Westheimer Rd. Santa Ana, Illinois 85486 </span></div>
                    <div className="label">City</div>
                </div>
            </div>
        </div>
    </div>;
}

export default PendingRequestItem;
