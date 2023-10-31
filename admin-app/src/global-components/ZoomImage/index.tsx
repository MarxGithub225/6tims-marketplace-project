import React, { useEffect, useState } from "react";
import { X } from 'react-feather'
import {ReactComponent as Arrow} from '../../assets/icons/Arrow.svg'
import CustomModal from "../CustomModal";
import {ReactComponent as Pluscon} from '../../assets/icons/Pluscon.svg'
import {ReactComponent as MinusIcon} from '../../assets/icons/MinusIcon.svg'
import {ReactComponent as CrossIcon} from '../../assets/icons/CrossIcon.svg'
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import { Link } from "react-router-dom";

interface ZoomImageProps {
  modalOpened: boolean,
  toggleModal: Function,
  from?: string,
  images: any[],
  currentIndex?: number
}
function ZoomImage({ modalOpened, toggleModal, from = "gallery", images, currentIndex = 1 }: ZoomImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
  }, [currentIndex])

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 10, 10));
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const imageStyles = {
    transform: `scale(${zoomLevel / 100})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%'
  };

  return <CustomModal
    open={modalOpened}
    toggle={toggleModal}
    className="profile-cropper"
  >
    <div className="fixed top-6 bigTablet:top-10 right-10 block bigTablet:hidden mobile-modal-close" style={{ zIndex: 100000 }}>
      <CrossIcon className="w-5 h-auto text-white cursor-pointer" onClick={() => toggleModal()} />
    </div>

    <div className="image-slider relative w-full bg-center bg-cover bg-no-repeat bg-gray overflow-hidden"
      style={{ width: 1200, height: 700, borderRadius: 8 }}
    >
      <div
        style={{ ...imageStyles, backgroundImage: `url(${process.env.NEXT_PUBLIC_VROOM_STATIC + images[currentImageIndex]?.path})` }}
      />
      <div className="button cursor-pointer absolute left-4" style={{ top: "50%" }} onClick={previousImage}><Arrow className="h-4 w-auto transform -rotate-180" /></div>
      <div className="button cursor-pointer absolute right-4" style={{ top: "50%" }} onClick={nextImage}><Arrow className="h-4 w-auto" /></div>

      <div className="zoom-side absolute top-6 right-9 bigTablet:flex hidden">
        <div className="w-full px-4 flex items-center justify-between">
          <div className="flex items-center justify-center space-x-10">
            <div className="plus w-6 h-6 cursor-pointer flex items-center justify-center" onClick={handleZoomIn}> <MinusIcon className="w-3 h-auto" /> </div>
            <div className="minus w-6 h-6 cursor-pointer flex items-center justify-center" onClick={handleZoomOut}><Pluscon className="w-4 h-auto" />  </div>
          </div>

          <CrossIcon className="w-3 h-auto text-white cursor-pointer" onClick={() => toggleModal()} />
        </div>
      </div>

      {from && <Link
        to={LinksEnum.users + '/' + images[currentImageIndex]?.car_id}
        className="px-3 modal-car-title-side absolute top-6 left-9 hover:underline hover:cursor-pointer">
        {images[currentImageIndex]?.car_name}
      </Link>}
    </div>
  </CustomModal>
}

export default ZoomImage;
