import React, { useState } from 'react'
import './cardcarousel.css'
import {ReactComponent as Arrow} from "../../assets/icons/Trash.svg";
interface Props {
  show?: number
  children: any
  withGrow?: boolean
  customNextIconPosition?: boolean
  showIndex?: boolean
  academyArrows?: boolean
}

const CardCarousel = ({
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
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, length - show));
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };
  
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
  const intervalle = 200;
  const translateValue = -1 * currentIndex * (320 + 32);
  return (
    <div className='relative flex flex-row w-full carousel-side'>
      <div className='carousel-wrapper'>

        <div
          className='carousel-content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: 'transform 0.3s ease-in-out', // Add transition for smooth animation
            }}
          >
            {children}
          </div>
        </div>

      </div>

      <div
        className='flex justify-center items-center space-x-16 tablet:space-x-24 right-14 tablet:right-24'
        style={{
          position: 'absolute',
          zIndex: 1,
          top: -57,
          marginTop: 15
        }}
      >

        <div onClick={prev} className={'flex items-center cursor-pointer carousel-arrow'}>
          <Arrow className="w-3 h-auto transform rotate-180" />
        </div>


        <div onClick={next} className={'flex items-center cursor-pointer carousel-arrow'}>
          <Arrow className="w-3 h-auto" />
        </div>
      </div>
    </div>
  )
}

export default CardCarousel
