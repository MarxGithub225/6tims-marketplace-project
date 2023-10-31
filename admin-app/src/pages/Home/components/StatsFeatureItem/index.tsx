import React from "react";
interface StatsFeatureItemProps {
    label: string
    icon: any
    value: string
    percentage: string
}
function StatsFeatureItem({label, icon, value, percentage}: StatsFeatureItemProps) {
  return <div className="stats-feature-item flex flex-col justify-between">
  <div className="flex items-center justify-between">
    <div className="label"> {label} </div>
    <div className="icon"> {icon} </div>
  </div>
  <div className="flex items-center justify-between">
    <div className="value"> {value} </div>
    <div className="percentage"> {percentage} </div>
  </div>
</div>;
}

export default StatsFeatureItem;
