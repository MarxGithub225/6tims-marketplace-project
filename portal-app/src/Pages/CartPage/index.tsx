/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [totalState, setTotal] = useState<number>(0)
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
          <a href={`/${product.slug}-${product?._id}.html`} className="media">
            <img src={product.image} alt={`6tims | tims group - ${product.slug}`} />
            </a>
            <div className="infor">
              <h3 className="line-clamp-1" > <a href="item-details.html">{product.title}</a></h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="status flex items-center gap-x-3">
                <span className="author">{product.price} DH</span>
                <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => modifyQty(product.initialProduct)} >
                  <Minus/>
                  <span>{product.totalQty}</span>
                  <Plus/>
                </div>
                <span className="author">= {product.totalPrice} DH</span>
                {product.variables.length ? <div className="flex items-center gap-x-1">
                  <span>Variantes: </span>
                 {product.variables.map((variable: CartVariableProps, index: number) => {
                  return <><span key={index} >({variable.label} * {variable.quantity}) </span> {index < (product.variables.length - 1) && <span>,</span>}</>
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
          {/* <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div> */}
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
          onclick={() => navigate('/checkout')}
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
    </div>: <></>}
  </div>
</section>
  <a href="#" id="openQtyForm" style={{visibility: 'hidden'}} data-toggle="modal" data-target="#popup_bid" className="sc-button loadmore style bag fl-button pri-3"/>
  <CartModal/>
  </>;
}

export default CartPage;
