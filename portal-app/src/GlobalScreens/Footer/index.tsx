/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import FooterAbout from "./screens/FooterAbout";

function Footer() {
  return <footer id="footer" className="footer-light-style clearfix">
  <div className="themesflat-container">
    <div className="row">
      <FooterAbout/>
      <div className="col-lg-2 col-md-4 col-sm-5 col-5">
        <div className="widget widget-menu style-1">
          <h5 className="title-widget">Service Client</h5>
          <ul>
            <li><a href="author01.html">Termes et confidentialités</a></li>
            <li><a href="connect-wallet.html">Conditions de vente</a></li>
            <li><a href="profile.html">Foire aux questions</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-2 col-md-4 col-sm-7 col-7">
        <div className="widget widget-menu style-2">
          <h5 className="title-widget">Support</h5>
          <ul>
            <li><a href="auctions.html">Messagérie live</a></li>
            <li><a href="help-center.html">Aide & FAQ</a></li>
            <li><a href="item-details.html">Contactez-nous</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-2 col-md-4 col-sm-5 col-5">
        <div className="widget widget-menu fl-st-3">
          <h5 className="title-widget">Liens utiles</h5>
          <ul>
            <li><a href="explore-1.html">Devenir vendeur</a></li>
            <li><a href="contact1.html">Suivre sa commande</a></li>
            <li><a href="blog.html">Expédition et livraison</a></li>
            <li><a href="faq.html">Politique de retour</a></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-7 col-12">
        <div className="widget widget-subcribe">
          <h5 className="title-widget">S'abonner</h5>
          <div className="form-subcribe">
            <form id="subscribe-form" action="#" method="GET" acceptCharset="utf-8" className="form-submit">
              <input name="email"  className="email" type="email" placeholder="johndoe@gmail.com" required />
              <button id="submit" name="submit" type="submit"><i className="icon-fl-send" /></button>
            </form>
          </div>
          <div className="widget-social style-1 mg-t32">
            <ul>
              <li><a href="#"><i className="fab fa-twitter" /></a></li>
              <li><a href="#"><i className="fab fa-facebook" /></a></li>
              <li className="style-2"><a href="#"><i className="fab fa-telegram-plane" /></a></li>
              <li><a href="#"><i className="fab fa-youtube" /></a></li>
              <li className="mgr-none"><a href="#"><i className="icon-fl-tik-tok-2" /></a></li>
              <li className="mgr-none"><a href="#"><i className="icon-fl-vt" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>;
}

export default Footer;
