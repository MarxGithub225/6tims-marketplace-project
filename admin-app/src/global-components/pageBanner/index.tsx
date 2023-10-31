'use client'
import React from "react";
import {ReactComponent as ArrowLeft} from '../../assets/icons/ArrowLeft.svg'
import banner from '../../assets/images/backgrounds/user-bg.png'
import { useNavigate } from "react-router-dom";
interface PagebannerProps {
  header: string
  description: string
  bannerImg?: any
}
function Pagebanner({ header, description, bannerImg = banner }: PagebannerProps) {
  const router = useNavigate();

  return <div className="mb-8 mt-8 otherWidth:mt-0 flex items-center page-banner bg-center bg-cover bg-no-repeat"
    style={{ background: `linear-gradient(88.35deg, rgba(26, 0, 68, 0.75) 21.05%, rgba(217, 217, 217, 0) 98.6%), url(${bannerImg.src})` }} >
    <div className="back-button-2 cursor-pointer" onClick={() => router(-1)}> <ArrowLeft className="h-3 w-auto" /> </div>
    <div className="ml-4">
      <div className="title">{header} </div>
      <div className="description">{description}</div>
    </div>
  </div>;
}

export default Pagebanner;
