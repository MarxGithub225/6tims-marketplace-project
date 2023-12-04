/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";
import { ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart, Trash } from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CartProductProps, CartVariableProps } from "../../utilities/constants";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/features/productSlice";
import CartModal from "../../GlobalScreens/CartModal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthStatus } from "../../context/auth";

function CartPage() {
  const { authStatus, setUserInfo } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [totalState, setTotal] = useState<number>(0)
  const [shipingFees, setFees] = useState<number>(0)
  const openQtyForm = window.document.getElementById("openQtyForm")
  const modifyQty = (initialProduct: Product) => {
    if(openQtyForm) {
      dispatch(setProduct(initialProduct))
      setTimeout(() => {
        openQtyForm.click()
      }, 500);
    }
  }
  useEffect(() => {
    let total = 0;
    for (let c of cart) {
     total += c.totalPrice
    }
    setTotal(total)
    const _fees = (cart.length * 50) <= 500 ? (cart.length * 50) : 500;
    setFees(_fees)
  }, [cart])
  return <>
  <PageHeader/>

  <section className="tf-activity s1 tf-section">
  <div className="themesflat-container">
    {(cart && cart.length) ? <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        {cart.map((product: CartProductProps, key:number) => {
          return <div className="sc-card-activity style1" key={key} >
          <div className="content">
          <Link to={`/${product.slug}-${product?._id}.html`} className="media">
            <img src={product.image} alt={`6tims | tims group - ${product.slug}`} />
            </Link>
            <div className="infor">
              <h3 className="line-clamp-1" > <Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h3>
              <div className="status flex items-center gap-x-3">
                <span className="author hidden bigTablet:block">{product.price} DH</span>
                <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => modifyQty(product.initialProduct)} >
                  <Minus/>
                  <span>{product.totalQty}</span>
                  <Plus/>
                </div>
                <span className="author">= {product.totalPrice} DH</span>
                {product.variables.length > 1 ? <div className="hidden bigTablet:flex items-center gap-x-1">
                  <span>Variantes: </span>
                 {product.variables.map((variable: CartVariableProps, index: number) => {
                  if(variable?.quantity > 0)
                  return <><span key={index} >({variable?.label ?? ' - '} * {variable?.quantity}) </span> {index < (product.variables.length - 1) && <span>,</span>}</>
                 })}
                </div>: <></>}

                {product.variables.length === 1 && product.variables[0]?.label ? <div className="hidden bigTablet:flex items-center gap-x-1">
                  <span>Variante: </span>
                 {product.variables.map((variable: CartVariableProps, index: number) => {
                  return <><span key={index} >({variable?.label ?? ' - '} * {variable?.quantity}) </span> {index < (product.variables.length - 1) && <span>,</span>}</>
                 })}
                </div>: <></>}
              </div>
            </div>
          </div>
          {/* <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div> */}
        </div>   
        })}
        
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div className="order-resume w-full">
        <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
            {totalState?.toString()} DH
            </div>
          </div>
          <div className="price-item">
            <div className="price-item-label">
              Côut de livraison
            </div>
            <div className="price-item-value">
              {shipingFees?.toString()} DH
            </div>
          </div>

          <div className="total-amount">
            <div className="total-amount-label">
              Total
            </div>

            <div className="total-amount-value">
              {(totalState + shipingFees)?.toString()} DH
            </div>
          </div>

          <CustumButton
          label={"Acheter"}
          onclick={() => {
            if(authStatus === AuthStatus.SignedIn ) {
              navigate('/checkout')
            }else {
              navigate(`/login?redirect=true&urlRequest=/cart`)
            }
          }}
          backgroundColor="#e73a5d"
          icon={<ShoppingCart size={15}/>}
          />
          <CustumButton
          label="Retour"
          onclick={() => navigate('/')}
          backgroundColor="#fff"
          color="#f7a700"
          borderColor="#f7a700"
          icon={<ArrowLeft size={15}/>}
          />
        </div>
      </div>
    </div>: <></>}
  </div>
</section>
  <a href="#" id="openQtyForm" style={{visibility: 'hidden'}} data-toggle="modal" data-target="#popup_bid" className="sc-button loadmore style bag fl-button pri-3"/>
  <CartModal/>
  </>;
}

export default CartPage;
