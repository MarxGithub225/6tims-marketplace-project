import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Blob } from 'buffer';

import EllipseIcon from '../../assets/images/EllipseIcon.png'
import EllipseIconDark from '../../assets/images/EllipseIconDark.png'
import FileSizeValidation from "../../utilities/fileSizeValidation";
import CustomButton from "../CustomButton";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IMAGE_ACCEPT } from "../../utilities/constants";

interface ProfileDropZoneProps {
  width?: number
  height?: number | string
  onChange: Function
  accept?: any
  maxFiles?: number
  nodash?: boolean
}

const ProfileDropZone = ({ width = 315, height = 201, onChange, maxFiles = 1, accept = IMAGE_ACCEPT, nodash }: ProfileDropZoneProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const [loading, setLoading] = useState(false)
  const uploadArray: Array<Blob> = []

  const onDrop = useCallback((acceptedFiles: any[]) => {
    try {
      setLoading(true)
      for (let i = 0; i < acceptedFiles.length; i++) {
        let dataTemp = acceptedFiles[i]
        if (!FileSizeValidation(acceptedFiles[i])) {
          alert('File too big!!')
        } else {
          uploadArray.push(dataTemp)
        }
      }
      onChange(uploadArray)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: IMAGE_ACCEPT })
  return (
    <div {...getRootProps()}
      className={`profile-drop-zone-pic ${!nodash ? "dropzone" : "dropzone-no-dashed"}`}
      style={{ fontSize: 13, width: width, height: height }}>
      {/* {loading && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "-15px" }}>
          </div>
        )} */}

      <input {...getInputProps()} />

      <img src={theme === 'light' ? EllipseIcon : EllipseIconDark} className="w-20 h-auto" />
      <p className="mt-12 mb-2 description"> Drag and drop your picture here</p>
      <p className="description">or</p>
      <div className="inline-flex mt-12">
        <CustomButton
          label={"Browse files"}
          background={'#F4A607'}
          classname="custom-button-40-font-16-500 font-poppins "
          color={'#FFFFFF'}
          onClick={(e: any) => console.log('event', e)}
        />
      </div>
    </div>
  )
}

export default ProfileDropZone
