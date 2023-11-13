import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";

function ProductHistorical() {
  return <>
  <PageHeader/>
    <section className="tf-activity s1 tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/card-item-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Monica Lucas</a></h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="time">At 2:30 PM on 19th June, 2021</div>
            </div>
          </div>
          <div className="button-active icon icon-1" />
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Wow! That Brain is Floating</a> </h3>
              <div className="status"> <span className="quote">10 editions listed </span> by<span className="author"> Meowbids </span> for <span className="quote"> 2.50 ETH</span>each</div>
              <div className="time">At 2:30 PM on 19th June, 2021</div>
            </div>
          </div>
          <div className="button-active icon icon-2" />
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-11.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Erotic 35mm and polaroid photography</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="time">At 2:30 PM on 19th June, 2021</div>
            </div>
          </div>
          <div className="button-active icon icon-3" />
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-21.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Our Journey Start</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="time">At 2:30 PM on 19th June, 2021</div>
            </div>
          </div>
          <div className="button-active icon icon-4" />
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-6.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Skrrt Cobain Official</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="time">At 2:30 PM on 19th June, 2021</div>
            </div>
          </div>
          <div className="button-active icon icon-5" />
        </div>                          
        <div className="btn-activity mg-t-40 center">
          <a href="#" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div id="side-bar" className="side-bar style-2">
          
          <div className="widget widget-filter style-2 mgbt-0">
            <h3 className="title-widget">Filter</h3>
            <ul className="box-check">
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-sort-filled" />Listings</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-heart-filled" />Like</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-buy" />Purchases</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-discount" />Sales</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-logout" />Transfer</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-star" />Burns</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-credit-card" />Bids</a></li>
              <li><a href="#" className="box-widget-filter"><i className="icon-fl-users-filled" />Followings</a></li>
            </ul>
            <a href="#" className="clear-check btn-filter style-2">
              Clear All Filters
            </a>
          </div>
        </div>{/*/.side-bar*/}
      </div>
    </div>
  </div>
</section>

  </>;
}

export default ProductHistorical;
