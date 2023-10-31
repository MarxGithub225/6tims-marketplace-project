import React from "react";
import { CheckData } from "../../utilities/constants";

interface CustomCheckboxProps {
    item: CheckData
    onHandleChange: (item: CheckData, arg: boolean) => void
}

export default function CustomCheckbox({item, onHandleChange}: CustomCheckboxProps) {
    return (
        <div className="mr-6">
            <label className={`option capitalize`}>
                {item.label}
                <input type="checkbox"
                       checked={item.checked}
                       onChange={(e: any) => {
                           e.stopPropagation()
                           onHandleChange(item, !item.checked)
                       }}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}