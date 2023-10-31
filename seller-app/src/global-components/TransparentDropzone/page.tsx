"use client"

import FileSizeValidation from '../../utilities/fileSizeValidation';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { notifySuccess } from '../CustomAlert';
import { IMAGE_ACCEPT } from '../../utilities/constants';

interface TransparentDropzoneProps {
    handleDropZone: Function
}

function TransparentDropzone({ handleDropZone }: TransparentDropzoneProps) {
    const uploadArray: Array<Blob> = []

    const onDrop = useCallback((acceptedFiles: any[]) => {
        try {
            for (let i = 0; i < acceptedFiles.length; i++) {
                let dataTemp = acceptedFiles[0]
                if (!FileSizeValidation(acceptedFiles[0])) {
                    notifySuccess({ message: "File too big!!" })
                } else {
                    uploadArray.push(dataTemp)
                }
            }
            handleDropZone(uploadArray)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, accept: IMAGE_ACCEPT })


    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
        </div>
    );
}

export default TransparentDropzone;
