import React, { useEffect, useRef, useState } from "react";
import useOnClickOutSide from "../../utils/onClickOutSide";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
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
}, classname="", required = false
                  }: CustomSelectProps) {
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>()

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
  return <div className="new-custom-select w-full" ref={optionsRef}  onClick={() => setSelectOptionOpen(!selectOptionsOpen)}>
            <div className="flex flex-row justify-between items-center h-full w-full">
                <span
                    className={`custom-select-placeholder capitalize ${selected ? 'custom-select-selected': ''}`}>{selected?.name ? selected?.name : placeholder}</span>
                <div className="flex items-center justify-center">
                    <Arrow className="h-3 w-auto transform rotate-90"/>
                </div>
            </div>

            {selectOptionsOpen &&
                <div className={`select-dropdown ${classname}`}>
                    {
                        options && options?.length > 0 && options?.map((elt: any, index: number) => {
                            return <div key={index} className="dropdown-menu-item flex items-center capitalize"
                                        onClick={() => onSelected(elt, label)}>{`${elt?.name}`}
                            </div>
                        })
                    }
                </div>}
  </div>;
}

export default CustomSelect;
