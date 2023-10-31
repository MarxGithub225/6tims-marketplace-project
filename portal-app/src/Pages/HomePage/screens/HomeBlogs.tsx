import React from "react";
import HotProductCarousel from "../../../Components/HotProductCarousel/HotProductCarousel";

function HomeBlogs() {
  return <section className="tf-section live-auctions style4 home5 mobie-style">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-md-12">
        <div className="heading-live-auctions">
          <h2 className="tf-title pb-23 text-left">
            Notre actualité</h2>
          <a href="/blogs" className="exp style2">DECOUVRIR PLUS</a>
        </div>
      </div>
      <div className="col-md-12">
        <div className="swiper-container show-shadow carousel9 pad-t-17 auctions">
        <HotProductCarousel>
        {[0, 1, 2, 3, 3].map((m: any, key: number) => {
            return <div className="sc-card-collection style-2 home2">
            <div className="card-media-h6">
              <img src="assets/images/box-item/collection-item-14.jpg" alt='' />
            </div>
            <div className="card-bottom">
              <div className="author">
                <div className="content">
                    <div className="infor">
                        <span>09 Août 2023</span>
                        <span className="name"></span>
                    </div>
                    <h4 className="ellips-txt-3"><a href="author01.html">C’est mon histoire : « J’ai rencontré l’amour deux jours après mon mariage »</a></h4>
                  
                </div>
              </div>
              <button className="wishlist-button public heart mg-t-6"><span className="number-like"> 100</span></button>
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

export default HomeBlogs;
