/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import FooterAbout from "./screens/FooterAbout";
import { Link } from "react-router-dom";
import useNewsletter from "../../hooks/useNewsletter";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../Components/CustomAlert";
import { Loader } from "react-feather";

function Footer() {
  const { client } = useNewsletter()
  const [email, setEmail] = useState<string>('')
  const upsertMutation = useMutation({
    mutationFn: async () => {
        return await client?.createNewsletter({email, suspended: false})
    },
    onSuccess: () => {
        notifySuccess({ message: `Souscription réussie !` })
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
    }
  })

  const upSave = () => {
    upsertMutation.mutate()
  }
  return <footer id="footer" className="footer-light-style clearfix">
  <div className="themesflat-container">
    <div className="row">
      <FooterAbout/>
      <div className="col-lg-2 mb-5 col-md-4 col-sm-5 col-5">
        <div className="widget widget-menu style-1">
          <h5 className="title-widget">Support</h5>
          <ul>
            <li><Link to={'/terms-and-conditions'}>Termes et confidentialités</Link></li>
            <li><Link to={'/terms-of-sale'}>Conditions de vente</Link></li>
            <li><Link to={'/shipping-and-returns'}>Livraison et Retour</Link></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-2 mb-5 col-md-4 col-sm-7 col-7">
        <div className="widget widget-menu style-2">
          <h5 className="title-widget">Service Client</h5>
          <ul>
            <li><Link to={'/faq'}>Aide & FAQ</Link></li>
            <li><Link to={'/contact-us'}>Contactez-nous</Link></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-2 mb-5 col-md-4 col-sm-5 col-5">
        <div className="widget widget-menu fl-st-3">
          <h5 className="title-widget">Liens utiles</h5>
          <ul>
            <li><a href="https://seller.6tims.com" rel="noreferrer" target="_blank">Devenir vendeur</a></li>
            <li><Link to={'/profile/orders'}>Suivre sa commande</Link></li>
            <li><Link to={'/cookies'}>Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-7 col-12">
        <div className="widget widget-subcribe">
          <h5 className="title-widget">S'abonner</h5>
          <div className="form-subcribe">
            <form id="subscribe-form" action="#" method="GET" acceptCharset="utf-8" className="form-submit">
              <input onChange={(e: any) => setEmail(e.target.value)} id="email" name="email" value={email}  className="email" type="email" placeholder="johndoe@gmail.com" required />
              <button id="submit" name="submit" type="button"
              disabled={email.trim() === ""}
              onClick={() => upSave()}
              >{upsertMutation.isPending ? <Loader className="animate-spin" /> : <i className="icon-fl-send" />}</button>
            </form>
          </div>
          <div className="widget-social style-1 mg-t32">
            <ul>
              <li><a href="#"><i className="fab fa-twitter" /></a></li>
              <li><a href="#"><i className="fab fa-facebook" /></a></li>
              <li><a href="#"><i className="fab fa-youtube" /></a></li>
              <li className="mgr-none"><a href="#"><i className="icon-fl-tik-tok-2" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>;
}

export default Footer;
