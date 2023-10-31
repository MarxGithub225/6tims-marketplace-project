import React from "react";

function FooterAbout() {
  return <div className="col-lg-3 col-md-12 col-12">
  <div className="widget widget-logo">
    <div className="logo-footer" id="logo-footer">
      <a href="index.html">
        <img id="logo_footer" src="assets/images/logo/tims_logo_black.png" alt="nft-gaming" width={135} height={56} data-retina="assets/images/logo/logo_dark@2x.png" data-width={135} data-height={56} />
      </a>
    </div>
    <p className="sub-widget-logo">
        <strong>Tim's est le leader panafricain du e-commerce.</strong>
        <br/>
        Notre mission est d’améliorer le quotidien du continent africain en proposant aux consommateurs des services en ligne innovants, pratiques et abordables.</p>
  </div>
</div>;
}

export default FooterAbout;
