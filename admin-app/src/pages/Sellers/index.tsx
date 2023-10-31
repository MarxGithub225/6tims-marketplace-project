"use client"

import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setBackButton, setTitle } from '../../redux/features/headerSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query'
import Loader from './Components/ContentLoader'
import FilterSelect2 from '../../global-components/FilterSelect';

import SearchInput from '../../global-components/SearchInput';
import TablePagination from '../../global-components/TablePagination';
import { AuthContext } from '../../context/auth';
import useSeller from '../../hooks/useSeller';
import { Pagination } from '../../sdks/GlobalDataSchemas';
import { PaginationOptionSeller, Seller} from '../../sdks/seller-v1/utils/DataSchemas';
import { API_FILE_URL } from '../../utilities/constants';
import { Link } from 'react-router-dom';
import { LinksEnum } from '../../utilities/pagesLinksEnum';
let timer: any = null

interface OptionInterface {
    label: string
    value: string
}

const filterOptions: Array<OptionInterface> = [
    { label: "Tous", value: "" },
    { label: "Suspendus", value: "published_only-false" },
    { label: "Non suspendus", value: "published_only-true" },
    { label: "Vérifé", value: "verified-true" },
    { label: "Pas Vérifé", value: "verified-false" },
    { label: "Supprimé", value: "deleted-true" },
]

export default function SellersPage() {
    const { sessionInfo } = useContext(AuthContext)
    const dispatch = useDispatch()
   
    const { client: clientSeller } = useSeller()

    dispatch(setTitle('Sellers'))
    dispatch(setBackButton(false))
    const theme = useSelector((state: RootState) => state.theme.theme)
    const [limit, setLimit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [isSearching, setIsSearching] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>(filterOptions[0])
    const [meta, setMeta] = useState<any> (null)
   

    const { data: usersData, isLoading, isFetching, isError }: any = useQuery({
        queryFn: async () => {
            let filter: PaginationOptionSeller = {page, limit}
            if(search) {
                filter.filter = search
                filter.fields = 'companyInfo.companyName,email,locationInfo.cityName'
            }
            if(selectedOption?.value === 'published_only-false') {
                filter.published_only = 'false'
            }

            if(selectedOption?.value === 'published_only-true') {
                filter.published_only = 'true'
            }

            if(selectedOption?.value === 'verified-true') {
                filter.verified_only = 'true'
            }

            if(selectedOption?.value === 'verified-false') {
                filter.verified_only = 'false'
            }

            if(selectedOption?.value === 'deleted-true') {
                filter.deleted_only = 'true'
            }

            let result: Pagination<Seller> = await clientSeller.getSellers(filter)
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
        queryKey: ['allSellers', search, page, limit, selectedOption],
    })

    const handleChange = (text: string) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            setIsSearching(true);
            setSearch(text)
        }, 1000)
    }

    return (
        <div className="page-content flex justify-center ">
            <div className="w-full max-width page-container">

                {isLoading && !isSearching ? <Loader /> :
                    <div className="flex flex-col justify-between pb-10 table-border">
                        <div className="user-page">

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


                            <div className="w-full otherWidth:px-6 flex justify-center overflow-auto mobile-scroll no-scrollbar">
                                <table className='user-table'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 100 }} className='text-left'>Image</th>
                                            <th style={{ width: 150 }} className='text-left'>Company</th>
                                            <th style={{ width: 150 }} className='text-left'>Email</th>
                                            <th style={{ width: 150 }} className='text-left'>Phone number</th>
                                            <th style={{ width: 150 }} className='text-left'>City</th>
                                            <th style={{ width: 100 }} className='text-center'>Status</th>
                                            <th className='text-center' style={{ width: 100 }}>Sold</th>
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
                                        {!isSearching && usersData?.map((row: Seller, key: number) => {
                                            return <tr key={key}>
                                                <td style={{ width: 100, height: 60 }}>
                                                    {
                                                        !row?.personnalInfo?.image?.path ?
                                                            <>
                                                                {/*<div style={{width: 100, height: 60, backgroundColor: "#cbd5e1"}}/>*/}
                                                                <div style={{ width: 80, height: 60, display: 'flex', alignItems: 'center' }}>--</div>
                                                            </>
                                                            :
                                                            <img src={`${API_FILE_URL}/icons/${row?.personnalInfo?.image?.path}`} width={80} height={60} style={{ width: 80, height: 60 }} className="overflow-hidden object-cover rounded-md" alt=""
                                                            />
                                                    }
                                                </td>
                                                <td>
                                                <Link to={`${LinksEnum.sellers}/${row._id}`} className='capitalize line-clamp-1' style={{ width: 150, fontWeight: 700 }}>
                                                            {row?.companyInfo?.companyName}
                                                </Link>
                                                </td>
                                                <td className='capitalize'>
                                                    <p className='capitalize line-clamp-1' style={{ width: 150 }}>
                                                        {row?.email}
                                                    </p>
                                                </td>
                                                
                                                <td>
                                                    <p className='line-clamp-1' style={{ width: 150 }}>
                                                        {row?.personnalInfo?.number}
                                                    </p>
                                                </td>

                                                <td>
                                                    <p className='line-clamp-1' style={{ width: 150 }}>
                                                        {row?.locationInfo?.cityName}
                                                    </p>
                                                </td>

                                                <td className='flex items-center justify-center' style={{ width: 100 , height: 89}}>
                                                    <div className="search-filter-item flex items-center justify-center"
                                                        style={{
                                                            background: (row.verified &&  !row?.suspended) ?
                                                                (theme === 'light' ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), #E73A5D' : '#E73A5D') : (theme === 'light' ? '#F5F6F7' : "#2C2440"),
                                                            color: (row.verified &&  !row?.suspended) ? (theme === 'light' ? '#E73A5D' : "#FFFFFF") : (theme === 'light' ? '#64748B' : "#BFCADA"),
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
                                                    >{(!row.verified && !row.deleted && !row.suspended) ? 'Unverified' : (!row.verified && row.deleted && row.suspended) ? 'Cancelled' : (!row?.suspended ? 'Active' : 'Disabled')}</div>
                                                </td>
                                                <td className='text-center'>
                                                    <p className='line-clamp-1 text-center' style={{ width: 100 }}>
                                                        {row?.soldNumber}
                                                    </p>
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

                       {meta && <TablePagination
                            limit={limit}
                            setLimit={(limit) => { setIsSearching(true); setLimit(limit) }}
                            currentPage={page}
                            setCurrentPage={(page) => { setIsSearching(true); setPage(page) }}
                            data={meta}
                        />}
                        
                    </div>}
            </div>

        </div>
    )
}
