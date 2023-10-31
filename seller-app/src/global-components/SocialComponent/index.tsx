"use client"

import React from "react";
interface SocialComponentProps {
    label?: string
    icon: any
    onClick: Function
}
function SocialComponent({label="", onClick=() => {}, icon}: SocialComponentProps) {
  return <div
  onClick={(e: any) => onClick(e)}
  className={`social-component w-full cursor-pointer flex items-center justify-center relative`}> 
   {icon && <div className="absolute left-5 top-3">
  {icon}
  </div>}
  {label} 
  
  </div>;
}

export default SocialComponent;
