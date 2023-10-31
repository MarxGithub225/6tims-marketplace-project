import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Blob } from 'buffer';

import {ReactComponent as CameraIcon} from '../../assets/icons/CameraIcon.svg'

import FileSizeValidation from "../../utilities/fileSizeValidation";
import CustomButton from "../CustomButton";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IMAGE_ACCEPT } from "../../utilities/constants";

interface UserDropZoneProps {
  width?: any
  height?: any
  onChange: Function
  accept?: any
  maxFiles?: number
}

const UserDropZone = ({ width = 315, height = 182, onChange, maxFiles = 1, accept = IMAGE_ACCEPT }: UserDropZoneProps) => {
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
      className="user-dropzone"
      style={{ fontSize: 13, width: width, height: height }}>
      {/* {loading && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "-15px" }}>
          </div>
        )} */}

      <input {...getInputProps()} />

      <div className="illustration flex ietms-center space-x-2">
        <CameraIcon className="w-5 h-auto" />
        <span>Add photo</span>
      </div>
    </div>
  )
}

export default UserDropZone
