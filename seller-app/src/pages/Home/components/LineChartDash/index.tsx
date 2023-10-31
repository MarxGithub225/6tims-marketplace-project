import React, { useLayoutEffect, useState } from "react";
import {ReactComponent as Calendar} from "../../../../assets/icons/Sidebar/Calendar.svg"
import { AreaChart, Area, XAxis, YAxis, Dot, Tooltip } from 'recharts';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
;
function LineChartDash() {
  const [statsWidth, setStatsWidth] = useState(526)
  const theme = useSelector((state: RootState) => state.theme.theme);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 991)
      setStatsWidth(526)
      else if(window.innerWidth > 884)
      setStatsWidth(window.innerWidth / 1.9)
      else setStatsWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  function CustomTooltip({ payload, label, active }: any) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload?.fullname}`}</p>
          <p className="desc">{`${payload[0].value} Bokings`}</p>
        </div>
      );
    }

    return null;
  }

  const data = [
    { fullname: 'January 15', name: 'Jan 15', uv: 5000 },
    { fullname: 'January 16', name: 'Jan 16', uv: 3456 },
    { fullname: 'January 17', name: 'Jan 17', uv: 3000 },
    { fullname: 'January 18', name: 'Jan 18', uv: 2500 },
    { fullname: 'January 19', name: 'Jan 19', uv: 3456 },
    { fullname: 'January 20', name: 'Jan 20', uv: 1000 },
    { fullname: 'January 21', name: 'Jan 21', uv: 4000 }
  ];

  const customeStyle = {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.1,
    paddingTop: 16
  }

  return <div className="upcoming-auctions">
    <div className="flex items-center justify-between header mb-10">
      <div className="section-title">Booking Statistic</div>
      <div className="section-icon flex items-center"><Calendar className="w-auto h-4 mr-6" /> Week</div>
    </div>
    <AreaChart
      width={statsWidth} 
      height={227}
      data={data}
    >
      <defs>
        <linearGradient id="colorUvBigScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={theme === 'light' ? "#F4A607": "#E73A5D"} stopOpacity={0.4} />
          <stop offset="95%" stopColor={theme === 'light' ? "#F4A607": "#E73A5D"} stopOpacity={0} />
        </linearGradient>

      </defs>
      <XAxis dataKey="name" fill="#EEEEEE"
        tick={customeStyle}
        dy={14}
      />
      <YAxis className="hidden" />
      <Tooltip content={<CustomTooltip />} />
      <Area type="linear" dataKey="uv" stroke={theme === 'light' ? "#F4A607": "#E73A5D"} fillOpacity={1} fill="url(#colorUvBigScreen)" />
      <Dot r={18} />
    </AreaChart>
  </div>;
}

export default LineChartDash;
