/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionPartner, Partner } from "../../sdks/partner-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../utilities/constants";
import FeaturesCarousel from "../../Components/FeaturesCarousel/FeaturesCarousel";
import usePartner from "../../hooks/usePartner";
import { Link } from "react-router-dom";
import { config } from "../../utilities/helper";

function Brands() {
  const page = 1;
  const limit = 30;
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
        <h2 className="tf-title-heading style-2 mg-bt-12">
          Nos partenaires
        </h2>
        <h5 className="sub-title style-1">
          Les grandes marques nous font confiance.
        </h5>
      </div>
      {(data && data?.length) ?  <div className="col-md-12">
        <div className="sc-box-icon-inner style-2 hidden bigTablet:flex">
          {data.map((partner: Partner, key: number) => {
            return <Link to={`/partner/${partner.seller._id}`} key={key} className="sc-box-icon h-fit">
            <div className="img flex justify-center">
            <img className="rounded-lg w-full h-auto " src={partner.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${partner.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${partner.seller.companyInfo.companyName}`} />
            </div>
            <h6 className="heading truncate lowercase"><Link to={`/partner/${partner.seller._id}`}> {partner.seller.companyInfo.companyName}</Link></h6>
          </Link>
          })}
          
        </div> 
        <div className="sc-box-icon-inner style-2 block bigTablet:hidden">
        <FeaturesCarousel>
        {data.map((partner: Partner, key: number) => {
            return <Link to={`/partner/${partner.seller._id}`} key={key} className="sc-box-icon h-fit">
            <div className="img flex justify-center">
            <img className="rounded-lg w-full h-auto " src={partner.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${partner.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${partner.seller.companyInfo.companyName}`} />
            </div>
            <h6 className="heading truncate lowercase"><Link to={`/partner/${partner.seller._id}`}> {partner.seller.companyInfo.companyName}</Link></h6>
          </Link>
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
