/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
interface TopSellersProps {
  hideMoreButton?: boolean
}
function TopSellers({hideMoreButton=false} : TopSellersProps) {
  return <section className="tf-section top-seller home6 s2 mobie-style">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="tf-title style2 mb-25 text-left">Top Vendeurs</h2>
        <div className="flat-tabs seller-tab style3 tablet-30">
           
            <div className="content-tab mg-t-24">
                <div className="content-inner">
                    <div className="swiper-container seller">
                        <CategoryCarousel>
                        {[0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3].map((m: any, key: number) => {
                            return <div className="slider-item" key={key}>										
                            <div className="sc-author-box style-2">
                            <div className="author-avatar">
                                <img src="assets/images/avatar/avt-2.jpg" alt='' className="avatar" />
                                <div className="badge" />
                            </div>
                            <div className="author-infor">
                                <h5><a href="author02.html">Samson Frost</a></h5>
                                <span className="price">1400 PDTS</span>
                            </div>
                            </div>    	
                        </div>
                        })}
                        </CategoryCarousel>
                    </div>
                </div>
            </div>
          
        </div> 

        {!hideMoreButton && <div className="col-md-12 wrap-inner load-more text-center">
          <a href="/sellers"  className="sc-button loadmore fl-button pri-3"><span>Tous nos vendeurs</span></a>
        </div>}
      </div>
    </div>
  </div>     
</section>;
}

export default TopSellers;
