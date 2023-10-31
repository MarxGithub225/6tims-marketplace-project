/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { Variable } from '../../../../sdks/product-v1/utils/DataSchemas';
import { API_FILE_URL, dateToLocalString } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import {ReactComponent as CloseCaret} from '../../../../assets/icons/Close.svg'

import {ReactComponent as Arrow} from '../../../../assets/icons/Arrow.svg'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { ScaleLoader } from 'react-spinners';
import ReactQuill, {Quill} from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import BlotFormatter from 'quill-blot-formatter';
import { useMemo, useRef, useState } from 'react';
import useImage from '../../../../hooks/useImage';
import { notifyError, notifySuccess } from '../../../../global-components/CustomAlert';
import { File } from '../../../../sdks/image-v1/utils/DataSchemas';
import useRefuse from '../../../../hooks/useRefuse';
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

interface CarImageProps {
    image: any;
    index: number;
    mainImage: number;
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
const CarImage = ({ image, index, mainImage}: CarImageProps) => {
    
    return (
        <div
            key={index}
            className="car-image relative image-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(\'${API_FILE_URL}/products/${image?.path}\')`,
                borderRadius: 8,
                height: 201,
            }}
        >
            {image._id === mainImage && (
                <div className="absolute top-4 left-4 principal-image">Main image</div>
            )}
        </div>
    );
};

function AddSetting({ modalOpened, toggleModal, currentSetting, setCurrentSetting, settingTitle, upsertSetting, loading}: AddSettingProps) {
    let reviewRef: any = useRef(null);
    let topViewRef: any = useRef(null);
    const [showRefuseForm, setRefuseForm] = useState<boolean>(false)
    const [refuseData, setRefuseData] = useState<any>({
        reason: [],
        notes: '',
        ownerId: currentSetting?.sellerId,
        productId: currentSetting?._id,
        validated: false
    })
    const { client } = useImage()
    const { client: refuseClient} = useRefuse()
    const quillRef: any = useRef();
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
        const [cancelledOpened, setCancelledModalOpen] = useState<boolean>(false)
        const toggleCancelledModal = () => {
              setCancelledModalOpen(!cancelledOpened)
            }
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
            const result: File  = await client?.createImage({image: file, path: 'product'})
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
        const res = API_FILE_URL + '/products/' + filename;  
        editor.insertEmbed(editor.getSelection(), "image", res);
    }
    
    const noteChange = (value: any) => {
        setRefuseData({
            ...refuseData, notes: value
        })
    }
    const modules = useMemo(() => ({
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

    const upsertMutation = useMutation({
        mutationFn: async () => {
            return await refuseClient?.createRefuse(refuseData)
        },
        onSuccess: (response: any) => {
            toggleModal()
            setCurrentSetting({...currentSetting, refuseId: response?._id,
                suspended: false,
                new: false,
                updated: false,
                approved: false,
                cancelled: true,
                archived: true})
            setTimeout(() => {
                !loading && upsertSetting()
            }, 500);
            setRefuseData({
                reason: [],
                notes: '',
                ownerId: currentSetting?.sellerId,
                productId: currentSetting?._id,
                validated: false
            })
            notifySuccess({ message: `Saved successfully !` })
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const upsertRefuse = () => {
        !upsertMutation.isLoading && upsertMutation.mutate()
    }
    return (
        <>
        <CustomModal
            open={modalOpened}
            toggle={toggleModal}
            className="feature-add full-modal"
        >
            <div className="py-10 w-full h-auto flex justify-center" ref={topViewRef}>
                <div className="no-scrollbar h-auto w-[100%] intermWidth:w-[992px]"
                >
                    <div className="modal-label flex items-center gap-[10px] ">Détails 
                        {currentSetting?.refuseId && <div className="organisation-details-title">
                            <div className={`flex items-center gap-2 request-date request-date-cancelled cursor-pointer`}
                            onClick={() => toggleCancelledModal()}
                            >
                                <span> Cancelled on {moment(currentSetting?.updatedAt).format('Do MMMM YYYY')} </span>
                                <Arrow className="inline ml-1 cancelled-svg" height={12} width={12} />
                            </div>
                        </div>}
                    </div>

                    <div className="overflow-hidden " >
                        <div
                            className="w-full flex justify-between otherWidth:justify-start flex-wrap gap-x-[60px] gap-y-6 px-0 bigTablet:px-[2px]">
                            <div className="w-full">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Title</div>
                                <div
                                className='custom-input-group-value custom-input-group-value-no-big w-full'
                                >
                                    {currentSetting?.title}
                                </div>
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px]">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Brand </span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.brand?.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                            <div className="custom-input-group">
                                <div className="custom-input-group-label">Modèle</div>
                                    <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.model}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Weight</div>
                                <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.weight}
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Catégorie </span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.category?.label}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                            <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Sous catégorie</span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.category2?.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Sous catégorie 2</span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.category3?.label}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Couleur</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="w-4 shadow-lg h-4 rounded-full"
                                            style={{
                                                backgroundColor: `${currentSetting?.color?.code}`
                                            }}
                                            />
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.color?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                            <div className="custom-input-group">
                                <div className="custom-input-group-label">Prix </div>
                                <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.cost}
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Promo ?</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.isPromoted ? 'Oui': 'Non'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            {currentSetting?.isPromoted && <>
                                <div className="w-full itemWidth:w-[29.22%]">
                                <div className="w-full" >
                                    <div className="relative custom-select w-full h-[72px] ">
                                        <div className="flex flex-col">
                                        <span className="custom-select-label">Promotion type</span>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <span
                                                className="custom-select-placeholder capitalize">{currentSetting?.promoType}</span>
                                        </div>
                                    </div>
                                </div>
                                    
                                </div>

                                <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Date début</div>
                                    <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {moment(dateToLocalString(currentSetting.promostartDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                                    </div>
                                        
                                    </div>
                                </div>

                                <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Date fin</div>
                                        <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {moment(dateToLocalString(currentSetting.promoendDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                                    </div>
                                        
                                    </div>
                                </div>

                                {(currentSetting?.promoType && currentSetting?.promoType !== "bonus") && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Prix promo</div>
                                        <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.promoCost}
                                    </div>
                                        
                                    </div>
                                </div>}

                                {currentSetting?.promoType && currentSetting?.promoType === "bonus" && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Nombre achété</div>
                                    <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.boughtNumber}
                                    </div>
                                        
                                    </div>
                                </div>}

                                {currentSetting?.promoType && currentSetting?.promoType === "bonus" && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Nombre offert</div>
                                        <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    >
                                        {currentSetting?.bonusNumber}
                                    </div>
                                        
                                    </div>
                                </div>}
                            </>}
                            

                        </div>

                        <div className="w-full grid-cols-1 grid bigTablet:grid-cols-2 otherWidth:grid-cols-3 gap-5 mt-5 mb-10">
                            {currentSetting?.images && currentSetting?.images?.map((image: any, index: number) => (
                                <CarImage
                                    key={index}
                                    image={image}
                                    index={index}
                                    mainImage={currentSetting.mainImage}
                                />
                            ))}
                        </div>

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Description brève</div>
                            <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    dangerouslySetInnerHTML={{__html: currentSetting.smallDescription}}
                            />
                        </div>

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Caractéristiques principales</div>
                            <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    dangerouslySetInnerHTML={{__html: currentSetting.principalFeatures}}
                            />
                        </div>

                        

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Description élargie</div>
                            <div
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    dangerouslySetInnerHTML={{__html: currentSetting.fullDescription}}
                            />
                            
                        </div>

                        <div className="custom-input-group">
                            
                            <div className="flex items-center gap-x-4 mb-3">
                                <div className="custom-input-group-label">Variantes</div>
                            </div>
                             <table style={{width: '100%'}}>
                                <thead>
                                    <th style={{width: '15%'}} className='text-left'> Variable</th>
                                    <th style={{width: '35%'}} className='text-left'> SKU</th>
                                    <th style={{width: '20%'}} className='text-left'>Quantité</th>
                                    <th style={{width: '15%'}} className='text-left'>Variable activée</th>
                                </thead>

                                <tbody>
                                    {currentSetting?.variables.map((variable: Variable, key: number) => {
                                    return <tr key={key}>
                                        
                                        <td>
                                        {variable.label ? <div className="custom-input-group ">
                                        <div
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        > {variable.label} </div>
                                        </div>: <span> --- </span>}
                                        </td>
                                        <td>
                                            <div className='bold underline pl-2'>{variable.sku}</div>
                                            
                                        </td>
                                        <td className=' pr-2'>
                                        <div className="custom-input-group">
                                        <div
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        > {variable.quantity} </div>
                                        
                                        </div>
                                        
                                        </td>
                                        
                                        <td>
                                        <div className="w-full" >
                                            <div className="relative custom-select w-full h-[72px] ">
                                                <div className="flex flex-col">
                                                <span className="custom-select-label">Variante active</span>
                                                </div>
                                                <div className="flex flex-row justify-between items-center">
                                                    <span
                                                        className="custom-select-placeholder capitalize">{variable.isActivated ? 'Oui': 'Non'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    })
                                    
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="custom-input-check">
                                {`${currentSetting?.suspended ? 'Suspendu' : 'Pas suspendu'}`}
                        </div>

                        

                        <div className="flex justify-end w-full">
                            <div className="flex item-center space-x-3 actions-buttons">
                                <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                    onClick={() => {
                                        {
                                            toggleModal()
                                        }
                                    }}
                                >Cancel</div>
                                {currentSetting?.new && <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                onClick={() => {
                                    setCurrentSetting({...currentSetting, 
                                        suspended: false,
                                        new: false,
                                        updated: false,
                                        approved: true,
                                        cancelled: false,
                                        archived: false})
                                    confirmAlert({
                                        title: 'Confirm to validate',
                                        message: 'Are you sure to do this.',
                                        buttons: [
                                          {
                                            label: 'Yes',
                                            onClick: () =>  {
                                                !loading && upsertSetting()
                                            }
                                          },
                                          {
                                            label: 'No',
                                            onClick: () => {
                                            }
                                          }
                                        ]
                                      });
                                }}
                                >
                                    {loading ?
                                    <ScaleLoader width={3} height={20} color="white" />
                                    : 'Valider'}
                                    </div>}
                                {currentSetting?.new && <div className={`flex items-center justify-center actions-buttons-unvalid cursor-pointer`}
                                onClick={() => {
                                    setRefuseForm(true)
                                    if (reviewRef) {
                                        setTimeout(() => {
                                            reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
                                        }, 500);
                                    }
                                }}
                                >Réfuser</div>}
                            </div>
                        </div>
                    </div>

                    {showRefuseForm && <>
                    
                        <div className="modal-label mt-8">Refuse the product</div>
                        <div className="overflow-hidden " >
                            <div className="custom-input-group">
                                <div className="custom-input-group-label mb-3">Reason</div>
                                <table>
                                    <tr>
                                    <td>
                                        <input type='checkbox' 
                                        checked={refuseData.reason.includes('wrong-content')}
                                        onChange={() => {
                                        if(refuseData.reason.includes('wrong-content')) {
                                            const remaindReason = refuseData.reason.filter((r: string) => r !== 'wrong-content')
                                            setRefuseData({...refuseData, reason: remaindReason})
                                        }else {
                                            setRefuseData({...refuseData, reason: [...refuseData.reason, 'wrong-content']})
                                        }
                                        }}
                                        />
                                    </td>
                                    <td>
                                        Mauvais contenu
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <input type='checkbox' 
                                        checked={refuseData.reason.includes('pornographic-images')}
                                        onChange={() => {
                                        if(refuseData.reason.includes('pornographic-images')) {
                                            const remaindReason = refuseData.reason.filter((r: string) => r !== 'pornographic-images')
                                            setRefuseData({...refuseData, reason: remaindReason})
                                        }else {
                                            setRefuseData({...refuseData, reason: [...refuseData.reason, 'pornographic-images']})
                                        }
                                        }}
                                        />
                                    </td>
                                    <td>
                                    Images pornographiques
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <input type='checkbox' 
                                        checked={refuseData.reason.includes('poor-quality-images')}
                                        onChange={() => {
                                        if(refuseData.reason.includes('poor-quality-images')) {
                                            const remaindReason = refuseData.reason.filter((r: string) => r !== 'poor-quality-images')
                                            setRefuseData({...refuseData, reason: remaindReason})
                                        }else {
                                            setRefuseData({...refuseData, reason: [...refuseData.reason, 'poor-quality-images']})
                                        }
                                        }}
                                        />
                                    </td>
                                    <td>
                                    Mauvaise qualité d'image
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <input type='checkbox' 
                                        checked={refuseData.reason.includes('misspellings')}
                                        onChange={() => {
                                        if(refuseData.reason.includes('misspellings')) {
                                            const remaindReason = refuseData.reason.filter((r: string) => r !== 'misspellings')
                                            setRefuseData({...refuseData, reason: remaindReason})
                                        }else {
                                            setRefuseData({...refuseData, reason: [...refuseData.reason, 'misspellings']})
                                        }
                                        }}
                                        />
                                    </td>
                                    <td>
                                    Graves fautes d'orthographe
                                    </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="custom-input-group">
                                <div className="custom-input-group-label mb-3">Notes</div>
                                <ReactQuill
                                    ref={quillRef}
                                    modules={modules}
                                    formats={formats}
                                    onChange={noteChange} 
                                    value = {refuseData?.notes}
                                />  
                            </div>

                            <div className="flex justify-end w-full" ref={reviewRef}>
                            <div className="flex item-center space-x-3 actions-buttons">
                                <div className="flex items-center justify-center actions-buttons-cancel cursor-pointer"
                                    onClick={() => {
                                        if (topViewRef) {
                                            setTimeout(() => {
                                                topViewRef?.current?.scrollIntoView({ behavior: "smooth" })
                                            }, 500);
                                        }

                                        setTimeout(() => {
                                        setRefuseForm(false)
                                        }, 1000);
                                    }}
                                >Cancel</div>
                                <div className={`flex items-center justify-center actions-buttons-submit cursor-pointer`}
                                    style={(
                                        !refuseData?.reason?.length ||
                                        !refuseData?.notes
                                        ) ? {
                                        backgroundColor: "#bdbdbd",
                                        cursor: "not-allowed"
                                    } : {}}
                                    onClick={() => {
                                        !upsertMutation.isLoading && upsertRefuse()
                                    }}
                                >{upsertMutation.isLoading ?
                                    <ScaleLoader width={3} height={20} color="white" />
                                    : 'Save'}
                                </div>
                            </div>
                        </div>
                        </div>
                    </>}
                </div>
            </div>

        </CustomModal>
        <CustomModal
        open={cancelledOpened}
        toggle={toggleCancelledModal}
        className="organisation-modal  overflow-y-auto no-scrollbar"
        >

        <div className="px-12 py-7 organisation-cancellation-form">
            <div className="w-full flex items-center justify-between">
            <div className="cancellation-header">Cancellation note</div>
            <CloseCaret className="cancellation-svg w-4 h-auto" onClick={toggleCancelledModal} />
            </div>

            {currentSetting?.refuse?.reason?.map((reason: string, index: number) => {
                return <p key={index} >{reason}</p>
            })

            }

            <p dangerouslySetInnerHTML={{__html: currentSetting?.refuse?.notes}} />

            <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-12 bg-center bg-cover bg-no-repeat rounded-full bg-gray"
            style={{backgroundImage: `url(${API_FILE_URL}/icons/${currentSetting?.refuse?.createdUser?.image ? currentSetting?.refuse?.createdUser?.image.path: ''})`}}
            ></div>
            <div className="flex flex-col"> 
                <div className="cancelled-by">{currentSetting?.refuse?.createdUser?.fullName}</div>
                <div className="cancellation-owner">{currentSetting?.refuse?.createdUser?.email}</div>
            </div>
            </div>
        </div>

        

        </CustomModal>
        </>
    )
}

export default AddSetting