import React from "react";
import PendingRequestItem from "../PendingRequestItem";
function PendingRequests() {
  return <div className="upcoming-auctions">
    <div className="flex items-center justify-between header mb-5">
      <div className="section-title">Pending Request (50)</div>
      <div className="section-icon flex items-center">See All</div>
    </div>

    {[0, 1, 2].map((item: any, index: number) => {
      return <PendingRequestItem key={index} />
    })}
  </div>;
}

export default PendingRequests;
