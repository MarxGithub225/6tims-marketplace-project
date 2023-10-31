"use client"

import {X} from 'react-feather'
import {ReactComponent as SuccessRegisterIcon} from "../../assets/icons/SuccessRegisterIcon.svg"
import {ReactComponent as Checked} from "../../assets/icons/Checked.svg"
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import CustomInput from "../../global-components/customInput";
import CustomButton from "../../global-components/CustomButton";
import { config } from '../../utilities/helper'

export default function PassForgot() {
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
      <div className="max-width w-full h-full flex items-center gap-10">
        <div className="auth-screen bg-white">
            <div className="auth-title flex justify-center items-center relative">
            Password recovery
            </div>

            <div className={`auth-content flex flex-col items-center mb-7`}>
             
                <SuccessRegisterIcon className="h-32 w-auto" />
                  <div className="thanks-title">Lost your password?
                    Enter your details to recover</div>
                  <div className="thanks-words">Enter your details to proceed further</div>

                  {error ? <span style={{ color: 'rgb(248 113 113)' }}>{error}</span> : null}
                  <div className="w-full mb-5">
                  <CustomInput
                  label={'Email'}
                  placeholder={'John@mail.com'}
                  value={email}
                  icon={<Checked className="w-auto h-5" />}
                  onChange={(e: any) => setEmail(e)}
                  />
                  </div>
                <CustomButton
                classname='custom-button w-full'
                label={"Recover"}
                background={'#E73A5D'}
                color={'#FFFFFF'}
                // onClick={(e: any) => console.log('event', e)}
                onClick={() => {}}
                isLoading={false}
                />  
              
            </div>
            
        </div>  
        <div className="bg-white rounded-md w-72 flex items-center justify-center p-6">
          <img src={config.authIllustr} className="w-60 h-auto" alt=""/>
        </div>
      </div>
    </div>
  )
}
