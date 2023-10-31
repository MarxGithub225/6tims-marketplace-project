/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useMemo, useRef, useState } from 'react'
import { ScaleLoader } from "react-spinners";
import FileDropZone from "../../../../global-components/FileDropZone";
import { Blob } from "buffer";
import { CreateRequest } from '../../../../sdks/blog-v1/utils/DataSchemas';
import useImage from '../../../../hooks/useImage';
import { API_FILE_URL, IMAGE_ACCEPT, calcReadingDuration, formatDuration } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifySuccess } from "../../../../global-components/CustomAlert";
import ReactQuill, {Quill} from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import BlotFormatter from 'quill-blot-formatter';
import ReactPlayer from "react-player";
import { File } from '../../../../sdks/image-v1/utils/DataSchemas';

const Video = Quill.import('formats/video');
const Link = Quill.import('formats/link'); 

interface AddSettingProps {
    modalOpened: boolean
    toggleModal: () => void
    upsertSetting: Function
    currentSetting: any
    setCurrentSetting: Function
    loading: boolean,
    settingTitle: string
}
const defaultSetting: CreateRequest = {
    title: "",
    imageId: null,
    largeImageId: null,
    description: "",
    videoUrl: "",
    isVideo: false,
    videoDuration: 0,
    readDuration: 0,
    suspended: false
}

class CoustomVideo extends Video {
    static create(value: any) {
      const node = super.create(value);
      
      const video = document.createElement('video')
      video.setAttribute('controls', '');
      video.setAttribute('type', "video/mp4");
      video.setAttribute('style', "height: 100%; width: 100%");
      video.setAttribute('src', this.sanitize(value));
      node.appendChild(video);
  
      return node;
    }
  
    static sanitize(url: any) {
      return Link.sanitize(url);
    }
};

CoustomVideo.blotName = 'video';
CoustomVideo.className = 'ql-video';
CoustomVideo.tagName = 'iframe';

Quill.register('formats/video', CoustomVideo);
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
Quill.register('modules/blotFormatter', BlotFormatter);

function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle}: AddSettingProps) {
    const quillRef: any = useRef();
    const { client } = useImage()
    const [imageLoading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] =
        useState<any>(currentSetting?.image ? currentSetting?.image : null)
    const [largeImageSrc, setIconSrc] =
        useState<any>(currentSetting?.largeImage ? currentSetting?.largeImage : null)
    const [currentType, setCurrentType] =  useState<string>('')

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
    }

    const removeImage = (data: any, type: string) => {
        setCurrentType(type)
        setLoading(true)
        !deleteMutation.isLoading && deleteMutation.mutate(data)
    }

    const handleDropZone = (data: Array<any>, type: string) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                upsertFile(data[0], 'blog')
                setCurrentType(type)
            };
        }
    }

    const upsertMutation = useMutation({
        mutationFn: async (body: any) => {
            return await client?.createImage(body)
        },
        onSuccess: (response: any) => {
            if(currentType === 'image') {
                setImageSrc(response)
                setCurrentSetting({ ...currentSetting, imageId: response?._id })
            }else {
                setIconSrc(response)
                setCurrentSetting({ ...currentSetting, largeImageId: response?._id })
            }
            setLoading(false)
        },
        onError: (e: any) => {
            let error: string = "IMAGE_TOO_LARGE";
            error = e?.errors?.msg ?? error
            notifyError({ message: error })
            setLoading(false)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (body: any) => await client?.deleteFile(body?.folder, body?.path, body?.id),
        onSuccess: (response: any) => {
            if(currentType === 'image') {
                setImageSrc(null)
                setCurrentSetting({ ...currentSetting, imageId: "" })
            }else {
                setIconSrc(null)
                setCurrentSetting({ ...currentSetting, largeImageId: ""})
            }
            setLoading(false)
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
            setLoading(false)
        }
    })

    const upsertFile = (image: Blob, path: string) => {
        setLoading(true)
        !upsertMutation.isLoading && upsertMutation.mutate({image, path})
    }

    
    
      const formats = [
        'background',
        'bold',
        'color',
        'font',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'image',
        'video',
      ];

      const  imageHandler = async () => {  
    
        const input: any = document.createElement('input');  
        input.setAttribute('type', 'file');  
        input.setAttribute('accept', 'image/*');  
        input.click();  
      
        input.onchange = async () => { 
          const [file] = input.files; 
          const formData = new FormData();
          formData.append("image", file);
         try {
            const result: File  = await client?.createImage({image: file, path: 'blog'})
            uploadFiles(result?.path)
        } catch (e: any) {
            console.log(e)
            let error: string = "IMAGE_TOO_LARGE";
            error = e?.errors?.msg ?? error
            notifyError({ message: error })
        }
      
        };  
      } 

      const uploadFiles = async (filename: string) => { 
        const editor = quillRef.current.getEditor();
       const res = API_FILE_URL + '/blogs/' + filename;  
       editor.insertEmbed(editor.getSelection(), "image", res);
    }

      const descriptionChange = (value: any) => {
    
        setCurrentSetting({
          ...currentSetting, description: value
        })
      }

      const modulesDescription = useMemo(() => ({
        imageActions: {},
        imageFormats: {},
        toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, false] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['link', 'image'],
                ['clean'],
              ],
              handlers: {
                image: () => {
                    imageHandler();
                }
              }
            },
      }), [])

      const onDuration = (duration: any) => {
        setCurrentSetting({ ...currentSetting, videoDuration: duration })
      }

    return (
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="feature-add full-modal"
        >
            <div className="py-10 w-full h-auto flex justify-center">
                <div className="no-scrollbar h-auto w-[100%] intermWidth:w-[992px]"
                >
                    <div className="modal-label">{currentSetting?._id ? 'Edit' : 'Add'} {settingTitle}</div>

                    <div className="overflow-hidden min-h-[500px]" >
                        {currentSetting?.videoUrl && (
                            <div className="mb-10" style={{ display: "flex", justifyContent: "center" }}>
                                <ReactPlayer
                                    controls
                                    url={currentSetting?.videoUrl}
                                    width="100%"
                                    onDuration={onDuration}
                                />
                            </div>
                        )}

                        <div className="flex items-center mb-10 gap-4">
                            <div className="custom-input-check">
                                <label className={`option capitalize`}>
                                    {`${currentSetting?.isVideo ? 'Vidéo' : 'Pas vidéo'}`}
                                    <input
                                        type="checkbox"
                                        checked={currentSetting?.isVideo}
                                        value={currentSetting?.isVideo}
                                        onChange={(e: any) => setCurrentSetting({ ...currentSetting, isVideo: !currentSetting?.isVideo})}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            {(currentSetting?.isVideo || currentSetting?.description) && <span className='custom-input-group-label'>Durée de lecture (min) : <span className='font-bold'>{currentSetting?.isVideo ? formatDuration(currentSetting?.videoDuration) : (calcReadingDuration(currentSetting?.description) || currentSetting?.readDuration)}</span> </span>}
                        
                        </div>

                        
                        <div className="custom-input-group">
                            <div className="custom-input-group-label">Titre</div>
                            <input
                                name='title'
                                value={currentSetting?.title}
                                className='custom-input-group-value custom-input-group-value-no-big w-full'
                                onChange={handleChange}
                                placeholder={'Add title'}
                            />
                        </div>

                        {currentSetting?.isVideo && <div className="custom-input-group">
                            <div className="custom-input-group-label">Vidéo URL</div>
                            <input
                                name='videoUrl'
                                value={currentSetting?.videoUrl}
                                className='custom-input-group-value custom-input-group-value-no-big w-full'
                                onChange={(e: any) => {
                                    if (!e.target.value) {
                                        setCurrentSetting({...currentSetting, videoDuration: 0, videoUrl: ''})
                                    } else {
                                        const canPlayVideo = ReactPlayer.canPlay(e.target.value)
                
                                        if (!canPlayVideo) {
                                            setCurrentSetting({...currentSetting, videoDuration: 0, videoUrl: e.target.value });
                                        } else {
                                            setCurrentSetting({...currentSetting, videoUrl: e.target.value });
                                        }
                                    }
                                }}
                                placeholder={'Add URL'}
                            />
                        </div>}
                        {!imageSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                            {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                                <ScaleLoader width={3} height={20} color="#F4A607" />
                            </div>
                        :
                            <div className="w-full">
                                <FileDropZone
                                    onChange={(data: Array<Blob>) => {
                                        handleDropZone(data, 'image')
                                    }}
                                    accept={IMAGE_ACCEPT}
                                    maxFiles={1}
                                    width={"100%"}
                                    height={201}
                                    multipleFiles={false}
                                    label='Add image'
                                />
                            </div>    
                        }
                            
                        </div>
                            :
                            <div className="mt-4 mb-10 flex items-center justify-center">
                                <div className="icon-result">
                                    <img
                                        src={API_FILE_URL + '/blogs/' + imageSrc?.path}
                                        width={100}
                                        height={80}
                                        className='rounded-md'
                                        alt="Picture of the author"
                                    />
                                    {currentType === 'image' && imageLoading ? <div className="flex justify-center my-10">
                                        <ScaleLoader width={3} height={20} color="#F4A607" />
                                    </div>:
                                    <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                        removeImage({folder: 'blogs', path: imageSrc?.path, id: imageSrc?._id}, 'image')
                                    }}>Remove image</div>}
                                </div>
                            </div>
                        }

                        {!largeImageSrc ? <div className="mt-10 mb-14 flex items-center justify-center">
                        {currentType === 'largeImage' && imageLoading ? <div className="flex justify-center my-10">
                                <ScaleLoader width={3} height={20} color="#F4A607" />
                            </div>
                        :
                            <div className="w-full">
                                <FileDropZone
                                    onChange={(data: Array<Blob>) => {
                                        handleDropZone(data, 'largeImage')
                                    }}
                                    accept={IMAGE_ACCEPT}
                                    maxFiles={1}
                                    width={"100%"}
                                    height={201}
                                    multipleFiles={false}
                                    label='Add large image'
                                />
                            </div>}
                        </div>
                            :
                            <div className="mt-4 mb-10 flex items-center justify-center">
                                <div className="icon-result">
                                    <img
                                        src={API_FILE_URL + '/blogs/' + largeImageSrc?.path}
                                        width={100}
                                        height={80}
                                        className='rounded-md'
                                        alt="Picture of the author"
                                    />
                                    {currentType === 'largeImage' && imageLoading ? <div className="flex justify-center my-10">
                                        <ScaleLoader width={3} height={20} color="#F4A607" />
                                    </div>:
                                    <div className="remove-icon text-center cursor-pointer" onClick={() => {
                                        removeImage({folder: 'blogs', path: largeImageSrc?.path, id: largeImageSrc?._id}, 'largeImage')
                                    }}>Remove largeImage</div>}
                                </div>
                            </div>
                        }

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mt-3">Description</div>
                            <ReactQuill
                                ref={quillRef}
                                modules={modulesDescription}
                                formats={formats}
                                onChange={descriptionChange} 
                                value = {currentSetting?.description}
                            />  
                        </div>
                        <div className="custom-input-check">
                            <label className={`option capitalize`}>
                                {`${currentSetting?.suspended ? 'Suspendu' : 'Pas suspendu'}`}
                                <input
                                    type="checkbox"
                                    checked={currentSetting?.suspended}
                                    value={currentSetting?.suspended}
                                    onChange={(e: any) => setCurrentSetting({ ...currentSetting, suspended: !currentSetting?.suspended})}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        

                        <div className="flex justify-end w-full">
                            <div className="flex item-center space-x-3 actions-buttons">
                                <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                    onClick={() => {
                                        {
                                            setCurrentSetting(defaultSetting)
                                            toggleModal()
                                        }
                                    }}
                                >Cancel</div>
                                <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                    style={(!currentSetting?.title?.trim() || !imageSrc || !largeImageSrc) ? {
                                        backgroundColor: "#bdbdbd",
                                        cursor: "not-allowed"
                                    } : {}}
                                    onClick={() => {
                                        currentSetting?.title?.trim() && !loading && upsertSetting()
                                    }}
                                >{loading ?
                                    <ScaleLoader width={3} height={20} color="white" />
                                    : (currentSetting?._id ? 'Edit' : 'Create')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </CustomModal>
    )
}

export default AddSetting