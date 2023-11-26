/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
"use client"
import { useEffect, useMemo, useRef, useState } from 'react'
import { ScaleLoader } from "react-spinners";
import FileDropZone from "../../../../global-components/FileDropZone";
import { Blob } from "buffer";
import { CreateRequest, Variable } from '../../../../sdks/product-v1/utils/DataSchemas';
import useImage from '../../../../hooks/useImage';
import { API_FILE_URL, IMAGE_ACCEPT, dateToLocalString, randomChar } from "../../../../utilities/constants";
import CustomModal from '../../../../global-components/CustomModal';
import { useMutation, useQuery } from '@tanstack/react-query'
import { notifyError } from "../../../../global-components/CustomAlert";
import ReactQuill, {Quill} from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import BlotFormatter from 'quill-blot-formatter';
import { File } from '../../../../sdks/image-v1/utils/DataSchemas';
import CustomSelect2 from '../../../../global-components/CustomSelect/CustomSelect';
import {ReactComponent as Pencil } from '../../../../assets/icons/Pencil.svg'
import { confirmAlert } from 'react-confirm-alert';
import { PlusSquare, Trash2 } from 'react-feather';
import useBrand from '../../../../hooks/useBrand';
import useCategory from '../../../../hooks/useCategory';

import { Category1, Category2 } from '../../../../sdks/category-v1/utils/DataSchemas';
import { Pagination } from '../../../../sdks/GlobalDataSchemas';
import { Brand } from '../../../../sdks/brand-v1/utils/DataSchemas';
import moment from 'moment';
import { Color } from '../../../../sdks/color-v1/utils/DataSchemas';
import useColor from '../../../../hooks/useColor';

const Video = Quill.import('formats/video');
const Link = Quill.import('formats/link'); 
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
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
    categoryId : "",
    category2Id : "",
    category3Id : "",
    sellerId : "",
    brandId : "",
    model : "",
    weight : "",
    title : "",
    cost : 0,
    promoCost : 0,
    boughtNumber : 0,
    bonusNumber : 0,
    mainImage: "",
    promostartDate : null,
    promoType : "",
    promoendDate : null,
    isPromoted : false,
    colorId : "",
    variables : [],
    imageIds : [],
    smallDescription : "",
    fullDescription : "",
    principalFeatures : "",
    suspended : false,
    new : true,
    updated : false,
    approved : false,
    cancelled : false,
    archived : false
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


interface CarImageProps {
    image: any;
    index: number;
    mainImage: number;
    onMainImageChange: (id: string) => void;
    onDelete: (id: string) => void;
}

const CarImage = ({ image, index, mainImage, onMainImageChange, onDelete }: CarImageProps) => {
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [selected, setSelected] = useState(-1);
    const optionRef = useRef<HTMLDivElement>(null);

    const handleDelete = () => {
        onDelete(image._id);
    };

    const handleSelectMainImage = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onMainImageChange(image._id);
    };
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
            <div className="absolute top-4 right-5 flex space-x-1 car-image-edit">
                {!showEditOptions && (
                    <Pencil
                        className="h-4 w-auto cursor-pointer"
                        onClick={() => {
                            setSelected(index);
                            setShowEditOptions(!showEditOptions);
                        }}
                    />
                )}

                {showEditOptions && selected === index && (
                    <div
                        className="image-edit-options"
                        ref={optionRef}
                        onMouseLeave={() => {
                            setShowEditOptions(false);
                            setSelected(-1);
                        }}
                    >
                        <div
                            className="dropdown-menu-item cursor-pointer flex items-center justify-center"
                            onClick={(e) => handleDelete()}
                        >
                            Delete
                        </div>
                        <div
                            className="dropdown-menu-item cursor-pointer flex items-center justify-center"
                            onClick={(e) => handleSelectMainImage(e)}
                        >
                            Select as main picture
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function AddSetting({ modalOpened, toggleModal, upsertSetting, currentSetting, setCurrentSetting, loading, settingTitle}: AddSettingProps) {
    const quillRef: any = useRef();
    const { client: categoryClient} = useCategory()
    const { client: brandClient} = useBrand()
    const { client: colorClient} = useColor()
    const { client } = useImage()
    const [subCategories, setSubCategories] =  useState<Array<any>>([])
    const [sub2Categories, setSub2Categories] =  useState<Array<any>>([])
    const [imageLoading, setLoading] = useState(false)
    const [deleteImage, setDeleteImage] = useState("")

    const handleChange = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        setCurrentSetting({ ...currentSetting, [name]: value })
    }

    const removeImage = (data: any) => {
        setLoading(true)
        !deleteMutation.isLoading && deleteMutation.mutate(data)
    }

    const upsertMutation = useMutation({
        mutationFn: async (body: any) => {
            return await client?.createImage(body)
        },
        onSuccess: (response: any) => {
            let newImages = currentSetting?.images ? [...currentSetting?.images] : [];
            let newImagesIds = [...currentSetting?.imageIds];
            newImages.push(response)
            newImagesIds.push(response?._id)
            setCurrentSetting({ ...currentSetting, imageIds: newImagesIds, images: newImages, mainImage: newImages?.length === 1 ? response?._id: currentSetting?.mainImage})
            setLoading(false)
        },
        onError: (e: any) => {
            console.log('error', e)
            let error: string = "IMAGE_TOO_LARGE";
            error = e?.errors?.msg ?? error
            notifyError({ message: error })
            setLoading(false)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (body: any) => await client?.deleteFile(body?.folder, body?.path, body?.id),
        onSuccess: (response: any) => {
            let newImages = currentSetting?.images ? [...currentSetting?.images] : [];
            let newImagesIds = [...currentSetting?.imageIds];
            newImagesIds.splice(newImagesIds.indexOf(deleteImage), 1);
            newImages.filter((image: any) => image?._id !== deleteImage)
            setCurrentSetting({ ...currentSetting, imageIds: newImagesIds, images: newImages, mainImage: newImages?.length === 1 ? response?._id: currentSetting?.mainImage})
            setLoading(false)
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
            setLoading(false)
        }
    })

    const upsertFile = (image: Blob) => {
        setLoading(true)
        !upsertMutation.isLoading && upsertMutation.mutate({image, path: 'product' })
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

    const descriptionChange = (value: any) => {
        setCurrentSetting({
            ...currentSetting, fullDescription: value
        })
    }

    const featuresChange = (value: any) => {
        setCurrentSetting({
            ...currentSetting, principalFeatures: value
        })
    }

    const smallDescriptionChange = (value: any) => {

    setCurrentSetting({
        ...currentSetting, smallDescription: value
    })
    }

    const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }]
    ]
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

    const handleDropZone = (data: Array<any>) => {
        if (data[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(data[0]);
            reader.onload = async () => {
                upsertFile(data[0])
            };
        }
    }


    const handleInputChange = (e: any, key: number) => {
        const { name, value } = e.target;
        let list: any[] = [...currentSetting?.variables];
        list[key][name] = value;
        setCurrentSetting ({...currentSetting, variables: list});
        
      };

      const handleInputBlur= (e: any, key: number) => {
        const { name, value } = e.target;
        let list: any[] = [...currentSetting?.variables];
        if(name === 'label') {
          const valueArr = currentSetting?.variables.map(function(item: any){ return item.label });
          const isDuplicate = valueArr.some(function(item: any, idx: number){ 
              return valueArr.indexOf(item) !== idx 
          });
      
          if(isDuplicate && list[key][name]) {
            list[key][name] = '';
            setCurrentSetting ({...currentSetting, variables: list});
            notifyError({ message: 'SKU ou Variable duppliquée' })
              return;
          }
        }
    
      };

      const removeVariable = async (variableIndex: number) => {
        let list: any[] = [...currentSetting?.variables];
        list.splice(variableIndex, 1);
        setCurrentSetting ({...currentSetting, variables: list});
        
      }

      const ADDVariable = () => {
        const _newVariables: any[] = [...currentSetting?.variables, {
          sku: randomChar(15).toLocaleUpperCase(),
          label: '',
          quantity: 0,
          isActivated: true
        }]
        console.log('_newVariable', _newVariables)
        if(_newVariables.length && _newVariables.length > 1 ) {
            if(_newVariables[_newVariables?.length - 2]['label'])
                {
                    setCurrentSetting ({...currentSetting, variables: _newVariables});
                }
            else {
                notifyError({ message: 'La variable ne doit pas être vide' })
            }
        }else {
            setCurrentSetting ({...currentSetting, variables: _newVariables});
        }
        
      };

    const { data: categoryData, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['categoriesData'],
        queryFn: async () => {
            let returData: Array<any> = []
            let result: Pagination<Category1> = await categoryClient.getAllPublishedCategories({ page: 1, limit: 100})
            result?.docs?.forEach((category: Category1) => {
                returData.push({
                    name: category.label,
                    value: category._id,
                    subCategories: category.subCategories2
                })
            })
            return {categories: returData}
        },
        keepPreviousData: true
    })

    const { data: brandData, isLoading: isBrandLoading, isFetching: isBrandFetching, isError: isBrandError }: any =
    useQuery({
        queryKey: ['brandsData'],
        queryFn: async () => {
            let returData: Array<any> = []
            let result: Pagination<Brand> = await brandClient.getPublishedBrands({ page: 1, limit: 100})
            result?.docs?.forEach((brand: Brand) => {
                returData.push({
                    name: brand.label,
                    value: brand._id
                })
            })
            return returData.sort( (a: any, b: any) => a?.name?.toLowerCase() > b?.name?.toLowerCase() ? 1 : -1)
        },
        keepPreviousData: true
    })

    const { data: colorData, isLoading: isColorLoading, isFetching: isColorFetching, isError: isColorError }: any =
    useQuery({
        queryKey: ['colorsData'],
        queryFn: async () => {
            let returData: Array<any> = []
            let result: Pagination<Color> = await colorClient.getPublishedColors({ page: 1, limit: 100})
            result?.docs?.forEach((col: Color) => {
                returData.push({
                    name: col.name,
                    value: col._id
                })
            })
            return returData
        },
        keepPreviousData: true
    })

    const handleBrandSelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, brandId: selectedOption?.value })
    }

    const handleColorSelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, colorId: selectedOption?.value })
    }


    const handleCategorySelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, categoryId: selectedOption?.value, category2Id: "", category3Id: "",  })
        let returData: Array<any> = []
        selectedOption?.subCategories?.forEach((category: Category2) => {
            returData.push({
                name: category.label,
                value: category._id,
                subCategories: category.subCategories3
            })
        })
        setSubCategories(returData)
    }
    
    const handleSubCategorySelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, category2Id: selectedOption?.value })
        let returData: Array<any> = []
        selectedOption?.subCategories?.forEach((category: Category2) => {
            returData.push({
                name: category.label,
                value: category._id
            })
        })
        setSub2Categories(returData)
    }

    const handleSubCategory2SelectChange = (selectedOption: any) => {
        setCurrentSetting({ ...currentSetting, category3Id: selectedOption?.value })
    }

    const onChangeDate = (type: string, e:any) => {
        let dt = new Date(e.target.value).getTime();
        let current_timestamp = dt
        let seconds = 0
        if (type === 'start') {
            setCurrentSetting({ ...currentSetting, promostartDate: e.target.value });
        } else {
          if (currentSetting.promostartDate) {
            seconds = (current_timestamp - currentSetting.promostartDate)
            if (seconds < 0) {
              notifyError({message: 'Impossible de choisir une date arrière'})
            } else {
                setCurrentSetting({ ...currentSetting, promoendDate: e.target.value });
            }
          }
        }
   }

   useEffect(() => {
    if(currentSetting?._id && categoryData) {
        const the_category: Array<any>  = categoryData?.categories?.filter((cat: any) => cat.value === currentSetting?.categoryId)
        
        if(the_category.length) {
            let returData: Array<any> = []
            the_category[0]?.subCategories?.forEach((category: Category2) => {
                returData.push({
                    name: category.label,
                    value: category._id,
                    subCategories: category.subCategories3
                })
            })

            let returDataSub: Array<any> = []
            returData?.filter((sub: any) => sub?.value === currentSetting?.category2Id)[0]?.subCategories?.forEach((category: Category2) => {
                returDataSub.push({
                    name: category.label,
                    value: category._id
                })
            })
            setSubCategories(returData)
            setSub2Categories(returDataSub)
        }
    }
   }, [currentSetting?._id])

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

                    <div className="overflow-hidden " >
                        <div
                            className="w-full flex justify-between otherWidth:justify-start flex-wrap gap-x-[60px] gap-y-6 px-0 bigTablet:px-[2px]">
                            <div className="w-full">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Title <span style={{ color: "red" }}>*</span></div>
                                <input
                                    name='title'
                                    value={currentSetting?.title}
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    onChange={handleChange}
                                    placeholder={'Add title'}
                                    />
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                 <CustomSelect2 
                                value={currentSetting?.brandId}
                                classname='user-select-dropdown' width="100%" required={true} label={`Brand`}
                                    placeholder='Choose' options={brandData} onChange={handleBrandSelectChange}
                                />
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                            <div className="custom-input-group">
                                <div className="custom-input-group-label">Modèle</div>
                                <input
                                    name='model'
                                    value={currentSetting?.model}
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    onChange={handleChange}
                                    placeholder={'Add model'}
                                    />
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <div className="custom-input-group">
                                <div className="custom-input-group-label">Weight</div>
                                <input
                                    name='weight'
                                    value={currentSetting?.weight}
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    onChange={handleChange}
                                    placeholder={'Add weight'}
                                    />
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <CustomSelect2 
                                value={currentSetting?.categoryId}
                                classname='user-select-dropdown' width="100%" required={true} label={`Catégorie`}
                                    placeholder='Choose' options={categoryData?.categories} onChange={handleCategorySelectChange}
                                />
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <CustomSelect2 classname='user-select-dropdown' value={currentSetting?.category2Id} width="100%" required={true} label={`Sous catégorie`}
                                    placeholder='Choose' options={subCategories} onChange={handleSubCategorySelectChange}
                                />
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <CustomSelect2 classname='user-select-dropdown' value={currentSetting?.category3Id} width="100%" required={false} label={`Type de produit`}
                                    placeholder='Choose' options={sub2Categories} onChange={handleSubCategory2SelectChange}
                                />
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <CustomSelect2 classname='user-select-dropdown' value={currentSetting?.colorId} width="100%" required={true} label={`Couleur`}
                                    placeholder='Choose' options={colorData} onChange={handleColorSelectChange}
                                />
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                            <div className="custom-input-group">
                                <div className="custom-input-group-label">Prix <span style={{ color: "red" }}>*</span></div>
                                <input
                                    name='cost'
                                    value={currentSetting?.cost}
                                    className='custom-input-group-value custom-input-group-value-no-big w-full'
                                    onChange={handleChange}
                                    placeholder={'Add cost'}
                                    />
                                    
                                </div>
                            </div>

                            <div className="w-full itemWidth:w-[29.22%]">
                                <CustomSelect2 classname='user-select-dropdown' value={currentSetting?.isPromoted} width="100%" required={true} label={`Promo ?`}
                                    placeholder='Choose' options={[
                                        { value: true, name: 'Oui' },
                                        { value: false, name: 'Non' }
                                    ]} onChange={(selectedOption: any) => {
                                        setCurrentSetting({ ...currentSetting, 
                                            isPromoted: selectedOption?.value,
                                            promostartDate : selectedOption?.value ? (currentSetting?.promostartDate ?? new Date()) : null,
                                            promoCost : selectedOption?.value ? currentSetting?.promoCost : 0,
                                            boughtNumber: selectedOption?.value ? currentSetting?.boughtNumber : 0,
                                            bonusNumber: selectedOption?.value ? currentSetting?.bonusNumber : 0,
                                            promoType: selectedOption?.value ? currentSetting?.promoType : "",
                                            promoendDate : selectedOption?.value ? 
                                            (currentSetting?.promoendDate ?? new Date (new Date().setDate(new Date().getDate() + 7))) 
                                            : null
                                         })
                                    }}
                                />
                            </div>

                            {currentSetting?.isPromoted && <>
                                <div className="w-full itemWidth:w-[29.22%]">
                                    <CustomSelect2 classname='user-select-dropdown' value={currentSetting?.promoType} width="100%" required={true} label={`Promotion type`}
                                        placeholder='Choose' options={[
                                            { value: 'sold', name: 'Solde' },
                                            { value: 'discount', name: 'Rémise' },
                                            { value: 'bonus', name: 'Bonus' }
                                        ]} onChange={(selectedOption: any) => {
                                            setCurrentSetting({ ...currentSetting, 
                                                promoType: selectedOption?.value,
                                                promoCost: selectedOption?.value !== 'bonus' ? currentSetting?.promoCost : 0,
                                                boughtNumber: selectedOption?.value === 'bonus' ? currentSetting?.boughtNumber : 0,
                                                bonusNumber: selectedOption?.value === 'bonus' ? currentSetting?.bonusNumber : 0,
                                            })
                                        }}
                                    />
                                </div>

                                <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Date début<span style={{ color: "red" }}>*</span></div>
                                        <input
                                            name='start'
                                            type="datetime-local"
                                            value = {moment(dateToLocalString(currentSetting.promostartDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                                            onChange={e => onChangeDate('start', e)}
                                            placeholder={'Add start date'}
                                        />
                                        
                                    </div>
                                </div>

                                <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Date fin<span style={{ color: "red" }}>*</span></div>
                                        <input
                                            name='end'
                                            type="datetime-local"
                                            value = {moment(dateToLocalString(currentSetting.promoendDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                                            className='custom-input-group-value custom-input-group-value-no-big w-full'
                                            onChange={e => onChangeDate('end', e)}
                                            placeholder={'Add end date'}
                                        />
                                        
                                    </div>
                                </div>

                                {(currentSetting?.promoType && currentSetting?.promoType !== "bonus") && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Prix promo<span style={{ color: "red" }}>*</span></div>
                                        <input
                                        name='promoCost'
                                        value={currentSetting?.promoCost}
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        onChange={handleChange}
                                        placeholder={'Add promoCost'}
                                        />
                                        
                                    </div>
                                </div>}

                                {currentSetting?.promoType && currentSetting?.promoType === "bonus" && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Nombre achété<span style={{ color: "red" }}>*</span></div>
                                        <input
                                        name='boughtNumber'
                                        value={currentSetting?.boughtNumber}
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        onChange={handleChange}
                                        placeholder={'Add bought number'}
                                        />
                                        
                                    </div>
                                </div>}

                                {currentSetting?.promoType && currentSetting?.promoType === "bonus" && <div className="w-full itemWidth:w-[29.22%]">
                                    <div className="custom-input-group">
                                        <div className="custom-input-group-label">Nombre offert<span style={{ color: "red" }}>*</span></div>
                                        <input
                                        name='bonusNumber'
                                        value={currentSetting?.bonusNumber}
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        onChange={handleChange}
                                        placeholder={'Add bonus number'}
                                        />
                                        
                                    </div>
                                </div>}
                            </>}
                            

                        </div>

                        <div className="w-full grid-cols-1 grid bigTablet:grid-cols-2 otherWidth:grid-cols-3 gap-5 mt-5 mb-10">
                            <FileDropZone
                                onChange={(data: Array<Blob>) => {
                                    handleDropZone(data)
                                }}
                                maxFiles={5}
                                accept={IMAGE_ACCEPT}
                                height={201}
                                width={"100%"}
                            />
                            {currentSetting?.images && currentSetting?.images?.map((image: any, index: number) => (
                                <CarImage
                                    key={index}
                                    image={image}
                                    index={index}
                                    mainImage={currentSetting.mainImage}
                                    onMainImageChange={(id: string) => {
                                        setCurrentSetting({...currentSetting, mainImage: id})
                                    }}
                                    onDelete={(id: string) =>{
                                        confirmAlert({
                                            title: 'Confirm to submit',
                                            message: 'Are you sure to do this.',
                                            buttons: [
                                              {
                                                label: 'Yes',
                                                onClick: () =>  {
                                                    setDeleteImage(id)
                                                    removeImage({folder: 'products', path: image?.path, id: id})}
                                              },
                                              {
                                                label: 'No',
                                                onClick: () => {
                                                }
                                              }
                                            ]
                                          });
                                    }}
                                />
                            ))}

                            {imageLoading && <div className="flex justify-center my-10">
                                <ScaleLoader width={3} height={20} color="#F4A607" />
                            </div>}
                        </div>

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Description brève</div>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                defaultValue={currentSetting?.smallDescription}
                                onChange={smallDescriptionChange} />  
                        </div>

                        

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Caractéristiques principales</div>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                onChange={featuresChange} 
                                value = {currentSetting?.principalFeatures}
                            />  
                        </div>

                        <div className="custom-input-group">
                            <div className="custom-input-group-label mb-3">Description élargie</div>
                            <ReactQuill
                                ref={quillRef}
                                modules={modulesDescription}
                                formats={formats}
                                onChange={descriptionChange} 
                                value = {currentSetting?.fullDescription}
                            />  
                        </div>

                        <div className="custom-input-group">
                            
                            <div className="flex items-center gap-x-4 mb-3">
                                <div className="custom-input-group-label">Variantes</div>
                                {currentSetting?.variables?.length === 0 && <span style={{padding: '0px 5px', cursor: 'pointer'}}>
                                <PlusSquare
                                size={18}
                                onClick={() => ADDVariable()}
                                color='#f4a607'
                                />
                                </span>}
                            </div>
                             <table style={{width: '100%'}}>
                                <thead>
                                    <th style={{width: '15%'}} className='text-left'> Variable</th>
                                    <th style={{width: '35%'}} className='text-left'> SKU</th>
                                    <th style={{width: '20%'}} className='text-left'>Quantité</th>
                                    <th style={{width: '15%'}} className='text-left'>Variable activée</th>
                                    {currentSetting?.variables?.length > 1 && <th style={{width: '5%'}}/>}
                                    <th style={{width: '5%'}}/>
                                </thead>

                                <tbody>
                                    {currentSetting?.variables.map((variable: Variable, key: number) => {
                                    return <tr key={key}>
                                        
                                        <td>
                                        <div className="custom-input-group ">
                                        <input
                                        name='label'
                                        id='label'
                                        value={variable.label}
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        onChange={(e) => handleInputChange(e, key)}
                                        onBlur={(e) => handleInputBlur(e, key)}
                                        placeholder={`${currentSetting?.variables?.length === 1 ? 'Facultatif': ''}`}
                                        />
                                        </div>
                                        </td>
                                        <td>
                                            <div className='bold underline pl-2'>{variable.sku}</div>
                                        </td>
                                        <td className=' pr-2'>
                                        <div className="custom-input-group">
                                        <input
                                        className='custom-input-group-value custom-input-group-value-no-big w-full'
                                        name='quantity'
                                        id='quantity'
                                        value={variable.quantity}
                                        onChange={(e) => {
                                            if(rx_live.test(e.target.value)) 
                                            handleInputChange(e, key)}
                                        }
                                        />
                                        </div>
                                        
                                        </td>
                                        
                                        <td>
                                        <CustomSelect2 classname='user-select-dropdown' value={variable.isActivated} width="100%" required={true} label={`Variante active *`}
                                            placeholder='Choose' options={[
                                                {
                                                    value: true, name: 'Oui'
                                                },
                                                {
                                                    value: false, name: 'Non'
                                                }
                                            ]} onChange={(e: any) => handleInputChange({target: {name:'isActivated', value: e.value}}, key)}
                                        />
                                        </td>
                                        
                                        {currentSetting?.variables?.length > 1 && <td>
                                        <div className='pl-2' style={{cursor: 'pointer'}}>
                                        <Trash2
                                        size={18}
                                        color='#e73a5d'
                                        onClick={() => {
                                            removeVariable(key)
                                        }}
                                        />
                                        </div>
                                        </td>}

                                         {key === (currentSetting?.variables?.length - 1) && <td>
                                        <div className='pl-2' style={{cursor: 'pointer'}}>
                                        <PlusSquare
                                        onClick={() => ADDVariable()}
                                        size={18}
                                        color='#64748B'
                                        />
                                        </div>
                                        </td>}
                                    </tr>
                                    })
                                    
                                    }
                                </tbody>
                            </table>
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
                                    style={(
                                        !currentSetting?.title?.trim() ||
                                        !currentSetting?.categoryId ||
                                        !currentSetting?.category2Id ||
                                        !currentSetting?.category3Id ||
                                        !currentSetting?.brandId ||
                                        !currentSetting?.cost ||
                                        !currentSetting?.mainImage||
                                        !currentSetting?.colorId ||
                                        !currentSetting?.variables?.length ||
                                        !currentSetting?.imageIds?.length ||
                                        !currentSetting?.smallDescription ||
                                        !currentSetting?.fullDescription
                                        ) ? {
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