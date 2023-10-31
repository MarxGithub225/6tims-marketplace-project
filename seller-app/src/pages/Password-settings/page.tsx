"use client"

import banner from '../../assets/images/backgrounds/banner.png'
import {ReactComponent as Safe} from '../../assets/icons/Safe.svg'
import {ReactComponent as Checked} from '../../assets/icons/Checked.svg'
import {ReactComponent as LockIcon}  from '../../assets/icons/BlackLock.svg'

import { useDispatch } from 'react-redux'
import { setTitle } from '../../redux/features/headerSlice'
import CustomInput from "../../global-components/customInput";
import CustomButton from "../../global-components/CustomButton";
import Pagebanner from '../../global-components/pageBanner'
export default function Home() {
  const dispatch = useDispatch()
  dispatch(setTitle('Profile Settings'))
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
                value={''}
                icon={<LockIcon className="w-auto h-5 setting-lock" />}
                onChange={(e: any) => console.log('event', e)}
                />

              <CustomInput
                label={'New password'}
                placeholder={'******'}
                value={''}
                icon={<Checked className="w-auto h-5" />}
                onChange={(e: any) => console.log('event', e)}
                />

              <CustomInput
                label={'Confirm new password'}
                placeholder={'******'}
                value={''}
                icon={<Checked className="w-auto h-5" />}
                onChange={(e: any) => console.log('event', e)}
                />

                <div className="w-full inline-flex items-center space-x-2">
                <div className="w-44">
                <CustomButton
                label={'Update Settings '}
                classname='custom-button-40'
                background={'#E73A5D'}
                color={'#FFFFFF'}
                onClick={(e: any) => console.log('event', e)}
                />
                </div>

                <div className="w-32">
                <CustomButton
                label={'Cancel'}
                classname='custom-button-40 cancel-button'
                background={'#F5F6F7'}
                color={'#64748B'}
                onClick={(e: any) => console.log('event', e)}
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
