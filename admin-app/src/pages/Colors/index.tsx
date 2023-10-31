"use client"
import React, { Suspense, useRef, useState } from 'react'
import useOnClickOutSide from '../../utilities/onClickOutSide'
import { useDispatch } from 'react-redux'
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
import useColor from '../../hooks/useColor'
import { Pagination } from '../../sdks/GlobalDataSchemas'
import { API_FILE_URL } from '../../utilities/constants'
import { Color, CreateRequest } from '../../sdks/color-v1/utils/DataSchemas'
import SearchInput from '../../global-components/SearchInput'

const DEBOUNCE_DELAY = 300;
let timer: any = null

export interface OptionInterface {
    label: string
    value: string
}

const defaultSetting: CreateRequest = {
    name: "",
    code: "",
}

export default function ColorPage() {

    const dispatch = useDispatch()


    const { client } = useColor()

    const queryClient = useQueryClient()
    dispatch(setTitle('Couleurs'))
    dispatch(setBackButton(false))

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
            queryKey: ['colorsData', search, page, limit],
            queryFn: async () => {
                let result: Pagination<Color> = await client.getAllColors({ page, limit, filter: search, fields: 'name,code' })
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
                    await client.updateColor(currentSetting._id, currentSetting) :
                    await client?.createColor(currentSetting)
                )
        },
        onSuccess: () => {
            toggleModal()
            setCurrentSetting(defaultSetting)
            notifySuccess({ message: `${!!currentSetting?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["colorsData"] }).catch(e => console.log(e))
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
        mutationFn: async () => await client?.deleteColor(currentSetting?._id),
        onSuccess: () => {
            notifySuccess({ message: "Deleted successfully !" })
            queryClient.invalidateQueries({ queryKey: ["colorsData"] }).catch(e => console.log(e))
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

                                            <div className="hidden bigTablet:inline-flex">
                                                <CustomButton
                                                    classname='custom-button-40-font-16-600 font-poppins font-16-60'
                                                    label={`Add color`}
                                                    background={'#E73A5D'}
                                                    color={'#FFFFFF'}
                                                    onClick={() => {
                                                        toggleModal()
                                                    }}
                                                />
                                            </div>

                                            <CustomButton
                                                classname='bigTablet:hidden custom-button-40-font-16-600 font-poppins font-16-60'
                                                label={`Add color`}
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
                                                        <th style={{ width: 100 }} className='text-left'>Color</th>
                                                        <th className='text-left w-[150px] otherWidth:w-[450px] '>Name</th>
                                                        <th style={{ width: 100 }} className='text-left'>Color name</th>
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
                                                    {!isSearching && settingData?.map((row: Color, key: number) => {
                                                        return <tr key={key}>
                                                            <td style={{ width: 100, height: 60 }}><div className='rounded-md' style={{ width: 80, height: 60, backgroundColor: row.code }} /></td>
                                                            <td style={{ height: 60 }} className=' w-[150px] otherWidth:w-[450px] '>
                                                                <div className='capitalize line-clamp-1' style={{ fontWeight: 600 }}>{row.name}</div>
                                                            </td>
                                                            <td style={{ width: 100, height: 60 }}>
                                                                <div className='capitalize line-clamp-1' >{row.code}</div>
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
                    <AddSetting settingTitle={'Couleur'}
                        modalOpened={modalOpened}
                        toggleModal={toggleModal} upsertSetting={upsertSetting}
                        currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                        loading={upsertMutation.isLoading}
                    />}
            </Suspense>
        </div>

    )
}
