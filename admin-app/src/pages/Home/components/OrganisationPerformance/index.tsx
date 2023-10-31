import React from "react";
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
function OrganisationPerformance() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return <div className="upcoming-auctions organisation-performance">
    <div className="flex items-center justify-between header mb-8">
      <div className="section-title">Organisation performance</div>
    </div>

   <div className="px-3">
    <div className="performance-title">All Organisations</div>
    <div className="performance-sub-title">743 Organisations</div>

    <div className="performance-stats flex items-end justify-between gap-x-4 intermWidth:gap-x-11 mt-3">
      <div className="flex flex-col justify-between gap-y-[45px]">
        <div className="performance-stats-items">
          <div className="performance-stats-item flex items-center justify-between">
            <span>Total bookings</span>
            <span>847</span>
          </div>
          <div className="performance-stats-item flex items-center justify-between">
            <span>Total bookings</span>
            <span>847</span>
          </div>
          
        </div>
        <div className="flex items-center gap-x-4">
            <div className="flex flex-col items-start total-bar">
              <div className="label">Total</div>
              <div className="bottom-line"></div>
            </div>
            <div className="flex flex-col items-start approved-bar">
              <div className="label">Approved</div>
              <div className="bottom-line"></div>
            </div>
          </div>
      </div>
      <div className="performance-stats-circle">
        <CircularProgressbarWithChildren 
        strokeWidth={3}
        styles={buildStyles({
          rotation: 1,
          strokeLinecap: 'butt',
      
          // Text size
          textSize: '16px',
      
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
      
          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',
      
          // Colors
          pathColor: `rgba(121, 99, 240,1)`,
          textColor: '#f88',
          trailColor: theme === 'light' ? '#fff': '#201833',
          backgroundColor: '#F4A607',
        })}
        value={90}>
          <div className="performance-stats-number">845</div>
          <p>Approved on 47</p>
        </CircularProgressbarWithChildren>
      </div>
    </div>
   </div>
  </div>;
}

export default OrganisationPerformance;
