/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import TopSellers from "../../GlobalScreens/TopSellers";
import Brands from "../../GlobalScreens/Brands";
import PageHeader from "../../GlobalScreens/PageHeader";

function SearchPage() {
  return <>
  <PageHeader/>
  <section className="tf-explore tf-section">
    <div className="themesflat-container">
        <div className="row">
            <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">
                    NFTs Marketplace
                </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
                </p>
            </div>
        </div>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div id="side-bar" className="side-bar style-3">
            <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Status</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Buy Now
                    <input type="checkbox" defaultChecked />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>On Auctions
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Has Offers
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Categories</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Art
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Music
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Domain Names
                    <input type="checkbox" defaultChecked />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Virtual Worlds
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Trading  Cards
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Collectibles
                    <input type="checkbox" defaultChecked />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Sports
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Utility
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Chains</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Ethereum
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Polygon
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Klaytn
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Collections</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Abstraction
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Patternlicious
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Skecthify
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Cartoonism
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Virtuland
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Papercut
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12">
          <div className="box-epxlore">
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/card-item-4.jpg" alt="Image" /></a>
                <div className="coming-soon">coming soon</div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"Space babe - Night 2/25"</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-2.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Price</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/card-item-2.jpg" alt="Image" /></a>
                <div className="button-place-bid">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
                </div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"CyberPrimal 042 LAN”</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-4.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Current Bid</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
                <a href="activity1.html" className="view-history reload">View History</a>
              </div>
            </div>
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/card-item-7.jpg" alt="Image" /></a>
                <div className="button-place-bid">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
                </div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"Crypto Egg Stamp #5”</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-3.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Current Bid</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
                <a href="activity1.html" className="view-history reload">View History</a>
              </div>
            </div>
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/card-item-9.jpg" alt="Image" /></a>
                <div className="coming-soon">coming soon</div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"Space babe - Night 2/25"</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-2.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Price</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/image-box-6.jpg" alt="Image" /></a>
                <div className="button-place-bid">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
                </div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"CyberPrimal 042 LAN"</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-4.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Current Bid</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
                <a href="activity1.html" className="view-history reload">View History</a>
              </div>
            </div>
            <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
                <a href="item-details.html"><img src="assets/images/box-item/image-box-11.jpg" alt="Image" /></a>
                <div className="button-place-bid">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style-place-bid style bag fl-button pri-3"><span>Place Bid</span></a>
                </div>
                <button className="wishlist-button heart"><span className="number-like"> 100</span></button>
              </div>
              <div className="card-title">
                <h5><a href="item-details.html">"Crypto Egg Stamp #5”</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <img src="assets/images/avatar/avt-3.jpg" alt="Image" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6> <a href="author02.html">SalvadorDali</a> </h6>
                  </div>
                </div>
                <div className="tags">bsc</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Current Bid</span>
                  <div className="price-details">
                    <h5> 4.89 ETH</h5>
                    <span>= $12.246</span>
                  </div>
                </div>
                <a href="activity1.html" className="view-history reload">View History</a>
              </div>
            </div>
          </div>
          <div className="btn-auction center">
            <a href="#" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <TopSellers/>
  <Brands/>
  </>;
}

export default SearchPage;
