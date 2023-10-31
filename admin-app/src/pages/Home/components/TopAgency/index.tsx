import React from "react";
import {ReactComponent as Calendar} from "../../../../assets/icons/Sidebar/Calendar.svg"
import TopAgencyItem from "../TopAgencyItem";
function TopAgency() {
  return <div className="upcoming-auctions">
    <div className="flex items-center justify-between header mb-5">
      <div className="section-title">Top agencies</div>
      <div className="section-icon flex items-center"><Calendar className="w-auto h-4 mr-6" /> Week</div>
    </div>

    {[0, 1, 2].map((item: any, index: number) => {
      return <TopAgencyItem key={index} />
    })}
  </div>;
}

export default TopAgency;
