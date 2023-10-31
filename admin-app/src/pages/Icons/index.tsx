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
import CustomButton from '../../global-components/CustomButton';
import TablePagination from '../../global-components/TablePagination';
import FilterSelect from '../../global-components/FilterSelect';
import ActionComponent from '../../global-components/ActionComponent';
import useIcon from '../../hooks/useIcon'
import { Pagination } from '../../sdks/GlobalDataSchemas'
import { Icon } from '../../sdks/icon-v1/utils/DataSchemas'
import { API_FILE_URL } from '../../utilities/constants'
import Loader from './Components/UpsertComponent'
import AddSetting from './Components/UpsertComponent/AddSetting'



export interface OptionInterface {
    label: string
    value: string
}



export default function IconePage() {

    const dispatch = useDispatch()


    let optionsRef: any = useRef();
    const { client } = useIcon()

    const queryClient = useQueryClient()
    dispatch(setTitle('Icônes'))
    dispatch(setBackButton(false))

    const [filterOptionsOpen, setFilterOptionOpen] = useState<boolean>(false)
    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [currentSetting, setCurrentSetting] = useState<any>(null)
    const [meta, setMeta] = useState<any> (null)

    useOnClickOutSide(optionsRef, () => setFilterOptionOpen(false))

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const { data: settingData, isLoading, isFetching, isError }: any =
        useQuery({
            queryKey: ['iconsData',  page, limit],
            queryFn: async () => {
                let result: Pagination<Icon> = await client.getAllIcones({ page, limit })
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
        mutationFn: async (image: Blob) => {
            return await client.createIcon({icon: image})
        },
        onSuccess: () => {
            toggleModal()
            notifySuccess({ message: `${!!currentSetting?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["iconsData"] }).catch(e => console.log(e))
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async () => await client?.deleteIcon(currentSetting?.path, currentSetting?._id),
        onSuccess: () => {
            notifySuccess({ message: "Deleted successfully !" })
            queryClient.invalidateQueries({ queryKey: ["iconsData"] }).catch(e => console.log(e))
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

    return (
        <div className="page-content flex justify-center car-settings-page">
            <div className="w-full max-width page-container">
                {
                    isLoading ? <Loader /> :
                        (
                            <>
                                <div className="flex flex-col justify-between pb-10 table-border">

                                    <div className="w-full">
                                        <div className="flex flex-col bigTablet:flex-row bigTablet:justify-between bigTablet:items-center mt-8 otherWidth:mt-10 mb-14 otherWidth:mx-6 gap-y-3 bigTablet:gap-y-0">
                                            <div/>

                                            <div className="hidden bigTablet:inline-flex">
                                                <CustomButton
                                                    classname='custom-button-40-font-16-600 font-poppins font-16-60'
                                                    label={`Add icon`}
                                                    background={'#E73A5D'}
                                                    color={'#FFFFFF'}
                                                    onClick={() => {
                                                        toggleModal()
                                                    }}
                                                />
                                            </div>

                                            <CustomButton
                                                classname='bigTablet:hidden custom-button-40-font-16-600 font-poppins font-16-60'
                                                label={`Add icon`}
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
                                                        <th style={{ width: 650 }} className='text-left'>Image</th>
                                                        <th className='text-center' style={{ width: 100 }}>Actions</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                {settingData?.length === 0 && <tr>
                                                    <td colSpan={5}>
                                                        <div className="flex justify-center">
                                                            No data found
                                                        </div>
                                                    </td>
                                                </tr>}
                                                    {settingData?.map((row: any, key: number) => {
                                                        return <tr key={key}>
                                                            <td style={{ width: 650, height: 60 }}>
                                                                {
                                                                    !row?.path ?
                                                                        <>
                                                                            {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                            <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                                        </>
                                                                        :
                                                                        <img src={`${API_FILE_URL}/icons/${row?.path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                                        />
                                                                }
                                                            </td>
                                                            
                                                            <td style={{ width: 100, height: 60 }}>
                                                                <div className='h-full flex justify-center items-center'>
                                                                    <ActionComponent
                                                                        onEdit={() => {}}
                                                                        hideEdit
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
                    <AddSetting settingTitle={'Icone'}
                        modalOpened={modalOpened}
                        toggleModal={toggleModal} upsertSetting={upsertSetting}
                        currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                        loading={upsertMutation.isLoading}
                    />}
            </Suspense>
        </div>

    )
}
