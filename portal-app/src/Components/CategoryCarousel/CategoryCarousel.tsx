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

const CategoryCarousel = ({
  children = undefined,
  withGrow = undefined,
  customNextIconPosition,
  showIndex,
  academyArrows

}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchPosition, setTouchPosition] = useState(null)
  const [intervalle, setIntervale] = useState(window.innerWidth > 1399 ? (((window.innerWidth - 30) / 9)) : window.innerWidth > 1069 ? (((window.innerWidth - 30) / 7)): window.innerWidth > 765 ? (((window.innerWidth - 30) / 5)): window.innerWidth > 639 ? (((window.innerWidth - 30) / 4)): window.innerWidth > 499 ? (((window.innerWidth - 30) / 3)): (((window.innerWidth - 30) / 2)))
  const [show, setShowItem] = useState(window.innerWidth > 1399 ? 9: window.innerWidth > 1069 ? 7: window.innerWidth > 765 ? 5: window.innerWidth > 639 ? 4: window.innerWidth > 499 ? 3: 2)

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
    console.log('eee, eee')
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
      if (window.innerWidth > 1399){
        setShowItem(9)
        setIntervale((((window.innerWidth - 30) / 9)))
      }
      else if (window.innerWidth > 1069){
        setShowItem(7)
        setIntervale((((window.innerWidth - 30) / 7)))
      }
      else if (window.innerWidth > 765){
        setShowItem(5)
        setIntervale((((window.innerWidth - 30) / 5)))
      }
      else if (window.innerWidth > 639){
        setShowItem(4)
        setIntervale((((window.innerWidth - 30) / 4)))
      }
      else if (window.innerWidth > 499){
        setShowItem(3)
        setIntervale((((window.innerWidth - 30) / 3)))
      }
      else {
        setShowItem(2)
        setIntervale((((window.innerWidth - 30) / 2)))
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (<><div className='relative flex flex-row w-full carousel-side'>
      <div className='carousel-wrapper'>

        <div
          className='category-carousel-content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`category-carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * intervalle}px)`
            }}
          >
            {children}
          </div>
        </div>

      </div>
    </div>
    {children?.length > show && <div className="flex justify-center items-center absolute right-4 gap-x-4 top-0 z-50 category-slide-swipper">
        <div className={`flex cursor-pointer items-center justify-center custom-button-prev ${((children?.length > show) && (currentIndex > 0)) ? 'opacity-100 pointer-events-auto': 'opacity-60 pointer-events-none'}`} onClick={prev}/>
        <div className={`flex cursor-pointer items-center justify-center custom-button-next ${((children?.length > show) && (currentIndex < children?.length - show)) ? 'opacity-100 pointer-events-auto': 'opacity-60 pointer-events-none'}`} onClick={next}/>
      </div>}
    </>
  )
}

export default CategoryCarousel
