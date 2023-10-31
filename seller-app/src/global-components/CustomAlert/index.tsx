import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import {ReactComponent as CancelIcon} from "../../assets/icons/CancelIcon.svg";
import {ReactComponent as CheckIcon} from "../../assets/icons/CheckIcon.svg";


interface CustomProps {
    message?: string;
}

const SuccessToast = (props: CustomProps) => (
    <div className="custom-alert w-full">
        <CheckIcon className='icon w-1/6' />
        <div className='w-5/6 flex flex-col items-start justify-center'>
            <p className='success-text'>SUCCESS!</p>
            <p className='description'>
                {props.message}
            </p>
        </div>
    </div>
)

const ErrorToast = (props: CustomProps) => (
    <div className="custom-alert w-full">
        <div className='icon w-1/6'>
            <CancelIcon />
        </div>
        <div className='w-5/6 flex flex-col items-start justify-center'>
            <p className='error-text'>ERROR!</p>
            <p className='description'>
                {props.message}
            </p>
        </div>
    </div>
)


interface NotificationInterface {
    message?: string,
    autoClose?: number,
    hideProgressBar?: boolean,
    closeOnClick?: boolean,
    pauseOnHover?: boolean
}

export const notifySuccess = ({message, autoClose = 3000, hideProgressBar = true, closeOnClick = true, pauseOnHover = true}: NotificationInterface) => toast.success(<SuccessToast message={message} />,
    {
        hideProgressBar,
        autoClose,
        closeOnClick,
        pauseOnHover
    })
export const notifyError = ({message, autoClose = 3000, hideProgressBar = true, closeOnClick = true, pauseOnHover = true}: NotificationInterface) => toast.error(<ErrorToast message={message} />,
    {
        hideProgressBar,
        autoClose,
        closeOnClick,
        pauseOnHover
    })
