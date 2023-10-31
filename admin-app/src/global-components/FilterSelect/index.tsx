import React from "react";
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";
import { useRef, useState } from 'react'
import useOnClickOutSide from '../../utilities/onClickOutSide'
import { OptionInterface } from "../../utilities/constants";


interface FilterSelectProps {
    label?: string
    selectedOption?: OptionInterface
    setSelectedOption?: Function
    classname?: string
    options: Array<OptionInterface>
    width?: number
}
function FilterSelect({ label = '', selectedOption, options, classname = "status-filter", setSelectedOption, width }: FilterSelectProps) {
    const [filterOptionsOpen, setFilterOptionOpen] = useState<boolean>(false)
    let optionsRef: any = useRef();

    useOnClickOutSide(optionsRef, () => setFilterOptionOpen(false))

    return <div ref={optionsRef}  className={`relative ${classname}`} onClick={() => setFilterOptionOpen(!filterOptionsOpen)} style={{ width: width ? width : 'auto' }} >
        {selectedOption?.label ?? 'Choose a setting'} <Arrow className="ml-2 h-3 w-auto transform rotate-90" />

        {filterOptionsOpen && <div className="absolute right-0 top-16 bigTablet:top-12 z-50" style={{ width: width ? width : 'auto' }}>
            <div className="status-filter-options" >
                {options.map((opt: OptionInterface, key: number) => {
                    return <div key={key} onClick={() => setSelectedOption && setSelectedOption(opt)} className="dropdown-menu-item flex items-center">{opt?.label}</div>
                })}
            </div>
        </div>}
    </div>;
}

export default FilterSelect;