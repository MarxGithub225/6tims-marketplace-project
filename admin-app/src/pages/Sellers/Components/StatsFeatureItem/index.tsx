import React from "react";
import {ReactComponent as Arrow} from '../../../../assets/icons/arrow-right.svg'
interface StatsFeatureItemProps {
    label: string
    icon: any
    value: string
    percentage: string
}
function StatsFeatureItem({label, icon, value, percentage}: StatsFeatureItemProps) {
  return <div className="stats-feature-item stats-feature-item-2 flex flex-col justify-between">
  <div className="flex items-center justify-between">
    <div className="label"> {label} </div>
    {icon && <div className="icon"> {icon} </div>}
  </div>
  <div className="flex items-center justify-between">
    <div className="value"> {value} </div>
    {percentage && <div className="percentage"> {percentage} </div>}
  </div>
</div>;
}

export default StatsFeatureItem;
