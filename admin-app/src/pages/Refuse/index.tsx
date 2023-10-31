"use client"
import { Suspense, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBackButton, setTitle } from '../../redux/features/headerSlice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { confirmAlert } from 'react-confirm-alert';
//import ActionComponent from "../../global-components/ActionComponent";
import { notifyError, notifySuccess } from "../../global-components/CustomAlert";
import Loader from './Components/UpsertComponent';
import CustomButton from '../../global-components/CustomButton';
import TablePagination from '../../global-components/TablePagination';
import FilterSelect from '../../global-components/FilterSelect';
import ActionComponent from '../../global-components/ActionComponent';
import AddSetting from './Components/UpsertComponent/AddSetting';
import useRefuse from '../../hooks/useRefuse'
import { Pagination } from '../../sdks/GlobalDataSchemas'
import { API_FILE_URL, calcReadingDuration, formatDuration } from '../../utilities/constants'
import { Refuse, PaginationOptionRefuse } from '../../sdks/refuse-v1/utils/DataSchemas'
import { RootState } from '../../redux/store'
import SearchInput from '../../global-components/SearchInput'
import { AuthContext } from '../../context/auth'
import { File } from '../../sdks/image-v1/utils/DataSchemas'
import { Link } from 'react-router-dom'
import { LinksEnum } from '../../utilities/pagesLinksEnum'
import ViewComponent from '../../global-components/ViewComponent'

const DEBOUNCE_DELAY = 300;
let timer: any = null

export interface OptionInterface {
    label: string
    value: string
}

const defaultSetting: any = {
    categoryId : "",
    category2Id : "",
    category3Id : "",
    sellerId : "",
    brandId : "",
    model : "",
    weight : "",
    title : "",
    cost : 0,
    mainImage: "",
    promoCost : 0,
    boughtNumber : 0,
    bonusNumber : 0,
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
    new : false,
    updated : false,
    approved : false,
    cancelled : false,
    archived : false
}

const settingOptions: Array<OptionInterface> = [
    { label: "Tous", value: "" },
    { label: "Validé", value: "validated-true" },
    { label: "Non validé", value: "validated-false" }
]

export default function RefusePage() {

    const dispatch = useDispatch()
    const { sessionInfo } = useContext(AuthContext)

    const { client } = useRefuse()

    const queryClient = useQueryClient()
    dispatch(setTitle('Refuses'))
    dispatch(setBackButton(false))

    const theme = useSelector((state: RootState) => state.theme.theme)
    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [currentSetting, setCurrentSetting] = useState<any>(defaultSetting)
    const [currentRefuse, setCurrentRefuse] = useState<any>(null)
    const [selectedOption, setSelectedOption] = useState<any>(settingOptions[0])
    const [search, setSearch] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false);
    const [meta, setMeta] = useState<any> (null)

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const { data: settingData, isLoading, isFetching, isError }: any =
        useQuery({
            queryKey: ['refusesData', search, page, limit, selectedOption],
            queryFn: async () => {
                let filter: PaginationOptionRefuse = {page, limit}

                if(selectedOption?.value === 'validated-false') {
                    filter.validated = 'false'
                }
    
                if(selectedOption?.value === 'validated-true') {
                    filter.validated = 'true'
                }
    
                let result: Pagination<Refuse> = await client.getAllRefuses(filter)
                if(isSearching) {
                    setIsSearching(false);
                }

                setMeta({
                    hasNextPage : result?.hasNextPage,
                    hasPrevPage : result?.hasPrevPage,
                    limit : result?.limit,
                    nextPage : result?.nextPage,
                    page : result?.page,
                    pagingCounter : result?.pagingCounter,
                    prevPage : result?.prevPage,
                    totalDocs : result?.totalDocs,
                    totalPages : result?.totalPages
                })
                return result?.docs
            },
            keepPreviousData: true
        })

    const upsertMutation = useMutation({
        mutationFn: async () => {
            return currentRefuse &&
                (!!currentRefuse?._id ?
                    await client.updateRefuse(currentRefuse._id, {...currentRefuse, validated: !currentRefuse?.validated}) :
                    await client?.createRefuse({...currentRefuse, validated: !currentRefuse?.validated})
                )
        },
        onSuccess: () => {
            toggleModal()
            setCurrentRefuse(null)
            notifySuccess({ message: `${!!currentRefuse?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["refusesData"] }).catch(e => console.log(e))
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const upsertSetting = () => {
        !upsertMutation.isLoading && upsertMutation.mutate()
    }

   
    const handleChange = (text: string) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            setIsSearching(true);
            setSearch(text)
        }, 1000)
    }


    return (
        <div className="page-content flex justify-center car-settings-page">
            <div className="w-full max-width page-container">
                {
                    isLoading && !isSearching ? <Loader /> :
                        (
                            <>
                                <div className="flex flex-col justify-between pb-10 table-border">

                                    <div className="w-full">
                                        <div className="flex flex-col bigTablet:flex-row bigTablet:justify-between bigTablet:items-center mt-8 otherWidth:mt-10 mb-14 otherWidth:mx-6 gap-y-3 bigTablet:gap-y-0">
                                        <SearchInput width={400} handleChange={handleChange} />
                                            <FilterSelect
                                                classname='status-filter-2'
                                                selectedOption={selectedOption}
                                                setSelectedOption={(opt: OptionInterface) => {
                                                    setSelectedOption(opt)
                                                }}
                                                options={settingOptions}
                                            />
                                        </div>

                                        <div className="w-full otherWidth:pl-6 otherWidth:pr-6 overflow-auto mobile-scroll no-scrollbar">
                                            <table className='car-settings-table'>
                                                <thead>
                                                    <tr>
                                                    <th style={{ width: 100 }} className='text-left'>Image</th>
                                                        <th style={{ width: 550 }} className='text-left'>Titre</th>
                                                        <th style={{ width: 100 }} className='text-center'>Status</th>
                                                        <th className='text-center' style={{ width: 100 }}>Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                {isSearching && !isError && <tr>
                                                    <td colSpan={5}>
                                                        <div className="flex justify-center">
                                                            Loading...
                                                        </div>
                                                    </td>
                                                </tr>}
                                                {!isSearching && settingData?.length === 0 && <tr>
                                                    <td colSpan={5}>
                                                        <div className="flex justify-center">
                                                            No data found
                                                        </div>
                                                    </td>
                                                </tr>}
                                                    {!isSearching && settingData?.map((row: Refuse, key: number) => {
                                                        return <tr key={key}>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                {
                                                                    !row?.product?.images?.length ?
                                                                        <>
                                                                            {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                            <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                                        </>
                                                                        :
                                                                        <img src={`${API_FILE_URL}/products/${row?.product?.images?.filter((img: File) => img._id === row.product.mainImage)[0].path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                                        />
                                                                }
                                                            </td>
                                                            <td style={{ width: 450, height: 60 }}>
                                                                <div className='capitalize line-clamp-1' style={{ fontWeight: 600 }}>{row.product.title}</div>
                                                            </td>
                                                            
                                                            <td className='flex items-center justify-center' style={{ width: 100 , height: 89 }}>
                                                                <div className="search-filter-item flex items-center justify-center"
                                                                    style={{
                                                                        background: row?.validated ?
                                                                            (theme === 'light' ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), #E73A5D' : '#E73A5D') 
                                                                        : (theme === 'light' ? '#F5F6F7' : "#2C2440"),
                                                                        color: row?.validated ? (theme === 'light' ? '#E73A5D' : "#FFFFFF") : (theme === 'light' ? '#64748B' : "#BFCADA"),
                                                                        borderRadius: 8,
                                                                        border: theme === 'light' ? 'none' : "1px solid #3A3154",
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 700,
                                                                        fontSize: 12,
                                                                        textAlign: 'center',
                                                                        letterSpacing: -0.1,
                                                                        cursor: 'pointer',
                                                                        width: 84,
                                                                        height: 30
                                                                    }}
                                                                >{
                                                                    row.validated ? 'Approved' : 'Unapproved'
                                                                }</div>
                                                            </td>
                                                            
                                                            <td style={{ width: 100, height: 60 }}>
                                                                <div className='h-full flex justify-center items-center'>
                                                                    <ViewComponent
                                                                        onView={() => {
                                                                            setCurrentRefuse(row)
                                                                            setCurrentSetting(row?.product)
                                                                            toggleModal()
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        {isFetching && <div className='flex items-center justify-center'>Loading...</div>}
                                        {isError &&
                                            <div className='flex items-center justify-center'>An error occurred, please reload the
                                                page!</div>}
                                    </div>
                                    {meta &&
                                        <TablePagination
                                            data={meta}
                                            limit={limit}
                                            setLimit={setLimit}
                                            currentPage={page}
                                            setCurrentPage={setPage}
                                        />}

                                </div>
                            </>
                        )
                }
            </div>
            <Suspense fallback={<div>...</div>}>
                {modalOpened &&
                    <AddSetting settingTitle={'Refuse'}
                        modalOpened={modalOpened}
                        toggleModal={toggleModal} upsertSetting={upsertSetting}
                        currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                        loading={upsertMutation.isLoading}
                        currentRefuse={currentRefuse}
                    />}
            </Suspense>
        </div>

    )
}
