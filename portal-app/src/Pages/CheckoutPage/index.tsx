import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";
import { ArrowDown, ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart, Trash } from "react-feather";
import useOnClickOutSide from "../../utils/onClickOutSide";

import {ReactComponent as Visa} from '../../assets/icons/bank/Visa.svg'
import {ReactComponent as Googlepay} from '../../assets/icons/bank/Googlepay.svg'
import {ReactComponent as Paypal} from '../../assets/icons/bank/Visa.svg'
import {ReactComponent as Applepay} from '../../assets/icons/bank/Applepay.svg'
import { AuthContext } from "../../context/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useOrder from "../../hooks/useOrder";
import { CreateRequest } from "../../sdks/order-v1/utils/DataSchemas";
import { notifyError, notifySuccess } from "../../Components/CustomAlert";

interface address {
  city: string
  fullLocation: string
  zipCode: string
  phone: string
  state: string
}

const defaultAdress: address = {
  city: "",
  fullLocation: "",
  zipCode:" ",
  phone:" ",
  state:" ",
}

const defaultOrderData: CreateRequest = {
  cost: 0,
  fees: 10,
  paidMethod: "cash",
  products: [],
  shippingAddress: {
    phone: "",
    state: "",
    city: "",
    fullLocation: "",
    zipCode: "",
  },
  orderStatus: "pending",
}
function CheckoutPage() {
  const { client } = useOrder()
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [totalState, setTotal] = useState<number>(0)
  const { authStatus, sessionInfo } = useContext(AuthContext)
  let [showOptions, setShowOptions] = useState(false)
  let optionsRef = useRef(null)
  
  useOnClickOutSide(optionsRef, ()=> setShowOptions(false))
  const [shippingAddress, setShippingAddress] = useState<address>(defaultAdress)
  const [orderData, setOrderData] = useState<CreateRequest>(defaultOrderData)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(sessionInfo?.userInfo) {
      setShippingAddress({
        city: sessionInfo?.userInfo.address?.city,
        fullLocation: sessionInfo?.userInfo.address?.fullLocation,
        zipCode: sessionInfo?.userInfo.address?.zipCode,
        phone: sessionInfo?.userInfo.address?.phone,
        state: ""
      })
    }
  }, [sessionInfo?.userInfo])

  useEffect(() => {
    let total = 0;
    for (let c of cart) {
     total += c.totalPrice
    }
    setTotal(total)
  }, [cart])

  const upsertMutation = useMutation({
    mutationFn: async () => {
        return orderData && await client?.createOrder(orderData)
    },
    onSuccess: () => {
        notifySuccess({ message: `Inscription réussie !` })
        setLoading(false)
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
    }
  })

  const makeOrder = () => {
    setOrderData({
      ...orderData,
      shippingAddress: shippingAddress,
      cost: totalState,
      products: cart
    })
    setLoading(true)

    setTimeout(() => {
      upsertMutation.mutate()
    }, 500);
  }
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

            {/* <div className="form-label mb-3">
            Mon adresse
            </div>
            <div className="relative bank-account-area flex items-center mb-5">
              <div className="w-full flex items-center justify-between" 
              onClick={() => setShowOptions(!showOptions)}>
              <div className="flex items-center space-x-3 ellips-txt">
                  {`${sessionInfo?.userInfo.address?.city} -  ${sessionInfo?.userInfo.address?.zipCode} - ${sessionInfo?.userInfo.address?.fullLocation}`}
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
            </div> */}
            <div id="commentform" className="comment-form">

              <div className="form-label mb-3">
              Adresse de livraison
              </div>
              <fieldset className="city">
                <input type="text" id="city" 
                value={shippingAddress?.zipCode} 
                onChange={(e: any) => {
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value
                  })
                }}
                placeholder="Ville" className="tb-my-input" name="city" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="zipCode">
                <input type="text" id="zipCode" 
                value={shippingAddress?.city} 
                onChange={(e: any) => {
                  setShippingAddress({
                    ...shippingAddress,
                    zipCode: e.target.value
                  })
                }}
                placeholder="Code postale" className="tb-my-input" name="zipCode" tabIndex={2}  aria-required="true" required />
              </fieldset>

              <fieldset className="name">
                <input type="text" id="state"
                value={shippingAddress?.state} 
                onChange={(e: any) => {
                  setShippingAddress({
                    ...shippingAddress,
                    state: e.target.value
                  })
                }} placeholder="Region/Province" className="tb-my-input" name="state" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="email">
                <input type="text" id="phone"
                value={shippingAddress?.phone} 
                onChange={(e: any) => {
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value
                  })
                }}
                 placeholder="Numéro de téléphone" className="tb-my-input" name="phone" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="message">
                <textarea id="fullLocation" name="fullLocation" className="no-resize text-[15px]"
                value={shippingAddress?.fullLocation} 
                onChange={(e: any) => {
                  setShippingAddress({
                    ...shippingAddress,
                    fullLocation: e.target.value
                  })
                }}
                rows={4} placeholder="Adresse complète" tabIndex={4} aria-required="true" required defaultValue={""} />
              </fieldset>
              {/* <div className="inline-flex btn-submit mg-t-36">
              <CustumButton
              label={"Ajouter et selectionner"}
              onclick={() => {}}
              backgroundColor="#e73a5d"
              />
              </div> */}
            </div>
          </div>

            {/* <div className="form-side-separator"></div> */}

            {/* <h3 className="heading mg-bt-23">
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
            </div> */}
        </div>    
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div className="order-resume w-full">
          {/* <div className="price-item">
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
          </div> */}

          <div className="total-amount">
            <div className="total-amount-label">
              Total
            </div>

            <div className="total-amount-value">
              {totalState?.toString()} DH
            </div>
          </div>

          <CustumButton
          label={"Commander"}
          onclick={() => makeOrder()}
          backgroundColor="#e73a5d"
          icon={<ShoppingCart size={15}/>}
          />
          <CustumButton
          label="Faire mes achats"
          onclick={() => navigate('/')}
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
