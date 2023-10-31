import React from "react";
import PageHeader from "../../../GlobalScreens/PageHeader";
import CustumButton from "../../../Components/CustumButton";

function LoginPage() {
  return <>
  <PageHeader/>
   <section className="tf-login tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-12">
        <h2 className="tf-title-heading ct style-1">
          Se connecter à 6tims
        </h2>
        <div className="flat-form box-login-social">
          <div className="box-title-login">
            <h5>Réseau social</h5>
          </div>
          <ul>
            <li>
              <a href="#" className="sc-button style-2 fl-button pri-3">
                <i className="icon-fl-google-2" />
                <span>Google</span>
              </a>
            </li>
            <li>
              <a href="#" className="sc-button style-2 fl-button pri-3">
                <i className="icon-fl-facebook" />
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flat-form box-login-email">
          <div className="box-title-login">
            <h5>Ou</h5>
          </div>
          <div className="form-inner">
            <form action="#" id="contactform">
              <input id="name" name="name" tabIndex={1}  aria-required="true" required type="text" placeholder="Your Full Name" />
              <input id="email" name="email" tabIndex={2}  aria-required="true" type="email" placeholder="Your Email Address" required />
              <div className="row-form style-1">
                <label>Resté connecté
                  <input type="checkbox" />
                  <span className="btn-checkbox" />
                </label>
                <a href="#" className="forgot-pass">Mot de passe oublié ?</a>
              </div>
              <CustumButton
                label="Se connecter"
                onclick={() => {}}
                backgroundColor="#f7a700"
                color="#fff"
                />

                <div className="">
                    <label >Je suis nouveau</label>, <a href="#" className="forgot-pass">Créer mon compte</a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  </>;
}

export default LoginPage;
