import React from 'react'
import {ReactComponent as Arrow} from "../../assets/icons/Arrow.svg";

interface filterOptionInterface {
    value: number
    label: string
}

interface FilterSelectProps {
    setFilterOptionOpen: Function
    setIsSearching: Function
    setStatus: Function
    status: filterOptionInterface
    filterOptionsOpen: boolean
    optionsRef: any
    options: Array<filterOptionInterface>
    classname?: string
}

function FilterSelect({ setFilterOptionOpen, setIsSearching, setStatus, status, filterOptionsOpen, optionsRef, options, classname }: FilterSelectProps) {
    return (
        <div className={`relative status-filter ${classname}`}
            onClick={() => setFilterOptionOpen(!filterOptionsOpen)}>
            {status.label} <Arrow className="ml-2 h-3 w-auto transform rotate-90" />

            {filterOptionsOpen && <div ref={optionsRef} className={`absolute right-0 top-12 ${classname}`}>
                <div className="status-filter-options">
                    {
                        options?.map(elt => (
                            <div className={`dropdown-menu-item ${elt.value == status.value ? 'selected' : ''} flex items-center`}
                                onClick={() => { setIsSearching(true); setStatus(elt) }}>{elt.label}
                            </div>
                        ))
                    }
                </div>

            </div>}
        </div>
    )
}

export default FilterSelect