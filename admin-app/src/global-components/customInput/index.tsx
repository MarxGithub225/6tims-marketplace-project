"use client"

import React from "react";

interface CustomInputProps {
    label?: string
    name?: string
    type?: string
    placeholder?: string
    value: string
    icon?: any
    onChange: (e: any) => void
    onBlur?: (e: any) => void
    width?: number
    styles?: any
}

function CustomInput({
    label = "",
    name = "",
    type = "text",
    placeholder = "",
    value = "",
    icon,
    onChange = () => { },
    onBlur = () => { },
    width,
    styles
}: CustomInputProps) {
    return (
        <div className="custom-input flex flex-col" style={{ width, ...styles }}>
            <span className="label">{label}</span>
            <div className="input-group relative">
                <input value={value}
                    name={name}
                    type={type}
                    onChange={(e: any) => onChange(e.target.value)}
                    onBlur={(e: any) => onBlur(e.target.value)}
                    className={`w-full ${icon && 'pr-8'}`}
                    placeholder={placeholder}
                />
                {icon && <div style={{ color: '#0D0A19' }} className="absolute right-0 top-0">
                    {icon}
                </div>}
            </div>
        </div>
    )
}

export default CustomInput;
