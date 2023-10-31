"use client"

import React, {useEffect, useRef, useState} from "react";
import {ReactComponent as Loop} from "../../assets/icons/search-normal.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import AsyncSelect from 'react-select/async';
import { SelectOptionInterface } from "../../utilities/constants";
interface CustomAsyncSelectProps {
    value?: string
    label?: string
    placeholder?: string
    options: { label: string, value: number}[]
    onChange: Function
    loadOptions: (inputValue: string, callback: Function) => void
    width?: number | string
    height?: number
    classname?: string
    required?: boolean
}

function CustomAsyncSelect({value = "", label = "", placeholder = "", options = [], onChange = () => {
    }, width = "100%", height = 72, classname, required = false, loadOptions}: CustomAsyncSelectProps) {
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<SelectOptionInterface>()

    let optionsRef: any = useRef(null);

    useOnClickOutSide(optionsRef, () => setSelectOptionOpen(false))

    const onSelected = (elt: SelectOptionInterface, label: string) => {
        setSelected(elt)
        onChange(elt, label)
    }

    useEffect(() => {
        if(value) {
            let theOption: any = options.filter((opt: any) => opt?.value === value)[0]
            setSelected(theOption)
        }
    }, [value])

    return <div onClick={() => setSelectOptionOpen(!selectOptionsOpen)}>
        <div className="relative custom-select custom-options-select" style={{ width, height}}>
            <div className="flex flex-col">
                {label && <span className="custom-select-label">{label} {required &&
                    <span style={{color: "red"}}>*</span>} </span>}
            </div>
            <AsyncSelect
                defaultValue={[selected] ?? { value: 0 , label: placeholder}}
                isClearable={false}
                placeholder={placeholder}
                className='react-select'
                classNamePrefix='select'
                name='callback-react-select'
                loadOptions={loadOptions}
                defaultOptions={options}
                onChange={(option: any) => onSelected(option, label)}
            />

            <div className="absolute top-7 right-9">
                <Loop className="search-svg-option w-4 h-auto" />
            </div>
        </div>

    </div>;
}

export default CustomAsyncSelect;
