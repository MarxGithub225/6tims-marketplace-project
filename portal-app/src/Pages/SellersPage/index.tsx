/* eslint-disable jsx-a11y/anchor-is-valid */
import PageHeader from "../../GlobalScreens/PageHeader";
import { useState } from "react";
import { useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionSeller } from "../../sdks/seller-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../utilities/constants";
import useSeller from "../../hooks/useSeller";
import { Seller } from "../../sdks/seller-v1/utils/DataSchemas";
import { Link } from "react-router-dom";
import { config } from "../../utilities/helper";
function SellersPage() {

    const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(15)
  const { client } = useSeller()
  const [meta, setMeta] = useState<any> (null)
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage}: any =
  useInfiniteQuery({
        queryKey: ['hotAllSellersData', limit],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionSeller = {page: pageParam, limit, published_only: 'true', verified_only: 'true', sort: 'createdAt', order: -1}
            
            let result: Pagination<any> = await client.getBestSellers(filter)

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
        initialPageParam: 1,
        getNextPageParam(lastPage: any, allPages: any) {
          return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
        },
    })

  return <>
    <PageHeader/>
    <section className="tf-section our-creater dark-style2">
        <div className="themesflat-container">
        {(data && data?.pages) ?  <div className="row">
                <div className="col-md-12">
                    <h2 className="tf-title style4 mg-bt-38">Tous nos vendeurs</h2>
                </div>
                 <>
        {data.pages.map((page: Array<Seller>) => (
          <>
          {page.map((seller: Seller, key: number) => {
                return <div className="fl-item2 col-lg-4 col-md-6 col-12" key={key} >
                    <div className="sc-card-collection style-2">
                    <div className="card-bottom">
                        <div className="author">
                        <div className="sc-author-box style-2">
                            <div className="author-avatar">
                            <img src={seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${seller.companyInfo.companyName}`} className="avatar" />
                            <div className="badge" />
                            </div>
                        </div>
                        <div className="content">
                            <h4><Link to={`seller/${seller._id}`}>{seller.companyInfo.companyName}</Link></h4>
                            <div className="infor">
                            {seller.soldNumber > 0 && <span className="price">{seller.soldNumber} produits vendus</span>}
                            </div>
                        </div>
                        </div>
                        <Link to={`seller/${seller._id}`} className="sc-button fl-button pri-3"><span>Details</span></Link>
                    </div>
                    
                    </div>
                </div>})}
            </>
            ))}
            </>
            {meta?.hasNextPage && <div className="col-md-12 wrap-inner load-more mg-t-10 text-center">
                    <a 
                    onClick={(e: any) => {
                        e.preventDefault()
                        fetchNextPage()
                      }}
                    id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
                </div>}
            </div>: <></>}
        </div>
    </section>

  </>;
}

export default SellersPage;
