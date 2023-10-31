"use client"
import React, { Suspense, useRef, useState } from 'react'
import useOnClickOutSide from '../../utilities/onClickOutSide'
import { useDispatch, useSelector } from 'react-redux'
import { setBackButton, setTitle } from '../../redux/features/headerSlice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { confirmAlert } from 'react-confirm-alert';
//import ActionComponent from "../../global-components/ActionComponent";
import { notifyError, notifySuccess } from "../../global-components/CustomAlert";
import { QueryClient } from "@tanstack/query-core";
import Loader from './Components/UpsertComponent';
import CustomButton from '../../global-components/CustomButton';
import TablePagination from '../../global-components/TablePagination';
import FilterSelect from '../../global-components/FilterSelect';
import ActionComponent from '../../global-components/ActionComponent';
import AddSetting from './Components/UpsertComponent/AddSetting';
import useBanner from '../../hooks/useBanner'
import { Pagination } from '../../sdks/GlobalDataSchemas'
import { API_FILE_URL } from '../../utilities/constants'
import { Banner, CreateRequest, PaginationOptionBanner } from '../../sdks/banner-v1/utils/DataSchemas'
import { RootState } from '../../redux/store'
import SearchInput from '../../global-components/SearchInput'
import moment from 'moment'

const DEBOUNCE_DELAY = 300;
let timer: any = null

export interface OptionInterface {
    label: string
    value: string
}

const defaultSetting: any = {
    link: "",
    suspended: false,
    imageId: null,
    startDate: new Date(),
    endDate: new Date (new Date().setDate(new Date().getDate() + 7))
}
const settingOptions: Array<OptionInterface> = [
    { label: "Tous", value: "" },
    { label: "Suspendus", value: "false" },
    { label: "Non suspendus", value: "true" }
]
export default function BannerPage() {

    const dispatch = useDispatch()


    const { client } = useBanner()

    const queryClient = useQueryClient()
    dispatch(setTitle('Bannières'))
    dispatch(setBackButton(false))
    const [selectedOption, setSelectedOption] = useState<any>(settingOptions[0])
    const theme = useSelector((state: RootState) => state.theme.theme)
    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [currentSetting, setCurrentSetting] = useState<any>(defaultSetting)
    const [search, setSearch] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false);
    const [meta, setMeta] = useState<any> (null)

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const { data: settingData, isLoading, isFetching, isError }: any =
        useQuery({
            queryKey: ['bannersData', search, page, limit, selectedOption],
            queryFn: async () => {
                let filter: PaginationOptionBanner = {page, limit}
                if(search) {
                    filter.filter = search
                    filter.fields = 'label'
                }
                if(selectedOption?.value) {
                    filter.published_only = selectedOption?.value
                }
                let result: Pagination<Banner> = await client.getAllBanners(filter)
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
            return currentSetting &&
                (!!currentSetting?._id ?
                    await client.updateBanner(currentSetting._id, currentSetting) :
                    await client?.createBanner(currentSetting)
                )
        },
        onSuccess: () => {
            toggleModal()
            setCurrentSetting(defaultSetting)
            notifySuccess({ message: `${!!currentSetting?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["bannersData"] }).catch(e => console.log(e))
        },
        onError: (e: any) => {
            let error: string = "An error occured, please retry";
            if(e?.errors?.msg?.includes('duplicate')) {
                error = "DUPLICATED_DATA"
            } else error = e?.errors?.msg
            notifyError({ message: error })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async () => await client?.deleteBanner(currentSetting?._id),
        onSuccess: () => {
            notifySuccess({ message: "Deleted successfully !" })
            queryClient.invalidateQueries({ queryKey: ["bannersData"] }).catch(e => console.log(e))
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
        }
    })

    const upsertSetting = (image?: any) => {
        !upsertMutation.isLoading && upsertMutation.mutate(image)
    }

    const deleteSetting = async () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => !deleteMutation.isLoading && deleteMutation.mutate()
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
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
                                            <div className="hidden bigTablet:inline-flex">
                                                <CustomButton
                                                    classname='custom-button-40-font-16-600 font-poppins font-16-60'
                                                    label={`Add banner`}
                                                    background={'#E73A5D'}
                                                    color={'#FFFFFF'}
                                                    onClick={() => {
                                                        toggleModal()
                                                    }}
                                                />
                                            </div>

                                            <CustomButton
                                                classname='bigTablet:hidden custom-button-40-font-16-600 font-poppins font-16-60'
                                                label={`Add banner`}
                                                background={'#E73A5D'}
                                                color={'#FFFFFF'}
                                                onClick={() => {
                                                    toggleModal()
                                                }}
                                            />
                                        </div>

                                        <div className="w-full otherWidth:pl-6 otherWidth:pr-6 overflow-auto mobile-scroll no-scrollbar">
                                            <table className='car-settings-table'>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 100 }} className='text-left'>Image</th>
                                                        <th style={{ width: 300 }} className='text-left'>Link</th>
                                                        <th style={{ width: 100 }} className='text-left'>Début</th>
                                                        <th style={{ width: 100 }} className='text-left'>Fin</th>
                                                        <th style={{ width: 50 }} className='text-left'>Cliques</th>
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
                                                    {!isSearching && settingData?.map((row: Banner, key: number) => {
                                                        return <tr key={key}>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                {
                                                                    !row?.image?.path ?
                                                                        <>
                                                                            {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                            <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                                        </>
                                                                        :
                                                                        <img src={`${API_FILE_URL}/banners/${row?.image?.path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                                        />
                                                                }
                                                            </td>
                                                            <td style={{ width: 500, height: 60 }}>
                                                                <a 
                                                                href={row.link}
                                                                target='_blank'
                                                                rel='noreferrer'
                                                                className='capitalize line-clamp-1' style={{ fontWeight: 600 }}>Ouvrir le lien</a>
                                                            </td>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                {moment(row?.startDate).format('DD MM YYYY - HH:mm:ss')}
                                                            </td>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                {moment(row?.endDate).format('DD MM YYYY - HH:mm:ss')}    
                                                            </td>
                                                            <td style={{ width: 50, height: 60 }}>
                                                                {row?.clicksNumber}
                                                            </td>
                                                            <td className='flex items-center justify-center' style={{ width: 100 , height: 89 }}>
                                                                <div className="search-filter-item flex items-center justify-center"
                                                                    style={{
                                                                        background: !row?.suspended ?
                                                                            (theme === 'light' ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), #E73A5D' : '#E73A5D') : (theme === 'light' ? '#F5F6F7' : "#2C2440"),
                                                                        color: !row?.suspended ? (theme === 'light' ? '#E73A5D' : "#FFFFFF") : (theme === 'light' ? '#64748B' : "#BFCADA"),
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
                                                                >{!row?.suspended ? 'Active' : 'Disabled'}</div>
                                                            </td>
                                                            
                                                            <td style={{ width: 100, height: 60 }}>
                                                                <div className='h-full flex justify-center items-center'>
                                                                    <ActionComponent
                                                                        onEdit={() => {
                                                                            setCurrentSetting(row)
                                                                            toggleModal()
                                                                        }}
                                                                        onDelete={async () => {
                                                                            setCurrentSetting(row)
                                                                            await deleteSetting()
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
                    <AddSetting settingTitle={'Bannière'}
                        modalOpened={modalOpened}
                        toggleModal={toggleModal} upsertSetting={upsertSetting}
                        currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                        loading={upsertMutation.isLoading}
                    />}
            </Suspense>
        </div>

    )
}
