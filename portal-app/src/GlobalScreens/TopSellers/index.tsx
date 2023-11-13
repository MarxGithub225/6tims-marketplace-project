/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionSeller, Seller } from "../../sdks/seller-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import useSeller from "../../hooks/useSeller";
interface TopSellersProps {
  hideMoreButton?: boolean
}
function TopSellers({hideMoreButton=false} : TopSellersProps) {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(30)
  const { client } = useSeller()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['bestSellersData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionSeller = {page, limit, published_only: 'true', verified_only: 'true', sort: 'soldNumber', order: -1}
            let result: Pagination<any> = await client.getBestSellers(filter)
            return result?.docs
        }
    })
  return <section className="tf-section top-seller home6 s2 mobie-style">
  <div className="themesflat-container">
    <div className="row">
    {(data && data?.length) ? <div className="col-md-12">
        <h2 className="tf-title style2 mb-25 text-left">Top Vendeurs</h2>
        <div className="flat-tabs seller-tab style3 tablet-30">
           
            <div className="content-tab mg-t-24">
                <div className="content-inner">
                <div className="swiper-container seller">
                        <CategoryCarousel>
                        {data.map((seller: Seller, key: number) => {
                            return <div className="slider-item" key={key}>										
                            <div className="sc-author-box style-2">
                            <div className="author-avatar">
                                <img className="rounded-lg" src={seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${seller.companyInfo.companyName}`} />
                                <div className="badge" />
                            </div>
                            <div className="author-infor">
                                <h5><a href={`seller/${seller._id}`}>{seller.companyInfo.companyName}</a></h5>
                                {seller.soldNumber > 0 && <span className="price">{seller.soldNumber} PDTS</span>}
                            </div>
                            </div>    	
                        </div>
                        })}
                        </CategoryCarousel>
                    </div>
                </div>
            </div>
          
        </div> 

        {!hideMoreButton && (data.length > 9) && <div className="col-md-12 wrap-inner load-more text-center">
          <a href="/sellers"  className="sc-button loadmore fl-button pri-3"><span>Tous nos vendeurs</span></a>
        </div>}
      </div>: <></>}
    </div>
  </div>     
</section>;
}

export default TopSellers;
