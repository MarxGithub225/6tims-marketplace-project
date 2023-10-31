"use client"
import {ReactComponent as HorizontalDots} from "../../assets/icons/HorizontalDots.svg";
import {ReactComponent as Eye} from "../../assets/icons/Eye.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import {MouseEventHandler, useRef, useState} from "react";

interface ViewComponentProps {
    onView: (e?: any) => void
}

export default function ViewComponent({ onView }: ViewComponentProps) {

    const [open, setOpen] = useState<boolean>(false)
    let ref: any = useRef();
    useOnClickOutSide(ref, () => setOpen(false))

    return (
        <div className="table-options">
            {!open ? <div
                className="flex items-center justify-center cursor-pointer options"
                onClick={(e: any) => {
                    e.stopPropagation();
                    setOpen(!open)
                }}
            // onMouseEnter={() => setOpen(!open)}
            >
                <HorizontalDots className="w-auto h-2" />
            </div>
                :
                <div ref={ref} className="options-tools flex justify-between item-end"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open)
                    }}
                >
                    <div>
                        <Eye className="h-4 w-auto cursor-pointer" onClick={onView} />
                    </div>
                </div>}
        </div>

    )
}
