import { useContext, useRef, useState } from "react";
import {useDispatch} from 'react-redux';
import {setBackButton, setTitle} from '../../../redux/features/headerSlice';
import {ReactComponent as Arrow} from '../../../assets/icons/Arrow.svg'
import {ReactComponent as CloseCaret} from '../../../assets/icons/Close.svg'
import StatsFeatureItem from "../Components/StatsFeatureItem";
import CustomModal from "../../../global-components/CustomModal";
import {ReactComponent as EmptyUserSettingPic} from "../../../assets/icons/EmptyUserSettingPic.svg";
import useOnClickOutSide from "../../../utilities/onClickOutSide";
import { Seller } from "../../../sdks/seller-v1/utils/DataSchemas";
import useSeller from "../../../hooks/useSeller";
import { useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_FILE_URL } from "../../../utilities/constants";
import moment from "moment";
import { notifyError, notifySuccess } from "../../../global-components/CustomAlert";
import { AuthContext } from "../../../context/auth";
interface ItemData {
  label: string
  value: string
  link?: string
}
interface DetailsItems {
  header: string
  data: ItemData[]
}
export default function SellerDetailsPage() {
  const { sessionInfo } = useContext(AuthContext)
    const queryClient: QueryClient = useQueryClient()
    const { client } = useSeller()
    const dispatch = useDispatch()
    dispatch(setTitle('Seller details'))
    dispatch(setBackButton(true))
    const [selectOptionsOpen, setSelectOptionOpen] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    
    const [seeMore, setSeeMore] = useState(false)
    const [pending, setPending] = useState(false)
    const [detailsSelected, setDetailsSelected] = useState(-1)
    const [isCustumizedWebsite, setCustumizedWebsite] = useState(false)
    const [note, setNote] = useState<string>("")

    const {id} = useParams()

    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [modalEditOpened, setModalEditOpen] = useState<boolean>(false)
    const [cancelledOpened, setCancelledModalOpen] = useState<boolean>(false)

    const toggleModal = () => {
      setModalOpen(!modalOpened)
    }

    const toggleModalEdit = () => {
      setModalEditOpen(!modalEditOpened)
    }

    const toggleCancelledModal = () => {
      setCancelledModalOpen(!cancelledOpened)
    }

    let optionsRef: any = useRef();
    useOnClickOutSide(optionsRef, () => setSelectOptionOpen(false))

    let ref: any = useRef();
    useOnClickOutSide(ref, () => setOpen(false))
    const statsFeatures = [
      {
        label: 'Products',
        icon: null,
        value: '16 000',
        percentage: null
      },
      {
        label: 'Orders',
        icon: null,
        value: '16 000',
        percentage: '+10%'
      },
      {
        label: 'Sales',
        icon: null,
        value: '05',
        percentage: '+10%'
      }
    ]

    const getSeller = async (): Promise<Seller | undefined> => {
      let response = id ? await client.getSellerById(id) : undefined
      return response
    }
  
  
    const { data: sellerData, isLoading, error } = useQuery({
      queryFn: getSeller,
      queryKey: ['sellerDetails', id],
    })
    function mapSellerToDetailsItems(data: Seller): DetailsItems[] {
        return [
          {
            header : 'Company Informations',
            data: [
              {
                label : 'Name',
                value: data?.companyInfo?.companyName
              },
              {
                label : 'Email',
                value: data?.email
              },
              {
                label : 'Commercial register',
                value: data?.companyInfo.commercialRegister
              },
              {
                label : 'Taxpayer account number',
                value: data?.companyInfo.taxpayerAccountNumber
              },
              {
                label : 'Contact',
                value: data?.personnalInfo?.number
              },
              {
                label : 'City',
                value: data?.locationInfo.cityName
              },
              {
                label : 'Postal code',
                value: data?.locationInfo.postalCode
              }
            ]
          },
          { 
            header : 'Bank Informations',
            data: [
              {
                label : 'RIB',
                value: data?.bankInfo.rib,
                link: `${API_FILE_URL}/${data.bankInfo.ribFile.path}`
              },
              {
                label : 'Bank name',
                value: data?.bankInfo.bankName
              },
              {
                label : 'Bank code',
                value: data?.bankInfo.bankCode
              },
              {
                label : 'IBAN',
                value: data?.bankInfo.iban
              },
              {
                label : 'Owner',
                value: data?.bankInfo.ownerFullName
              }
            ]
          },
          { 
            header : 'Management information',
            data: [
              {
                label : 'Manager full name',
                value: data?.personnalInfo?.fullName
              },
              {
                label : 'ID type',
                value: data?.personnalInfo?.identityCardType
              },
              {
                label : 'ID number',
                value: data?.personnalInfo?.identityCardNumber,
                link: `${API_FILE_URL}/${data.personnalInfo.identityCardFile.path}`
              }
            ]
          }
        ]
    }

    const validationMutation = useMutation({
      mutationFn: async (sellerId: string) => {
        return await client.verifySeller(sellerId)
      },
      onSuccess: (data: any) => {
        notifySuccess({ message: 'Celler validated successfully' })
        queryClient.invalidateQueries({ queryKey: ['sellerDetails', id] }).catch(e => console.log(e))
      },
      onError: (e: any) => {
        notifyError({ message: e?.message })
      }
    })
  
    function handleValidation(sellerId: string) {
      validationMutation.mutate(sellerId)
    }

    const rejectMutation = useMutation({
      mutationFn: async (sellerId: string) => {
        return await client.cancelSeller(sellerId, {
          cancellation: {
            note: note,
            cancelledBy: sessionInfo?.userInfo?.id
          }
        })
      },
      onSuccess: (data: any) => {
        toggleModal()
        notifySuccess({ message: 'Seller cancelled successfully' })
        queryClient.invalidateQueries({ queryKey: ['sellerDetails', id] }).catch(e => console.log(e))
      },
      onError: (e: any) => {
        notifyError({ message: e?.message })
      }
    })
  
    function handleReject(sellerId: string) {
      rejectMutation.mutate(sellerId)
    }

    const getStatusText = (organisation: Seller) => {
      const formattedDate = organisation?.updatedAt ? moment(organisation?.updatedAt).format('Do MMMM YYYY') : '';
      
        if (!organisation?.verified && !organisation?.deleted && !organisation?.suspended)
          return `Requested on ${organisation?.createdAt ? moment(organisation?.createdAt).format('Do MMMM YYYY') : ''}`
        else if (!organisation?.verified && organisation?.deleted && organisation?.suspended)
          return `Cancelled on ${formattedDate} `;
        else if (organisation?.verified)
          return `Approved on ${formattedDate} `;
        else return '';
    };
  
    const getStatusIcon = (organisation: Seller) => {
      if (!organisation?.verified && !organisation?.deleted && !organisation?.suspended)
      return null
      else if (!organisation?.verified && organisation?.deleted && organisation?.suspended)
        return <Arrow className="inline ml-1 cancelled-svg" height={12} width={12} />;
      else if (organisation?.verified)
        return <Arrow className="inline ml-1 approved-svg" height={12} width={12} />;
      else return null;
    };
  return <div className="page-content flex justify-center ">
  <div className="w-full max-width page-container">
    {/* Organisation status pending */}
    <div className="organisation-container mt-12">
      
      <div className="flex items-center w-full justify-between">
      {
          !sellerData?.personnalInfo?.image?.path ?
              <>
                  {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                  <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
              </>
              :
              <img src={`${API_FILE_URL}/icons/${sellerData?.personnalInfo?.image?.path}`}  className="w-[57px] h-auto overflow-hidden object-cover rounded-md" alt=""
              />
      }
      {/* {!open ? <div className="relative table-options mt-3"><div
          className="flex items-center justify-center cursor-pointer options"
          onClick={(e: any) => {
            e.stopPropagation();
            setOpen(!open)
          }}
          
      >
          <HorizontalDots className="w-auto h-2" />
      </div>
      
      </div>: <div ref={ref} className="relative options-tools flex justify-between item-end"
          onClick={(e) => {
              e.stopPropagation();
              setOpen(!open)
          }}
      >
          <div>
              <Pencil className="h-4 w-auto mr-3 cursor-pointer" onClick={(e: any) => {
              e.stopPropagation();
              setSelectOptionOpen(!selectOptionsOpen)
            }} />
          </div>
          <div>
              <Trash className="h-4 w-auto cursor-pointer" onClick={() => {}} />
          </div>
          {selectOptionsOpen && <div ref={optionsRef} className='select-dropdown select-dropdown-organisation ' style={{ width: 120 }}>
          <div className="dropdown-menu-item flex items-center" onClick={toggleModalEdit}>Edit information</div>
          <div className="dropdown-menu-item flex items-center" onClick={() => {}}>Delete</div>
          </div>}
      </div>} */}
      </div>

      <div className="flex items-center gap-[10px] organisation-details-title mt-5">
        <span>{sellerData?.companyInfo?.companyName}</span>
        <div className={`flex items-center gap-2 request-date ${(!sellerData?.verified && sellerData?.deleted && sellerData?.suspended) ? 'request-date-cancelled cursor-pointer' : ''}`}
          onClick={() => (!sellerData?.verified && sellerData?.deleted && sellerData?.suspended) && toggleCancelledModal()}
        >
          {(sellerData &&
            <span> {getStatusText(sellerData)} {getStatusIcon(sellerData)} </span>)}

        </div>
      </div>
      <div className="see-more-organisation-details flex items-center gap-1 mt-[10px] cursor-pointer"
      onClick={() => setSeeMore(!seeMore)}
      >
        {!seeMore && <span>See more information</span>}
        {seeMore && <span>Less information</span>}
        <Arrow className={`w-[6px] h-auto ${seeMore ? 'transform rotate-90': ''}`} />
      </div>

      {!seeMore && <div className="organisation-details-separator mt-2"></div>}
    </div>
    {sellerData?.verified && <div className="mt-16 mb-16 w-full flex flex-col itemWidth:flex-row itemWidth:items-center itemWidth:justify-between stats-features space-y-5 itemWidth:space-y-0 itemWidth:space-x-5">
      {
        statsFeatures.map((stats: any, index: number) => {
          return <StatsFeatureItem
          key={index}
          {...stats}
          />
        })
      }
      <div className="stats-feature-item stats-feature-item-2 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <EmptyUserSettingPic className="w-10 h-10 bg-center bg-cover bg-no-repeat rounded-full"/>
          <div className="flex flex-col"> 
            <div className="organisation-owner-name">{sellerData?.personnalInfo.fullName}</div>
            <div className="organisation-owner-role">{sellerData?.personnalInfo.number}</div>
          </div>
        </div>
        <div className="flex items-center justify-between see-more-organisation-details">
          <span> {sellerData?.email} </span>
        </div>
      </div>
    </div>}

    {seeMore && <div className="organisation-more-details w-full mt-6">
      {sellerData && mapSellerToDetailsItems(sellerData).map((details: any, key: number) => {
        return <div className="organisation-details-item w-full cursor-pointer" key={key}
        onClick={() => {
          if(detailsSelected !== key){
            setDetailsSelected(key)
          }else setDetailsSelected(-1)
        }}
        >
        <div className="organisation-details-item-header w-full flex items-center justify-between">
          <p>{details?.header}</p>
          <Arrow className={`w-2 h-auto ${detailsSelected === key ? 'transform rotate-90': ''}`} />
        </div>
        {detailsSelected === key && <div className="organisation-details-data mt-6 w-full mb-8">
        {
              details?.data?.map((data: any, index: number) => {
                return <div className="organisation-details-data-item flex items-center w-full" key={index}>
                <div className="w-1/2 label"> {data?.label} </div>
                {! data?.link && <div className={`w-1/2 value ${data?.link ? 'underline': ''}`}> {data?.value} </div>}
                {data?.link && <a href={data.link} target="_blank" rel="noreferrer" download={true} className={`w-1/2 value ${data?.link ? 'underline': ''}`}> {data?.value} </a>}
              </div>
              })
            }
        
        </div>}
      </div>
      })}
      
    </div>}
    {!isLoading && sellerData && sellerData?._id && (!sellerData?.verified && !sellerData?.deleted && !sellerData?.suspended) &&
        <div className="flex items-center gap-4 mt-8">
          <div className="approve-button flex justify-center items-center" onClick={() => {
            handleValidation(sellerData._id)
          }} >Approve</div>
          <div className="cancel-button flex justify-center items-center cursor-pointer"
            onClick={() => {
              toggleModal()
            }}
          >Reject</div>
        </div>
      }

   
  </div>
  <CustomModal
      open={modalOpened}
      toggle={toggleModal}
      className="organisation-modal  overflow-y-auto no-scrollbar"
    >

      <div className="px-12 py-7 organisation-cancellation-form">
        <div className="cancellation-header">Cancellation note</div>

        <p>Note</p>

        <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Lorem ipsum dolor sit amet consectetur. A interdum urna tellus enim massa neque convallis sapien. Nullam magna massa diam enim. Sem et suscipit pellentesque facilisis accumsan. Augue porttitor pharetra eget porta pellentesque."
        className="resize-none"
        />

        <div className="inline-flex w-full justify-end mt-10">
          <div className="validate cursor-pointer" 
          style={{
            pointerEvents: (sellerData?._id && note) ? 'initial': 'none',
            opacity: (sellerData?._id && note) ? 1 : .5,
          }}
          onClick={() => {
            if(sellerData)
            handleReject(sellerData._id)
          }}>
          Validate
          </div>
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

        <p>{sellerData?.cancellation.note}</p>

        <div className="flex items-center gap-3 mt-3">
          <div className="w-12 h-12 bg-center bg-cover bg-no-repeat rounded-full bg-gray"
          style={{backgroundImage: `url(${API_FILE_URL}/icons/${sellerData?.cancellation.cancelledOwner?.image ? sellerData?.cancellation.cancelledOwner?.image.path: ''})`}}
          ></div>
          <div className="flex flex-col"> 
            <div className="cancelled-by">{sellerData?.cancellation.cancelledOwner?.fullName}</div>
            <div className="cancellation-owner">{sellerData?.cancellation.cancelledOwner?.email}</div>
          </div>
        </div>
      </div>

      

    </CustomModal>
    
  </div>;
}
