"use client"

import { useDispatch, useSelector } from 'react-redux'
import { setBackButton, setTitle } from '../../redux/features/headerSlice'
import {ReactComponent as Community} from '../../assets/icons/CommunityIcon.svg'
import {ReactComponent as FlyWheel} from '../../assets/icons/FlyWheel.svg'
import {ReactComponent as Car} from '../../assets/icons/Car.svg'
import {ReactComponent as BookList} from '../../assets/icons/BookList.svg'
import TopAgency from './components/TopAgency'
import LineChartDash from './components/LineChartDash'
import { RootState } from '../../redux/store'
import TopDriver from './components/TopDriver'
import UpcomingPerformances from './components/UpcomingPerformances'
import StatsFeatureItem from './components/StatsFeatureItem'
import PendingRequests from './components/PendingRequests'
import TopCountries from './components/TopCountries'
import OrganisationPerformance from './components/OrganisationPerformance'
export default function Home() {
  const dispatch = useDispatch()
  dispatch(setTitle('Dashboard'))
  dispatch(setBackButton(false))
  const theme = useSelector((state: RootState) => state.theme.theme)

  const statsFeatures = [
    {
      label: 'Total customer',
      icon: <Community className="w-5 h-auto fill-icon" />,
      value: '10,546',
      percentage: '+10%'
    },
    {
      label: 'Total car',
      icon: theme === 'light' ? <FlyWheel className="w-5 h-auto fill-icon" /> : <Car className="w-5 h-auto" />,
      value: '1,556',
      percentage: '+10%'
    },
    {
      label: 'Total Booking',
      icon: <BookList className="w-5 h-auto stroke-icon" />,
      value: '12,556',
      percentage: '+10%'
    }
  ]
  return (
    <div className="page-content flex justify-center">
      <div className="w-full max-width page-container mt-5">
        <div className="w-full flex flex-col itemWidth:flex-row itemWidth:items-center itemWidth:justify-between stats-features space-y-5 itemWidth:space-y-0 itemWidth:space-x-5">
          {
            statsFeatures.map((stats: any, index: number) => {
              return <StatsFeatureItem
              key={index}
              {...stats}
              />
            })
          }
        </div>

        <div className="flex w-full flex-col itemWidth:flex-row itemWidth:items-center itemWidth:justify-center space-y-12 itemWidth:space-y-0 itemWidth:space-x-10 desktop:space-x-20 mt-12 desktop:mt-24">
          <LineChartDash />
          
          <PendingRequests/>
        </div>
        <div className="dash-divier" />

        <div className="mt-12 itemWidth:mt-0 flex w-full flex-col itemWidth:flex-row itemWidth:items-center itemWidth:justify-center space-y-12 itemWidth:space-y-0 itemWidth:space-x-10 desktop:space-x-20">
          
          
        <OrganisationPerformance />
            <TopCountries/>
        </div>
      </div>
    </div>

  )
}
