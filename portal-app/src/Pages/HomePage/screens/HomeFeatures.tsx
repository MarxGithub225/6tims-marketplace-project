import React from "react";
import FeaturesCarousel from "../../../Components/FeaturesCarousel/FeaturesCarousel";
import { DollarSign, Headphones, Truck } from "react-feather";
function HomeFeatures() {
  return <section className="tf-box-icon live-auctions style1 tf-section home6 bg-style3 feature-style">
  <div className="themesflat-container">
    <div className="row hidden bigTablet:block">
      <div className="col-md-12">
        <div className="sc-box-icon-inner style2">
          <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#E73A5D] ">
                <Truck className="text-white" />
              </div>                                                                                                                        
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Livraison rapide</a></h3>
            <p className="content">Livraison en moins de 48h et à moindre côut</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#47A432] ">
                <DollarSign className="text-white" />
              </div>                                                                                                                
            </div>
            
            <h3 className="heading"><a href="connect-wallet.html">Garantie monétaire</a></h3>
            <p className="content">30 jours de remboursement</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#9835FB] ">
                <Headphones className="text-white" />
              </div>                                                                  
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Support 24/7</a></h3>
            <p className="content">Assistance amicale 24H/24 et 7J/7.</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
            <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width={56} height={56} rx={16} fill="#DF4949" />
                <path fillRule="evenodd" clipRule="evenodd" d="M34.9222 26.0176H39.1035C39.5983 26.0176 39.9995 26.3978 39.9995 26.8669V29.8192C39.9937 30.286 39.5959 30.6631 39.1035 30.6685H35.0182C33.8252 30.6837 32.7821 29.9095 32.5115 28.8081C32.376 28.1244 32.5662 27.4189 33.0312 26.8807C33.4961 26.3424 34.1883 26.0265 34.9222 26.0176ZM35.1048 29.1217H35.4995C36.0061 29.1217 36.4168 28.7324 36.4168 28.2521C36.4168 27.7719 36.0061 27.3826 35.4995 27.3826H35.1048C34.8625 27.3799 34.6292 27.4693 34.4568 27.6307C34.2845 27.7922 34.1875 28.0123 34.1875 28.242C34.1875 28.7239 34.5965 29.1161 35.1048 29.1217Z" fill="#F9F9FA" fillOpacity="0.4" />
                <path d="M34.9227 24.2788H40C40 20.3154 37.5573 18 33.4187 18H22.5813C18.4427 18 16 20.3154 16 24.2282V32.7718C16 36.6846 18.4427 39 22.5813 39H33.4187C37.5573 39 40 36.6846 40 32.7718V32.4078H34.9227C32.5662 32.4078 30.656 30.5971 30.656 28.3635C30.656 26.1299 32.5662 24.3192 34.9227 24.3192V24.2788Z" fill="white" />
                <path d="M28.4582 24.2791H21.6849C21.1766 24.2736 20.7675 23.8813 20.7676 23.3995C20.7734 22.9232 21.1824 22.54 21.6849 22.54H28.4582C28.9649 22.54 29.3756 22.9293 29.3756 23.4096C29.3756 23.8898 28.9649 24.2791 28.4582 24.2791V24.2791Z" fill="#948BFB" />
              </svg>                                      
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Paiement sécurisé</a></h3>
            <p className="content">Nous garantissions la sécurité de vos données.</p>
          </div>
        </div>  
      </div> 
    </div>

    <div className="sc-box-icon-inner style2 block bigTablet:hidden">
      <FeaturesCarousel>
      <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#E73A5D] ">
                <Truck className="text-white" />
              </div>                                                                                                                        
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Livraison rapide</a></h3>
            <p className="content">Livraison en moins de 48h et à moindre côut</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#47A432] ">
                <DollarSign className="text-white" />
              </div>                                                                                                                
            </div>
            
            <h3 className="heading"><a href="connect-wallet.html">Garantie monétaire</a></h3>
            <p className="content">30 jours de remboursement</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
              <div className="w-[56px] h-[56px] flex items-center justify-center rounded-[16px] bg-[#9835FB] ">
                <Headphones className="text-white" />
              </div>                                                                  
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Support 24/7</a></h3>
            <p className="content">Assistance amicale 24H/24 et 7J/7.</p>
          </div>
          <div className="sc-box-icon">
            <div className="image">
            <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width={56} height={56} rx={16} fill="#DF4949" />
                <path fillRule="evenodd" clipRule="evenodd" d="M34.9222 26.0176H39.1035C39.5983 26.0176 39.9995 26.3978 39.9995 26.8669V29.8192C39.9937 30.286 39.5959 30.6631 39.1035 30.6685H35.0182C33.8252 30.6837 32.7821 29.9095 32.5115 28.8081C32.376 28.1244 32.5662 27.4189 33.0312 26.8807C33.4961 26.3424 34.1883 26.0265 34.9222 26.0176ZM35.1048 29.1217H35.4995C36.0061 29.1217 36.4168 28.7324 36.4168 28.2521C36.4168 27.7719 36.0061 27.3826 35.4995 27.3826H35.1048C34.8625 27.3799 34.6292 27.4693 34.4568 27.6307C34.2845 27.7922 34.1875 28.0123 34.1875 28.242C34.1875 28.7239 34.5965 29.1161 35.1048 29.1217Z" fill="#F9F9FA" fillOpacity="0.4" />
                <path d="M34.9227 24.2788H40C40 20.3154 37.5573 18 33.4187 18H22.5813C18.4427 18 16 20.3154 16 24.2282V32.7718C16 36.6846 18.4427 39 22.5813 39H33.4187C37.5573 39 40 36.6846 40 32.7718V32.4078H34.9227C32.5662 32.4078 30.656 30.5971 30.656 28.3635C30.656 26.1299 32.5662 24.3192 34.9227 24.3192V24.2788Z" fill="white" />
                <path d="M28.4582 24.2791H21.6849C21.1766 24.2736 20.7675 23.8813 20.7676 23.3995C20.7734 22.9232 21.1824 22.54 21.6849 22.54H28.4582C28.9649 22.54 29.3756 22.9293 29.3756 23.4096C29.3756 23.8898 28.9649 24.2791 28.4582 24.2791V24.2791Z" fill="#948BFB" />
              </svg>                                      
            </div>
            <h3 className="heading"><a href="connect-wallet.html">Paiement sécurisé</a></h3>
            <p className="content">Vos données sont sécurisées.</p>
          </div>
      </FeaturesCarousel>  
    </div>         
  </div>
</section>;
}

export default HomeFeatures;
