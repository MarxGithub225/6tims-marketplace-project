"use client"
import {ReactComponent as HorizontalDots} from "../../assets/icons/HorizontalDots.svg";
import {ReactComponent as Pencil} from "../../assets/icons/Pencil.svg";
import {ReactComponent as Trash} from "../../assets/icons/Trash.svg";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import {MouseEventHandler, useRef, useState} from "react";

interface ActionComponentProps {
    onEdit: (e?: any) => void,
    onDelete: (e?: any) => void,
    hideEdit? : boolean
    hideDelete? : boolean
}

export default function ActionComponent({ onEdit, onDelete, hideEdit = false, hideDelete = false }: ActionComponentProps) {

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
                // onMouseEnter={() => setOpen(!open)}
                >
                    {!hideEdit && <div>
                        <Pencil className="h-4 w-auto mr-3 cursor-pointer" onClick={onEdit} />
                    </div>}
                    {!hideDelete && <div>
                        <Trash className="h-4 w-auto cursor-pointer" onClick={onDelete} />
                    </div>}
                </div>}
        </div>

    )
}
