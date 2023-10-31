import React, {ReactNode} from "react";

interface ModalInterface {
    open: boolean,
    toggle?: Function
    children?: ReactNode,
    className?: string
}

function CustomModal({ open, toggle, children, className }: ModalInterface) {
    return <>{open && <div className="darkBG" onClick={() => toggle && toggle()}>
        <div className={`modal-content ${className}`} onClick={(e: any) => e.stopPropagation()}>
            <div className="modal-body">
                {children}
            </div>
        </div>
    </div>}</>
}

export default CustomModal;
