"use client"

import { useContext, useRef, useState } from 'react'
import useOnClickOutSide from '../../utilities/onClickOutSide'
import { useDispatch } from 'react-redux';
import { setBackButton, setTitle } from '../../redux/features/headerSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { LinksEnum } from '../../utilities/pagesLinksEnum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from './Components/ContentLoader'
import FilterSelect2 from '../../global-components/FilterSelect';
import AsyncSelect from "react-select/async";
import { confirmAlert } from 'react-confirm-alert';

import { SingleValue } from "react-select";
import { Search, X } from 'react-feather'
import { notifyError, notifySuccess } from "../../global-components/CustomAlert";
import SearchInput from '../../global-components/SearchInput';
import TablePagination from '../../global-components/TablePagination';
import CustomButton from '../../global-components/CustomButton';
import FilterButton from '../../global-components/FilterButton';
import AddUserForm from './Components/AddUserForm';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/userUser';
import { Pagination } from '../../sdks/GlobalDataSchemas';
import { CreateRequest, FullUserProfile, PaginationOptionUser } from '../../sdks/user-v1/utils/DataSchemas';
import ActionComponent from '../../global-components/ActionComponent';
import { API_FILE_URL } from '../../utilities/constants';
const DEBOUNCE_DELAY = 300;
let timer: any = null

interface GroupFilterInterface {
    groupId?: number
    groupName: string
    label: string
}
const defaultSetting: any = {
    imageId:  null,
    role: "",
    gender: "",
    address: {
        city: "",
    },
    deleted: false,
    suspended: false,
    newsletterSubscribed: false
}
const masterGroupFilterData: Array<GroupFilterInterface> = [
    {
        groupId: undefined,
        groupName: '',
        label: 'All'
    },
    {
        groupId: 2,
        groupName: 'admin',
        label: 'Administrateurs'
    },
    {
        groupId: 1,
        groupName: 'client',
        label: 'Utilisateurs'
    }
]

interface OptionInterface {
    label: string
    value: string
}

const filterOptions: Array<OptionInterface> = [
    { label: "Tous", value: "" },
    { label: "Suspendus", value: "false" },
    { label: "Non suspendus", value: "true" }
]

export default function UsersPage() {
    const { sessionInfo } = useContext(AuthContext)
    const dispatch = useDispatch()
   
    const { client } = useUser()

    const queryClient = useQueryClient()


    dispatch(setTitle('Users'))
    dispatch(setBackButton(false))
    const theme = useSelector((state: RootState) => state.theme.theme)
    const [limit, setLimit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [currentGroupId, setCurrentGroupId] = useState<number | undefined>(undefined)
    const [currentGroupName, setCurrentGroupName] = useState<string | undefined>(undefined)
    const [isSearching, setIsSearching] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(filterOptions[0])
    const [currentSetting, setCurrentSetting] = useState<any>(defaultSetting)
    const [modalOpened, setModalOpen] = useState<boolean>(false)
    const [meta, setMeta] = useState<any> (null)

    const toggleModal = () => {
        setModalOpen(!modalOpened)
    }

    const { data: usersData, isLoading, isFetching, isError }: any = useQuery({
        queryFn: async () => {
            let filter: PaginationOptionUser = {page, limit}
            if(search) {
                filter.filter = search
                filter.fields = 'firstName,lastName,fullName,email'
            }
            if(selectedOption?.value) {
                filter.published_only = selectedOption?.value
            }
            if(currentGroupName) {
                filter.role = currentGroupName
            }
            let result: Pagination<FullUserProfile> = await client.getUsers(filter)
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
        queryKey: ['allUsers', search, page, limit, selectedOption, currentGroupName],
    })

    const handleChange = (text: string) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            setIsSearching(true);
            setSearch(text)
        }, 1000)
    }

    const upsertMutation = useMutation({
        mutationFn: async (data: CreateRequest) => {
            return currentSetting &&
                (!!currentSetting?._id ?
                    await client.updateUser(currentSetting._id, data) :
                    await client?.createUser(data)
                )
        },
        onSuccess: () => {
            toggleModal()
            setCurrentSetting(defaultSetting)
            notifySuccess({ message: `${!!currentSetting?._id ? "Updated" : "Saved"} successfully !` })
            queryClient.invalidateQueries({ queryKey: ["allUsers"] }).catch(e => console.log(e))
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
        mutationFn: async () => await client?.deleteUser(currentSetting?._id),
        onSuccess: () => {
            notifySuccess({ message: "Deleted successfully !" })
            queryClient.invalidateQueries({ queryKey: ["allUsers"] }).catch(e => console.log(e))
        },
        onError: (e: any) => {
            notifyError({ message: e?.message })
        }
    })

    const upsertSetting = (data: CreateRequest) => {
        !upsertMutation.isLoading && upsertMutation.mutate(data)
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

   
    let filterData: Array<GroupFilterInterface> = masterGroupFilterData

    return (
        <div className="page-content flex justify-center ">
            <div className="w-full max-width page-container">

                {isLoading && !isSearching ? <Loader /> :
                    <div className="flex flex-col justify-between pb-10 table-border">
                        <div className="user-page">
                            <div className="flex flex-col bigTablet:flex-row bigTablet:justify-between items-start pt-6 otherWidth:mx-6 gap-y-3 bigTablet:gap-y-0">
                                <div className="flex flex-col">
                                    <div className="search-filter flex items-center gap-2 flex-wrap">
                                        {
                                            filterData.map((item: GroupFilterInterface, index: number) => {
                                                return <FilterButton key={index}
                                                    classname={`big-text w-129 ${item.groupId === currentGroupId && "search-filter-item-selected"}`}
                                                    label={item.label}
                                                    onclick={() => {
                                                        setIsSearching(true)
                                                        setCurrentGroupId(item.groupId)
                                                        setCurrentGroupName(item.groupName)
                                                        setPage(1)
                                                    }}
                                                />
                                            })
                                        }
                                    </div>
                                </div>

                                {currentGroupName !== 'client' && <div className="hidden bigTablet:inline-flex">
                                    <CustomButton
                                        classname='custom-button-40 w-36'
                                        label={`Add Administrateur`}
                                        background={'#E73A5D'}
                                        color={'#FFFFFF'}
                                        onClick={toggleModal}
                                        //disabled={organisationInfos?.id === 1 && currentGroupName === types.USERGROUP.TEAM}
                                    />
                                </div>}
                            </div>

                            <div className="flex justify-between flex-wrap gap-3 spacex-5 items-center mt-3 bigTablet:mt-6 mb-3 bigTablet:mb-16 otherWidth:mx-6">
                                <SearchInput width={400} handleChange={handleChange} />
                                <div className="flex flex-col miniWith:flex-row items-center gap-6">
                                    <FilterSelect2
                                        classname='status-filter-2'
                                        selectedOption={selectedOption}
                                        setSelectedOption={(opt: OptionInterface) => {
                                            setSelectedOption(opt)
                                        }}
                                        options={filterOptions}
                                    />
                                </div>

                            </div>

                            {currentGroupName !== 'client' && <CustomButton
                                classname='bigTablet:hidden mb-16 custom-button-40 w-36'
                                label={`Add Administrateur`}
                                background={'#E73A5D'}
                                color={'#FFFFFF'}
                                onClick={toggleModal}
                            />}

                            <div className="w-full otherWidth:px-6 flex justify-center overflow-auto mobile-scroll no-scrollbar">
                                <table className='user-table'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 100 }} className='text-left'>Image</th>
                                            <th style={{ width: 150 }} className='text-left'>Name</th>
                                            {currentGroupName !== 'client' && <th style={{ width: 150 }} className='text-left'>Rôle</th>}
                                            <th style={{ width: 150 }} className='text-left'>Email</th>
                                            <th style={{ width: 150 }} className='text-left'>Phone number</th>
                                            {currentGroupName === 'client' && <th style={{ width: 150 }} className='text-left'>City</th>}
                                            <th style={{ width: 100 }} className='text-center'>Status</th>
                                            {currentGroupName === 'admin' && <th className='text-center' style={{ width: 100 }}>Actions</th>}
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
                                        {!isSearching && usersData?.length === 0 && <tr>
                                            <td colSpan={5}>
                                                <div className="flex justify-center">
                                                    No data found
                                                </div>
                                            </td>
                                        </tr>}
                                        {!isSearching && usersData?.map((row: FullUserProfile, key: number) => {
                                            return <tr key={key}>
                                                <td style={{ width: 100, height: 60 }}>
                                                    {
                                                        !row?.image?.path ?
                                                            <>
                                                                {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                            </>
                                                            :
                                                            <img src={`${API_FILE_URL}/icons/${row?.image?.path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                            />
                                                    }
                                                </td>
                                                <td>
                                                <p className='capitalize line-clamp-1' style={{ width: 150, fontWeight: 700 }}>
                                                            {row?.fullName}
                                                </p>
                                                </td>
                                                {currentGroupName !== 'client' && <td className='capitalize'>
                                                    <p className='capitalize line-clamp-1' style={{ width: 150 }}>
                                                        {row?.role}
                                                    </p>
                                                </td>}
                                                <td className='capitalize'>
                                                    <p className='capitalize line-clamp-1' style={{ width: 150 }}>
                                                        {row?.email}
                                                    </p>
                                                </td>
                                                
                                                <td>
                                                    <p className='line-clamp-1' style={{ width: 150 }}>
                                                        {row?.address?.phone}
                                                    </p>
                                                </td>

                                                {currentGroupName === 'client' && <td>
                                                    <p className='line-clamp-1' style={{ width: 150 }}>
                                                        {row?.address?.city}
                                                    </p>
                                                </td>}

                                                <td className='flex items-center justify-center' style={{ width: 100 , height: 89}}>
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
                                                {currentGroupName === 'admin' && <td style={{ width: 100, height: 60 }}>
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
                                                </td>}
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

                        <TablePagination
                            limit={limit}
                            setLimit={(limit) => { setIsSearching(true); setLimit(limit) }}
                            currentPage={page}
                            setCurrentPage={(page) => { setIsSearching(true); setPage(page) }}
                            data={meta}
                        />
                        {modalOpened &&
                            <AddUserForm modalOpened={modalOpened}
                                toggleModal={toggleModal}
                                groupName={currentGroupName === 'ADMIN' ? 'ADMIN' : 'USER'}
                                upsertSetting={upsertSetting}
                                currentSetting={currentSetting} setCurrentSetting={setCurrentSetting}
                                loading={upsertMutation.isLoading}
                            />}
                    </div>}
            </div>

        </div>
    )
}
