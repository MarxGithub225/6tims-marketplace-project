"use client"

import React from "react";
interface CustomInput2Props {
    label?: string
    type?: string
    placeholder?: string
    value: string
    icon: any
    onChange: Function
}
function CustomInput2({label="", placeholder="", value="", type="text", icon, onChange=() => {}}: CustomInput2Props) {
  return <div className="custom-input flex justify-center flex-col">
    <div className="input-group relative">
        <input value={value} 
        type={type}
        onChange={(e: any) => onChange(e)}
        className={`w-full ${icon ? 'pr-8': ''}`} placeholder={placeholder} />
        {icon && <div style={{color: '#261E3B'}} className="absolute right-0 top-0">
        {icon}
        </div>}
    </div>
  </div>;
}

export default CustomInput2;
