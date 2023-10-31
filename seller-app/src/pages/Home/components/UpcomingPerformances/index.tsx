import React from "react";
import {ReactComponent as Calendar}from "../../../../assets/icons/Sidebar/Calendar.svg"
import AuctionPerformanceItem from "../AuctionPerformanceItem";
function UpcomingPerformances() {
  return <div className="upcoming-auctions">
    <div className="flex items-center justify-between header mb-5">
      <div className="section-title">Booking performance</div>
      <div className="section-icon flex items-center"><Calendar className="w-auto h-4 mr-6" /> Week</div>
    </div>

    {[0, 1, 2].map((item: any, index: number) => {
      return <AuctionPerformanceItem key={index} />
    })}
  </div>;
}

export default UpcomingPerformances;
