import React from "react";
import { Loader } from "react-feather";

interface CustomButtonProps {
    label?: any
    background: string
    color: string
    onClick?: Function
    classname?: string
    outline?: boolean
    isLoading?: boolean
    type?: any
    disabled?: boolean
}

function CustomButton({
    label = "", onClick = () => { }, color = "#FFFFFF",
    background = "#F4A607",
    classname = 'custom-button',
    isLoading = false,
    outline,
    type = 'submit',
    disabled
}: CustomButtonProps) {
    return <button
        type={type}
        onClick={(e: any) => !disabled && onClick && onClick(e)}
        className={`${classname} cursor-pointer flex items-center justify-center px-6 ${isLoading && "cursor-not-allowed"}`}
        style={disabled ? {
            border: outline ? '1px solid #EEEEEE' : 0,
            borderRadius: outline ? 10 : '',
            backgroundColor: "#bdbdbd",
            color,
            cursor: "not-allowed"
        } : {
            border: outline ? '1px solid #EEEEEE' : 0,
            borderRadius: outline ? 10 : '',
            background: outline ? 'transparent' : background, color: color
        }}
    > {isLoading ? <><Loader className="animate-spin" /> &nbsp; Processing ...</> : label}
    </button>;
}

export default CustomButton;
