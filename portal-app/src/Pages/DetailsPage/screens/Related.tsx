/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import HotProductCarousel from "../../../Components/HotProductCarousel/HotProductCarousel";
import { Product } from "../../../sdks/product-v1/utils/DataSchemas";
import Countdown from "react-countdown";
import { API_FILE_URL, calculatePrice } from "../../../utilities/constants";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import { Link } from "react-router-dom";
interface RelatedProps {
  products: Array<Product>
}

function Related({products}: RelatedProps) {
    return <section className="tf-section live-auctions home5 style2 bg-style3">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-md-12">
          <div className="heading-live-auctions">
            <h2 className="tf-title pb-23">
              Vous pouriez aimer</h2>
          </div>
        </div>
        <div className="col-md-12">
        {(products && products?.length) ? <div className="swiper-container carousel8 pt-4 auctions">
            <HotProductCarousel>
            {products.map((product: Product, key: number) => {
                return <div className="slider-item" key={key}>										
                <div className="sc-card-product menu_card style2">
                <div className="card-media style2">
                    <Link to={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}-${product?._id}`} /></Link>
                    {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
                    {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <div className="featured-countdown style2">
                    <span className="slogan" />
                    {/* <span className="js-countdown" data-timer={516400} data-labels=" :  ,  : , : , " /> */}
                    <Countdown className="js-countdown" date={calculatePrice(product).countdown} />
                    </div>}
                    <div className="button-place-bid">
                    <Link to="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Mettre au panier</span></Link>
                    </div>
                </div>
                <div className="card-title">
                    <h3 className="line-clamp-1 w-fit"><Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h3>
                    {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
                </div>
                <div className="meta-info style2">
                    <div className="author">
                    <div className="avatar">
                        <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${product.slug}-${product?._id}`} />
                    </div>
                    <div className="info">
                        <span>Vendeur</span>
                        <h4> <Link to={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}
                        </Link> </h4>
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

export default Related;
