/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionBanner } from "../../../sdks/banner-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../../utilities/constants";
import HotProductCarousel from "../../../Components/HotProductCarousel/HotProductCarousel";
import useProduct from "../../../hooks/useProduct";
import { Product } from "../../../sdks/product-v1/utils/DataSchemas";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import Countdown from 'react-countdown';
function HomeHotProducts () {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(30)
  const { client } = useProduct()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['bestProductsData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionBanner = {page, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getBestProducts(filter)
            return result?.docs
        }
    })
    return <section className="tf-section live-auctions home5 style2 bg-style3">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-md-12">
          <div className="heading-live-auctions">
            <h2 className="tf-title pb-23">
              Les produits chauds du moment</h2>
            <a href="/hot-exploration" className="exp style2">DECOUVRIR PUS</a>
          </div>
        </div>
        <div className="col-md-12">
          {(data && data?.length) ? <div className="swiper-container carousel8 pt-4 auctions">
            <HotProductCarousel>
            {data.map((product: Product, key: number) => {
                return <div className="slider-item" key={key}>										
                <div className="sc-card-product menu_card style2">
                <div className="card-media style2">
                    <a href="item-details.html"><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></a>
                    {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
                    {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <div className="featured-countdown style2">
                    <span className="slogan" />
                    {/* <span className="js-countdown" data-timer={516400} data-labels=" :  ,  : , : , " /> */}
                    <Countdown className="js-countdown" date={calculatePrice(product).countdown} />
                    </div>}
                    <div className="button-place-bid">
                    <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Mettre au panier</span></a>
                    </div>
                </div>
                <div className="card-title">
                    <h3 className="line-clamp-1 w-fit"><a href="item-details.html">{product.title}</a></h3>
                    {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
                </div>
                <div className="meta-info style2">
                    <div className="author">
                    <div className="avatar">
                        <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${product.slug}`} />
                    </div>
                    <div className="info">
                        <span>Vendeur</span>
                        <h4> <a href="author02.html">{product.seller.companyInfo.companyName}
                        </a> </h4>
                    </div>
                    </div>
                    <div className="price">
                    {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <span className="line-through">{calculatePrice(product).oldPrice } DH</span>}
                    <h5> {calculatePrice(product).price} DH</h5>
                    </div>
                </div>
                </div>    	
            </div>
            })}
            </HotProductCarousel>
          </div> : <></>}
        </div>
      </div>
    </div>
  </section>;
}

export default HomeHotProducts;
