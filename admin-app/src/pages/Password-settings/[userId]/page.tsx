"use client"

import banner from '../../../assets/images/backgrounds/banner.png'

import {ReactComponent as Safe} from '../../../assets/icons/Safe.svg'
import {ReactComponent as Checked} from '../../../assets/icons/Checked.svg'
import {ReactComponent as LockIcon}  from '../../../assets/icons/BlackLock.svg'
import { useDispatch } from 'react-redux'
import { setTitle } from '../../../redux/features/headerSlice'
import { useState } from 'react'
import { notifyError, notifySuccess } from '../../../global-components/CustomAlert'
import CustomInput from "../../../global-components/customInput";
import CustomButton from "../../../global-components/CustomButton";
import Pagebanner from '../../../global-components/pageBanner'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const dispatch = useDispatch()
  const router = useNavigate();

  dispatch(setTitle('Profile Settings'))
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(value === newPassword);
  };

 

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (oldPassword.trim() !== '' && newPassword.trim() !== '' && confirmPassword.trim() !== '') {
     
    }
  }

  return (
    <div className="page-content flex justify-center">
      <div className="w-full max-width page-container">
        <Pagebanner
          bannerImg={banner}
          header='Login details'
          description='Your last activity and credentials'
        />

        <div className="w-full flex flex-col-reverse bigTablet:flex-row bigTablet:justify-between">
          <div className="informations-inputs">
            <div className="flex mb-6 items-center justify-between header">
              <div className="section-title">Change password</div>
            </div>
            <CustomInput
              label={'Current password'}
              placeholder={'******'}
              value={oldPassword}
              icon={<LockIcon className="w-auto h-5 setting-lock" />}
              onChange={(value: string) => setOldPassword(value)}
              type={'password'}
            />

            <CustomInput
              label={'New password'}
              placeholder={'******'}
              value={newPassword}
              icon={<Checked className="w-auto h-5" />}
              onChange={(value: string) => setNewPassword(value)}
              onBlur={handlePasswordChange}
              type={'password'}
            />

            <CustomInput
              label={'Confirm new password'}
              placeholder={'******'}
              value={confirmPassword}
              icon={<Checked className="w-auto h-5" />}
              onChange={handleConfirmPasswordChange}
              type={'password'}
            />
            {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
            <div className="w-full inline-flex items-center space-x-2 mt-4">
              <div className="w-44">
                <CustomButton
                  label={"Update Settings"}
                  classname='custom-button-40'
                  background={'#F4A607'}
                  color={'#FFFFFF'}
                  disabled={!oldPassword || !newPassword || !confirmPassword || !passwordMatch}
                  onClick={onSubmit}
                />
              </div>

              <div className="w-32">
                <CustomButton
                  label={'Cancel'}
                  classname='custom-button-40 cancel-button'
                  background={'#F5F6F7'}
                  color={'#64748B'}
                  onClick={(e: any) => router(-1)}
                />
              </div>
            </div>
          </div>
          <div className="user-g-information mb-8 bigTablet:mb-0">
            <div className="user-icon"><Safe className="w-5 h-auto" /></div>
            <div className="title">Password and questions</div>
            <div className="description">Ads that sing to commercials, advertisers are now using a new type of technology called media</div>

          </div>
        </div>
      </div>

    </div>

  )
}
