/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import HotProductCarousel from "../../../Components/HotProductCarousel/HotProductCarousel";

function Related() {
    return <section className="tf-section live-auctions home5 style2 bg-style3">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-md-12">
          <div className="heading-live-auctions">
            <h2 className="tf-title pb-23">
              Vous pouriez aimer</h2>
            <a href="/hot-exploration" className="exp style2">DECOUVRIR PUS</a>
          </div>
        </div>
        <div className="col-md-12">
        <div className="swiper-container carousel8 pt-4 auctions">
            <HotProductCarousel>
            {[0, 1, 2, 3, 0].map((m: any, key: number) => {
                return <div className="slider-item">										
                <div className="sc-card-product menu_card style2">
                <div className="card-media style2">
                    <a href="item-details.html"><img src="assets/images/box-item/image-box-29.jpg" alt="Image" /></a>
                    <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
                    <div className="featured-countdown style2">
                    <span className="slogan" />
                    <span className="js-countdown" data-timer={516400} data-labels=" :  ,  : , : , " />
                    </div>
                    <div className="button-place-bid">
                    <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Mettre au panier</span></a>
                    </div>
                </div>
                <div className="card-title">
                    <h3><a href="item-details.html">"Hamlet Contemplates ...</a></h3>
                    <div className="tags">-50%</div>
                </div>
                <div className="meta-info style2">
                    <div className="author">
                    <div className="avatar">
                        <img src="assets/images/avatar/avt-28.jpg" alt="Image" />
                    </div>
                    <div className="info">
                        <span>Creator</span>
                        <h4> <a href="author02.html">Salvador Dali
                        </a> </h4>
                    </div>
                    </div>
                    <div className="price">
                    <span className="line-through">10 DH</span>
                    <h5> 4.89 DH</h5>
                    </div>
                </div>
                </div>    	
            </div>
            })}
            </HotProductCarousel>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

export default Related;
