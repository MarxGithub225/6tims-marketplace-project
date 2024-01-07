import React from "react";
import logo from '../../../assets/images/tims_logo_black.png'
function FooterAbout() {
  return <div className="col-lg-3 col-md-12 col-12">
  <div className="widget widget-logo">
    <div className="logo-footer" id="logo-footer">
      <a href="/">
        <img id="logo_footer" src={logo} alt="nft-gaming" width={135} height={56} data-retina="assets/images/logo/logo_dark@2x.png" data-width={135} data-height={56} />
      </a>
    </div>
    

    <p className="sub-widget-logo">
        <strong>Tim’s Group est une Entreprise Technologique.</strong>
        <br/>
        Notre ambition est de créer une Entreprise durable et prospère axée sur l’Innovation et la Haute Technologie afin d’accélérer la Transition Numérique sur le Continent.</p>
  </div>
</div>;
}

export default FooterAbout;
