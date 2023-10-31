"use client"
import { Suspense, useState } from 'react'
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
import useBlog from '../../hooks/useBlog'
import { Pagination } from '../../sdks/GlobalDataSchemas'
import { API_FILE_URL, calcReadingDuration, formatDuration } from '../../utilities/constants'
import { Blog, PaginationOptionBlog } from '../../sdks/blog-v1/utils/DataSchemas'
import { RootState } from '../../redux/store'
import SearchInput from '../../global-components/SearchInput'

const DEBOUNCE_DELAY = 300;
let timer: any = null

export interface OptionInterface {
    label: string
    value: string
}

const defaultSetting: any = {
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

const settingOptions: Array<OptionInterface> = [
    { label: "Tous", value: "" },
    { label: "Suspendus", value: "false" },
    { label: "Non suspendus", value: "true" }
]

export default function BlogPage() {

    const dispatch = useDispatch()


    const { client } = useBlog()

    const queryClient = useQueryClient()
    dispatch(setTitle('Blogs'))
    dispatch(setBackButton(false))

    const theme = useSelector((state: RootState) => state.theme.theme)
    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [currentSetting, setCurrentSetting] = useState<any>(defaultSetting)
    const [selectedOption, setSelectedOption] = useState<any>(settingOptions[0])
    const [search, setSearch] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false);
    const [meta, setMeta] = useState<any> (null)

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const { data: settingData, isLoading, isFetching, isError }: any =
        useQuery({
            queryKey: ['blogsData', search, page, limit, selectedOption],
            queryFn: async () => {
                let filter: PaginationOptionBlog = {page, limit}
                if(search) {
                    filter.filter = search
                    filter.fields = 'title,description'
                }
                if(selectedOption?.value) {
                    filter.published_only = selectedOption?.value
                }
                let result: Pagination<Blog> = await client.getAllblogs(filter)
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
                    await client.updateblog(currentSetting._id, currentSetting) :
                    await client?.createblog(currentSetting)
                )
        },
        onSuccess: () => {
            toggleModal()
            setCurrentSetting(defaultSetting)
            notifySuccess({ message: `${!!currentSetting?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["blogsData"] }).catch(e => console.log(e))
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
        mutationFn: async () => await client?.deleteblog(currentSetting?._id),
        onSuccess: () => {
            notifySuccess({ message: "Deleted successfully !" })
            queryClient.invalidateQueries({ queryKey: ["blogsData"] }).catch(e => console.log(e))
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
                                                    label={`Add blog`}
                                                    background={'#E73A5D'}
                                                    color={'#FFFFFF'}
                                                    onClick={() => {
                                                        toggleModal()
                                                    }}
                                                />
                                            </div>

                                            <CustomButton
                                                classname='bigTablet:hidden custom-button-40-font-16-600 font-poppins font-16-60'
                                                label={`Add blog`}
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
                                                        <th style={{ width: 300 }} className='text-left'>Titre</th>
                                                        <th style={{ width: 50 }} className='text-left'>Type</th>
                                                        <th style={{ width: 100 }} className='text-left'>Duration</th>
                                                        <th style={{ width: 50 }} className='text-left'>Vues</th>
                                                        <th style={{ width: 50 }} className='text-left'>Likes</th>
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
                                                    {!isSearching && settingData?.map((row: Blog, key: number) => {
                                                        return <tr key={key}>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                {
                                                                    !row?.image?.path ?
                                                                        <>
                                                                            {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                            <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                                        </>
                                                                        :
                                                                        <img src={`${API_FILE_URL}/blogs/${row?.image?.path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                                        />
                                                                }
                                                            </td>
                                                            <td style={{ width: 450, height: 60 }}>
                                                                <div className='capitalize line-clamp-1' style={{ fontWeight: 600 }}>{row.title}</div>
                                                            </td>
                                                            <td style={{ width: 50, height: 60 }}>
                                                                {row?.isVideo ? 'Vidéo': 'Article'}
                                                            </td>
                                                            <td style={{ width: 100, height: 60 }}>
                                                            {row?.isVideo ? <>{formatDuration(Number(row?.videoDuration) + Number(row?.readDuration)*60)} min</>: <>{calcReadingDuration(row?.description)} min</>}
                                                            </td>
                                                            <td style={{ width: 50, height: 60 }}>
                                                                {row?.viewsCount}
                                                            </td>
                                                            <td style={{ width: 50, height: 60 }}>
                                                                {row?.likes?.length}
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
                    <AddSetting settingTitle={'Blog'}
                        modalOpened={modalOpened}
                        toggleModal={toggleModal} upsertSetting={upsertSetting}
                        currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                        loading={upsertMutation.isLoading}
                    />}
            </Suspense>
        </div>

    )
}
