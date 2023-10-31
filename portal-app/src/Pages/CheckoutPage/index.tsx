import React, { useRef, useState } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";
import { ArrowDown, ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart, Trash } from "react-feather";
import useOnClickOutSide from "../../utils/onClickOutSide";

import {ReactComponent as Visa} from '../../assets/icons/bank/Visa.svg'
import {ReactComponent as Googlepay} from '../../assets/icons/bank/Googlepay.svg'
import {ReactComponent as Paypal} from '../../assets/icons/bank/Visa.svg'
import {ReactComponent as Applepay} from '../../assets/icons/bank/Applepay.svg'
function CheckoutPage() {

  let [showOptions, setShowOptions] = useState(false)
  let optionsRef = useRef(null)
  
  useOnClickOutSide(optionsRef, ()=> setShowOptions(false))

  return <>
  <PageHeader/>

  <section className="tf-activity s1 tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        <div className="form-side">

          <div id="comments">
            <h3 className="heading mg-bt-23">
              Adresse de livraison
            </h3>

            <div className="form-label mb-3">
            Mes adresses
            </div>
            <div className="relative bank-account-area flex items-center mb-5">
              <div className="w-full flex items-center justify-between" 
              onClick={() => setShowOptions(!showOptions)}>
              <div className="flex items-center space-x-3 ellips-txt">
                  Casablanca - Daroua - 20020 - Près de la boulagerie Mohamed II
              </div>
              <ArrowDown  className="bank-account-arrow mr-7"/>
              </div>

              {showOptions && <div ref={optionsRef} className="absolute top-[75px] left-0 bank-account-items w-full">
                <div className="bank-account-item flex items-center space-x-3 ellips-txt">
                Casablanca - Daroua - 20020 - Près de la boulagerie Mohamed II
                </div>
                <div className="bank-account-item flex items-center space-x-3 ellips-txt">
                Casablanca - Daroua - 20020 - Près de la boulagerie Mohamed II
                </div>
                <div className="bank-account-item flex items-center space-x-3 ellips-txt">
                Casablanca - Daroua - 20020 - Près de la boulagerie Mohamed II
                </div>
                <div className="bank-account-item flex items-center space-x-3 ellips-txt">
                Casablanca - Daroua - 20020 - Près de la boulagerie Mohamed II
                </div>
              </div>}
            </div>
            <form action="https://themesflat.co/html/axiesv/contact/contact-process.php" method="post" id="commentform" className="comment-form">

              <div className="form-label mb-3">
              Ajouter une nouvelle adresse
              </div>
              <fieldset className="name">
                <input type="text" id="name" placeholder="Ville" className="tb-my-input" name="name" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="email">
                <input type="email" id="email" placeholder="ZIP Code" className="tb-my-input" name="email" tabIndex={2}  aria-required="true" required />
              </fieldset>

              <fieldset className="name">
                <input type="text" id="name" placeholder="Region/Province" className="tb-my-input" name="name" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="email">
                <input type="email" id="email" placeholder="Numéro de téléphone" className="tb-my-input" name="email" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="message">
                <textarea id="message" name="message" rows={4} placeholder="Adresse complète" tabIndex={4} aria-required="true" required defaultValue={""} />
              </fieldset>
              <div className="inline-flex btn-submit mg-t-36">
              <CustumButton
              label={"Ajouter et selectionner"}
              onclick={() => {}}
              backgroundColor="#e73a5d"
              />
              </div>
            </form>
          </div>

            <div className="form-side-separator"></div>

            <h3 className="heading mg-bt-23">
              Methodes de paiement
            </h3>

            <div className="relative bank-account-area flex items-center mb-5 bigTablet:mb-0">
              <div className="w-full flex items-center justify-between" 
              onClick={() => setShowOptions(!showOptions)}>
              <div className="flex items-center space-x-3">
                <Visa className="w-12 h-auto" />
                  <span>XXXX - XXXX - XXXX - 2541</span>
              </div>
              <ArrowDown  className="bank-account-arrow mr-7"/>
              </div>

              {showOptions && <div ref={optionsRef} className="absolute top-[75px] left-0 bank-account-items w-full">
                <div className="bank-account-item flex items-center space-x-3">
                  <Visa className="w-12 h-auto" />
                  <span>XXXX - XXXX - XXXX - 2541</span>
                </div>
                <div className="bank-account-item flex items-center space-x-3">
                  <Paypal className="w-12 h-auto" />
                  <span>PayPal</span>
                </div>
                <div className="bank-account-item flex items-center space-x-3">
                  <Googlepay className="w-12 h-auto" />
                  <span>Google Pay</span>
                </div>
                <div className="bank-account-item flex items-center space-x-3">
                  <Applepay className="w-12 h-auto" />
                  <span>Apple Pay</span>
                </div>
              </div>}
            </div>
        </div>    
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div className="order-resume w-full">
          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>
          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="total-amount">
            <div className="total-amount-label">
              Total
            </div>

            <div className="total-amount-value">
              7 000 000 DH
            </div>
          </div>

          <CustumButton
          label={"Commander"}
          onclick={() => {}}
          backgroundColor="#e73a5d"
          icon={<ShoppingCart size={15}/>}
          />
          <CustumButton
          label="Faire mes achats"
          onclick={() => {}}
          backgroundColor="#fff"
          color="#f7a700"
          borderColor="#f7a700"
          icon={<ArrowLeft size={15}/>}
          />
        </div>
      </div>
    </div>
  </div>
</section>
  </>;
}

export default CheckoutPage;
