"use client"

import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";

interface CustomSelectProps {
    value?: number | string | boolean
    label?: string
    placeholder?: string
    options: { name: string, value: number | string | boolean, subCategories?: Array<any> }[]
    onChange: Function
    width?: any
    height?: number
    classname?: string
    required?: boolean
}

function CustomSelect({value = "", label = "", placeholder = "", options = [], onChange = () => {
    }, width = 613, height = 72, classname, required = false
                      }: CustomSelectProps) {
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(null)

    let optionsRef: any = useRef();
    useOnClickOutSide(optionsRef, () => setSelectOptionOpen(false))

    const onSelected = (elt: any, label: string) => {
        setSelected(elt)
        onChange(elt, label)
    }

    useEffect(() => {
        if(value && typeof value !== "boolean" ) {
            let theOption: any = options.filter((opt: any) => opt?.value === value)[0]
            setSelected(theOption)
        }else if(typeof value === "boolean") {
            let theOption: any = options.filter((opt: any) => opt?.value === value)[0]
            setSelected(theOption)
        } else {
            setSelected(null)
        }
    }, [value, options])

    useEffect(() => {
        
        if(value && typeof value !== "boolean" ) {
            let theOption: any = options.filter((opt: any) => opt?.value === value)[0]
            setSelected(theOption)
        }else if(typeof value === "boolean") {
            let theOption: any = options.filter((opt: any) => opt?.value === value)[0]
            setSelected(theOption)
        } else {
            setSelected(null)
        }
    }, [])

    return <div className="w-full" onClick={() => setSelectOptionOpen(!selectOptionsOpen)}>
        <div className="relative custom-select" style={{width: width, height: height}}>
            <div className="flex flex-col">
                {label && <span className="custom-select-label">{label} {required &&
                    <span style={{color: "red"}}>*</span>} </span>}
            </div>
            <div className="flex flex-row justify-between items-center">
                <span
                    className="custom-select-placeholder capitalize">{selected?.name ? selected?.name : placeholder}</span>
                <div className="flex items-center justify-center">
                    <Arrow className="h-3 w-auto transform rotate-90"/>
                </div>
            </div>

            {selectOptionsOpen &&
                <div ref={optionsRef} className={`select-dropdown ${classname}`} style={{width: width ? width : 613}}>
                    {
                        options && options?.length > 0 && options?.map((elt: any, index: number) => {
                            return <div key={index} className="dropdown-menu-item flex items-center capitalize"
                                        onClick={() => onSelected(elt, label)}>{`${elt?.name}`}
                            </div>
                        })
                    }
                </div>}
        </div>

    </div>;
}

export default CustomSelect;
