"use client"

import React, { useRef, useState } from "react";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";

interface CustomSelectProps {
    label?: string
    placeholder?: string
    options: { name: string, value: number | string, groupId?: number }[]
    onChange: Function
    width?: any
    height?: number
    classname?: string
}
function CustomSelect3({ label = "", placeholder = "", options = [], onChange = () => { }, classname }: CustomSelectProps) {
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>()

    let optionsRef: any = useRef();
    useOnClickOutSide(optionsRef, () => setSelectOptionOpen(false))

    const onSelected = (elt: any) => {
        setSelected(elt)
        onChange(elt)
    }

    return <div onClick={() => setSelectOptionOpen(!selectOptionsOpen)} >
        <div className="relative custom-select3">
            <div className={`info-input-saved-data`}
                style={{
                    borderRadius: 0,
                    paddingTop: 16,
                    paddingBottom: 16,
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <div className="flex items-center">
                    <div className="info-group">
                        <div className="label">{label}</div>
                        <div className="flex flex-row justify-between items-center">
                            <span className="value capitalize">{selected?.name ? selected?.name : placeholder}</span>
                            <div className="flex items-center justify-center">
                                <Arrow className="h-3 w-auto transform rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectOptionsOpen && <div ref={optionsRef} className={`select-dropdown ${classname}`} style={{ width: 555 }}>
                {
                    options && options?.length > 0 && options?.map((elt: any, index: number) => {
                        return <div key={index} className="dropdown-menu-item flex items-center capitalize" onClick={() => onSelected(elt)}>{elt?.name}</div>
                    })
                }
            </div>}
        </div>

    </div>;
}

export default CustomSelect3;
