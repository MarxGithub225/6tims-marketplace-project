import React, { useState, useEffect } from 'react';

interface SlideshowProps {
    images: any[]
}

function Slideshow({ images }: SlideshowProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        // <div className="image-slider relative w-full bg-center bg-cover bg-no-repeat bg-gray"
        //     style={{ backgroundImage: `url(\'${currentSlide?.path}\')`, height: 600, borderRadius: 8 }}
        // >

        //     <div className="button cursor-pointer absolute left-4" style={{ top: "50%" }} ><Arrow className="h-4 w-auto transform -rotate-180" /></div>
        //     <div className="button cursor-pointer absolute right-4" style={{ top: "50%" }} ><Arrow className="h-4 w-auto" /></div>

        //     <div className="zoom-side absolute top-6 right-9">
        //         <div className="w-full px-4 flex items-center justify-between">
        //             <div className="flex items-center space-x-10">
        //                 <div className="plus"> <MinusIcon className="w-3 h-auto" /> </div>
        //                 <div className="minus"><Pluscon className="w-4 h-auto" />  </div>
        //             </div>

        //         </div>
        //     </div>

        //      <Link
        //         href={"http://localhost:3000/car-details"}
        //         className="px-3 modal-car-title-side absolute top-6 left-9 hover:underline hover:cursor-pointer">
        //         {image?.path}
        //     </Link>
        // </div>
        <div>
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={previousImage}
            >
                Previous
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={nextImage}
            >
                Next
            </button>
            <div className="image-slider relative w-full bg-center bg-cover bg-no-repeat bg-gray"
                style={{ backgroundImage: `url(\'${images[currentImageIndex].path}\')`, height: 600, borderRadius: 8 }}
            />
        </div>
    );
}

export default Slideshow;
