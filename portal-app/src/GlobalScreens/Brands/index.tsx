/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import CategoryCarousel from "../../Components/CategoryCarousel/CategoryCarousel";
import FeaturesCarousel from "../../Components/FeaturesCarousel/FeaturesCarousel";

function Brands() {
  return <div className="tf-connect-wallet tf-section feature-style">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading ct style-2 mg-bt-12">
          Nos partenaires
        </h2>
        <h5 className="sub-title ct style-1 pad-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
        </h5>
      </div>
      <div className="col-md-12">
        <div className="sc-box-icon-inner style-2 hidden bigTablet:flex">
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-1.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Meta Mask</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-6.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html"> Bitski</a></h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/Vector.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Fortmatic</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/WalletConnect.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Wallet Connect</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-2.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Coinbase Wallet</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-3.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Authereum</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-4.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Kaikas</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-5.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Torus</a> </h4>
          </div>
        </div> 
        <div className="sc-box-icon-inner style-2 block bigTablet:hidden">
        <FeaturesCarousel>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-1.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Meta Mask</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-6.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html"> Bitski</a></h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/Vector.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Fortmatic</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/WalletConnect.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Wallet Connect</a> </h4>
          </div>
          <div className="sc-box-icon mgbt-0 mgbt-30">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-2.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Coinbase Wallet</a> </h4>
          </div>
          <div className="sc-box-icon mgbt-0 mgbt-30">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-3.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Authereum</a> </h4>
          </div>
          <div className="sc-box-icon mgbt-0">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-4.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Kaikas</a> </h4>
          </div>
          <div className="sc-box-icon">
            <div className="img flex justify-center">
              <img src="assets/images/icon/icon-5.png" alt="Image" />
            </div>
            <h4 className="heading"><a href="login.html">Torus</a> </h4>
          </div>
          </FeaturesCarousel>
        </div>  
      </div>    
    </div>              
  </div>
</div>
;
}

export default Brands;
