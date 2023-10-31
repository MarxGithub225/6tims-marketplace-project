"use client"

import React, { useRef, useState } from "react";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";

interface CustomSelect2Props {
    label?: string
    placeholder?: string
    options: any[]
    onChange: Function
    width?: number
    height?: number
    classname?: string
}
function CustomSelect2({ classname="", label = "", placeholder = "", options = [], onChange = () => { }, width = 613, height = 72 }: CustomSelect2Props) {
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>()

    let optionsRef: any = useRef();
    useOnClickOutSide(optionsRef, () => setSelectOptionOpen(false))

    const onSelected = (elt: any, label: string) => {
        setSelected(elt)
        onChange(elt, label)
    }

    return <div ref={optionsRef}  onClick={() => setSelectOptionOpen(!selectOptionsOpen)} >
        <div className={`relative custom-select-2 ${classname}`} style={{ width: width, height: height }}>
            <div className="flex flex-row justify-between w-full">
                <span className="custom-select-placeholder">{selected?.name ? selected?.name : placeholder}</span>
                <div className="flex items-center justify-center">
                    <Arrow className="h-3 w-auto transform rotate-90" />
                </div>
            </div>

            {selectOptionsOpen && <div className='select-dropdown' style={{ width: width ? width : 613 }}>
                {
                    options?.map((elt: any, index: number) => {
                        return <div key={index} className="dropdown-menu-item flex items-center" onClick={() => onSelected(elt, label)}>{elt?.name}</div>
                    })
                }
            </div>}
        </div>
        
    </div>;
}

export default CustomSelect2;
