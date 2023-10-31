"use client"

import {X} from 'react-feather'
import {ReactComponent as SuccessRegisterIcon} from "../../assets/icons/SuccessRegisterIcon.svg"
import {ReactComponent as Checked} from "../../assets/icons/Checked.svg"
import {ReactComponent as LockIcon} from "../../assets/icons/LockIcon.svg"
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import CustomInput from "../../global-components/customInput";
import CustomButton from "../../global-components/CustomButton";
import { config } from '../../utilities/helper'

export default function PassChange() {
  const [show, setShow] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>("")
  const [email, setEmail] = useState<string>("");

  return (
    <div
      className="relative flex items-center py-4 justify-center min-h-screen w-screen overflow-hidden no-scrollbar bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${config.authBack})`,
      }}
    >
      <div className="max-width w-full h-full flex items-center justify-center">
        <div className="auth-screen bg-white overflow-y-auto">
            <div className="auth-title flex justify-center items-center relative">
            Password change
            </div>

            <div className={`auth-content flex flex-col items-center mb-7`}>
             
                <SuccessRegisterIcon className="h-32 w-auto" />
                  <div className="thanks-title">Lost your password?
                    Enter your details to recover</div>
                  <div className="thanks-words">Enter your details to proceed further</div>

                  {error ? <span style={{ color: 'rgb(248 113 113)' }}>{error}</span> : null}
                  <div className="w-full mb-5">
                  <CustomInput
                  label={'New Password'}
                  placeholder={'******'}
                  value={email}
                  icon={<LockIcon className="w-auto h-5" />}
                  onChange={(e: any) => setEmail(e)}
                  />
                  <CustomInput
                  label={'Confirm Password'}
                  placeholder={'******'}
                  value={email}
                  icon={<LockIcon className="w-auto h-5" />}
                  onChange={(e: any) => setEmail(e)}
                  />
                  </div>
                <CustomButton
                classname='custom-button w-full'
                label={"Change"}
                background={'#E73A5D'}
                color={'#FFFFFF'}
                // onClick={(e: any) => console.log('event', e)}
                onClick={() => {}}
                isLoading={false}
                />  
              
            </div>
            
        </div>  
      </div>
    </div>
  )
}
