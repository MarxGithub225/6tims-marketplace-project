/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import CardCarousel from '../../../Components/ProductCarousel/ProductCarousel';
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionBanner } from "../../../sdks/banner-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import useBanner from "../../../hooks/useBanner";
function HomeBanners() {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const { client } = useBanner()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['bannersData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionBanner = {page, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getPublishedBanners(filter)
            return result?.docs
        }
    })
  return <div className="col-md-12">
  <div className="swiper-container carousel8 pt-4 auctions">
    <CardCarousel>
    {data?.map((data: any, key: number) => {
        return <div className="slider-item" key={key}>	
              <div className="wrap-cart">
                <div className="cart_item style2 style3">
                  <div className="inner-cart">
                    <div className="overlay" />
                    <img src={`${API_FILE_URL}/banners/${data?.image?.path}`} alt='' className="avatar" />
                    <div className="content">
                      {/* <div className="fs-16"><a href="item-details.html">LIVE ARTS</a></div>
                      <p>Graphic Art 3D</p> */}
                    </div>   
                  </div>
                </div>
              </div> 	
            </div>
      })}
    </CardCarousel>
  </div>
</div>;
}

export default HomeBanners;
