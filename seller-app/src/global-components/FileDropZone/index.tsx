import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Blob } from 'buffer';

import EllipseIcon from '../../assets/images/EllipseIcon.png'
import EllipseIconDark from '../../assets/images/EllipseIconDark.png'
import FileSizeValidation from "../../utilities/fileSizeValidation";
import CustomButton from "../CustomButton";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { MoonLoader, ScaleLoader } from "react-spinners";
import { notifySuccess } from "../CustomAlert";
import { IMAGE_ACCEPT } from "../../utilities/constants";

interface FileDropzoneProps {
  width?: number | string
  height?: number
  onChange: Function
  accept?: any
  maxFiles?: number
  ellipseSize?: number
  multipleFiles?: boolean
  label?: string
}

const FileDropzone = ({ width = 315, height = 201, onChange, maxFiles = 1, accept = IMAGE_ACCEPT, ellipseSize = 60, multipleFiles, label="" }: FileDropzoneProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const [loading, setLoading] = useState(false)
  let uploadArray: Array<Blob> = []

  const onDrop = useCallback((acceptedFiles: any[]) => {
    try {
      uploadArray = []
      setLoading(true)
      for (let i = 0; i < acceptedFiles.length; i++) {
        let dataTemp = acceptedFiles[i]
        if (!FileSizeValidation(acceptedFiles[i])) {
          //alert('File too big!!')
          notifySuccess({ message: "File too big!!" })
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
  //@ts-ignore
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({ onDrop, maxFiles: maxFiles, accept, multiple: typeof multipleFiles === "undefined" ? true : multipleFiles })
  return (
    <div {...getRootProps()}
      className="realtive dropzone"
      style={{ fontSize: 13, width, height }}
    >
      {
        loading && (
          <div className="flex justify-center my-10">
            <ScaleLoader width={3} height={20} color="#F4A607" />
          </div>
        )
      }
      <input {...getInputProps()} />

      <img src={theme === 'light' ? EllipseIcon : EllipseIconDark}
        style={{ fontSize: 13, width: ellipseSize, height: ellipseSize }}
        alt={"icon"}
      />
      <p className="mt-2 mb-2 description"> Drag and drop your picture here </p>
      <p className="description">or</p>
      <div className="inline-flex mt-2">
        <CustomButton
        type={"button"}
          label={"BROWSE FILES"}
          background={'#F4A607'}
          classname="custom-button-32-font-16-600 font-poppins "
          color={'#FFFFFF'}
          onClick={(e: any) => console.log('event', e)}
        />
      </div>

      {label &&  
      <div className="absolute top-3 left-3 custom-input-group-label" >
          {label}
      </div>
      }
    </div>
  )
}

export default FileDropzone
