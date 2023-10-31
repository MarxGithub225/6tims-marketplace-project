import React from "react";
import TopCountryItem from "../TopCountryItem";
function TopCountries() {
  return <div className="upcoming-auctions">
    <div className="flex items-center justify-between header mb-5">
      <div className="section-title">Top Countries</div>
    </div>

    {[0, 1, 2].map((item: any, index: number) => {
      return <TopCountryItem key={index} />
    })}
  </div>;
}

export default TopCountries;
