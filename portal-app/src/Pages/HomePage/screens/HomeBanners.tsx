/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { Banner, PaginationOptionBanner } from "../../../sdks/banner-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import useBanner from "../../../hooks/useBanner";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
function HomeBanners() {

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 992 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 991, min: 0 },
      items: 1
    }
  };

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
{(data && data?.length) ?  <Carousel
  swipeable={true}
  draggable={true}
  showDots={false}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="transform 300ms ease-in-out"
  transitionDuration={500}
  containerClass="swiper-container carousel8 pt-4 auctions"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style"
  itemClass="px-[15px]"
>
    {data?.map((data: Banner, key: number) => {
        return <Link to={`${data.link}`} className="slider-item" key={key}>	
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
            </Link>
      })}
    </Carousel>: <></>}
</div>;
}

export default HomeBanners;
