import React from "react";
interface CustumButtonProps {
    label: string
    backgroundColor?: string
    borderColor?: string
    color?: string
    icon?: any
    onclick: Function
}
function CustumButton({label, icon, backgroundColor="#e73a5d", color="#fff", onclick=()=>{}, borderColor}: CustumButtonProps) {
  return <div className="custom-button gap-x-3"
  style={{
    background: backgroundColor,
    color: color,
    border: borderColor ? `1px solid ${borderColor}`: 'none'
  }}
  onClick={() => onclick()}
  >
    {icon} {label}
  </div>;
}

export default CustumButton;
