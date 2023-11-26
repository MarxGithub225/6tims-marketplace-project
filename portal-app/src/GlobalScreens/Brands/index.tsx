/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionPartner, Partner } from "../../sdks/partner-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import FeaturesCarousel from "../../Components/FeaturesCarousel/FeaturesCarousel";
import usePartner from "../../hooks/usePartner";

function Brands() {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(30)
  const { client } = usePartner()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['bestPartnersData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionPartner = {page, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getPublishedPartners(filter)
            return result?.docs
        }
    })
  return <div className="tf-connect-wallet tf-section feature-style">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading ct style-2 mg-bt-12">
          Nos partenaires
        </h2>
        <h5 className="sub-title ct style-1 pad-400">
          Les grandes marques nous font confiance.
        </h5>
      </div>
      {(data && data?.length) ?  <div className="col-md-12">
        <div className="sc-box-icon-inner style-2 hidden bigTablet:flex">
          {data.map((partner: Partner, key: number) => {
            return <a href={`/partner/${partner.seller._id}`} key={key} className="sc-box-icon">
            <div className="img flex justify-center">
            <img className="rounded-lg w-[54px] h-[54px] " src={partner.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${partner.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${partner.seller.companyInfo.companyName}`} />
            </div>
            <h4 className="heading"><a href={`/partner/${partner.seller._id}`}> {partner.seller.companyInfo.companyName}</a></h4>
          </a>
          })}
          
        </div> 
        <div className="sc-box-icon-inner style-2 block bigTablet:hidden">
        <FeaturesCarousel>
        {data.map((partner: Partner, key: number) => {
            return <a href={`/partner/${partner.seller._id}`} key={key} className="sc-box-icon">
            <div className="img flex justify-center">
            <img className="rounded-lg w-[54px] h-[54px] " src={partner.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${partner.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${partner.seller.companyInfo.companyName}`} />
            </div>
            <h4 className="heading"><a href={`/partner/${partner.seller._id}`}> {partner.seller.companyInfo.companyName}</a></h4>
          </a>
          })}
          </FeaturesCarousel>
        </div>  
      </div> : <></>}
    </div>              
  </div>
</div>
;
}

export default Brands;
