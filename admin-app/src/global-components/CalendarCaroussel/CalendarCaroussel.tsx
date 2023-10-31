import React, { useEffect, useState } from 'react'
import './cardcarousel.css'
import classnames from 'classnames'
import {ReactComponent as Arrow} from "../../assets/icons/Trash.svg";
interface Props {
  show?: number
  children: any
  withGrow?: boolean
  customNextIconPosition?: boolean
  showIndex?: boolean
  academyArrows?: boolean
}

const CalendarCaroussel = ({
  show = 4,
  children = undefined,
  withGrow = undefined,
  customNextIconPosition,
  showIndex,
  academyArrows

}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(children?.length)
  const [touchPosition, setTouchPosition] = useState(null)

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }


  const items = []
  for (let i = 0; i < Math.ceil(children?.length - show + 1); i++) {
    items.push(i)
  }
  const intervalle = 177;
  return (
    <div className='relative flex flex-row w-full carousel-side'>
      <div className='carousel-wrapper'>

        <div
          className='carousel-content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content-calendar show-${show} py-5 px-2`}
            style={{
              transform: `translateX(-${currentIndex * intervalle}px)`
            }}
          >
            {children}
          </div>
        </div>

      </div>


      <div
        className='flex justify-between items-center  w-full'
        style={{
          position: 'absolute',
          zIndex: 1,
          top: -55,
          right: 4
        }}
      >

        {(children?.length > show && currentIndex > 0) ? <div onClick={prev} className={'flex items-center cursor-pointer carousel--calendar-arrow'}>
          <Arrow  className="w-3 h-auto transform rotate-180" />
        </div>: <div/>}


        {children?.length > show && (currentIndex < length - show) && <div onClick={next} className={'flex items-center cursor-pointer carousel--calendar-arrow'}>
          <Arrow  className="w-3 h-auto" />
        </div>}
      </div>
    </div>
  )
}

export default CalendarCaroussel
