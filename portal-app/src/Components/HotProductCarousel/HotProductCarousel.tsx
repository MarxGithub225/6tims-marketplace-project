import React, { useEffect, useLayoutEffect, useState } from 'react'
import './cardcarousel.css'
interface Props {
  show?: number
  children: any
  withGrow?: boolean
  customNextIconPosition?: boolean
  showIndex?: boolean
  academyArrows?: boolean
}

const HotProductCarousel = ({
  children = undefined,
  withGrow = undefined,
  customNextIconPosition,
  showIndex,
  academyArrows

}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchPosition, setTouchPosition] = useState(null)
  const [intervalle, setIntervale] = useState(window.innerWidth > 1440 ? (1410/3): window.innerWidth > 1024 ? (((window.innerWidth - 30) / 3)) :  window.innerWidth > 768 ? (((window.innerWidth - 30) / 2)): window.innerWidth)
  const [show, setShowItem] = useState(window.innerWidth > 1024 ? 3: window.innerWidth > 768 ? 2 :1)

  const next = () => {
    if (currentIndex < children?.length - show) {
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
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1440){
        setShowItem(3)
        setIntervale((1410 / 3))
      }
      else if (window.innerWidth > 1024){
        setShowItem(3)
        setIntervale((((window.innerWidth - 30) / 3)))
      }
      else if (window.innerWidth > 768){
        setShowItem(2)
        setIntervale((((window.innerWidth - 30) / 2)))
      }
      else {
        setShowItem(1)
        setIntervale(window.innerWidth - 15)
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <><div className='relative flex flex-row w-full carousel-side mb-20'>
      <div className='carousel-wrapper'>

        <div
          className='product-carousel-content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`product-carousel-content show-${show} pb-6`}
            style={{
              transform: `translateX(-${currentIndex * intervalle}px)`
            }}
          >
            {children}
          </div>
        </div>

      </div>
    </div>
    
    <div className="swiper-pagination mt-6 swiper-pagination-clickable swiper-pagination-bullets bottom-2">
      <div className="flex justify-center items-center" >
        <div className={`swiper-button-prev btn-slide-prev ${((children?.length > show) && (currentIndex > 0)) ? 'opacity-100 pointer-events-auto': 'opacity-60 pointer-events-none'}`} onClick={prev}/>
      </div>
      { children &&
      items.map((item: any, index: number) => {
        return (
          <span key={index} className={`swiper-pagination-bullet ${index === currentIndex ? 'swiper-pagination-bullet-active' : ''}`} tabIndex={0} role="button" aria-label={`Go to slide ${index + 1}`} />
        )
      })}
      <div className='flex justify-center items-center' >
        <div className={`swiper-button-next btn-slide-next active ${((children?.length > show) && (currentIndex < children?.length - show)) ? 'opacity-100 pointer-events-auto': 'opacity-60 pointer-events-none'}`} onClick={next}/>
      </div>
    </div>
    </>
  )
}

export default HotProductCarousel
