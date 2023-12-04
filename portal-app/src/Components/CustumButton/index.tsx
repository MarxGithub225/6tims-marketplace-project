import React from "react";
import { Loader } from "react-feather";
interface CustumButtonProps {
    label: string
    backgroundColor?: string
    borderColor?: string
    color?: string
    icon?: any
    onclick: Function
    disabled?:boolean
    isLoading?:boolean
}
function CustumButton({label, isLoading, icon, backgroundColor="#e73a5d", color="#fff", onclick=()=>{}, borderColor, disabled=false}: CustumButtonProps) {
  return <div className="custom-button gap-x-3 cursor-pointer min-w-[200px] "
  style={{
    background: backgroundColor,
    color: color,
    border: borderColor ? `1px solid ${borderColor}`: 'none',
    pointerEvents: disabled ? 'none': 'initial',
    opacity: disabled ? .5 : 1
  }}
  onClick={() => onclick()}
  >
    {icon} {isLoading ? <><Loader className="animate-spin" /> &nbsp; Processing ...</> : label}
  </div>;
}

export default CustumButton;
