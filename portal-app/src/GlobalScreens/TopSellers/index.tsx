/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionSeller, Seller } from "../../sdks/seller-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import useSeller from "../../hooks/useSeller";
import { Link } from "react-router-dom";
import { config } from "../../utilities/helper";
import FeaturesCarousel from "../../Components/FeaturesCarousel/FeaturesCarousel";
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
  return <>

<div className="tf-connect-wallet tf-section feature-style">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading style-2 mb-[20px]">
        Top Vendeurs
        </h2>
      </div>
      {(data && data?.length) ?  <div className="col-md-12">
        <div className="sc-box-icon-inner style-2 hidden bigTablet:flex">
            {data.map((seller: Seller, key: number) => {
            return <Link to={`/seller/${seller._id}`} key={key} className="sc-box-icon h-fit">
            <div className="img flex justify-center">
            <img className="rounded-lg w-[54px] h-[54px] " src={seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${seller.companyInfo.companyName}`} />
            </div>
            <h6 className="heading truncate lowercase"><Link to={`/seller/${seller._id}`}>{seller.companyInfo.companyName}</Link></h6>
          </Link>
          })}
          
        </div> 
        <div className="sc-box-icon-inner style-2 block bigTablet:hidden">
        <FeaturesCarousel>
        {data.map((seller: Seller, key: number) => {
            return <Link to={`/seller/${seller._id}`} key={key} className="sc-box-icon h-fit">
            <div className="img flex justify-center">
            <img className="rounded-lg w-[54px] h-[54px] " src={seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${seller.companyInfo.companyName}`} />
            </div>
            <h6 className="heading truncate lowercase"><Link to={`/seller/${seller._id}`}>{seller.companyInfo.companyName}</Link></h6>
          </Link>
          })}
          </FeaturesCarousel>
        </div>  
      </div> : <></>}
    </div>              
  </div>
</div>
</>;
}

export default TopSellers;
