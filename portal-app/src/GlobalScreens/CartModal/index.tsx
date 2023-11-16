import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product, Variable } from "../../sdks/product-v1/utils/DataSchemas";
import { calculatePrice } from "../../utilities/constants";
import useOnClickOutSide from "../../utils/onClickOutSide";
interface CartProductProps {
    _id: string
    sellerId: string
    title: string
    slug: string
    promo: boolean
    isBonus: boolean
    price: number
    oldPrice: number
    percentage: number
    boughtNumber: number
    bonusNumber: number
    mainImage: string
    colorId: string
    images: Array<File>
    quantity: number
    sku: string
    label: string
}

const dafaultValue: CartProductProps = {
    _id: "",
    sellerId: "",
    title: "",
    slug: "",
    boughtNumber: 0,
    bonusNumber: 0,
    promo: false,
    isBonus: false,
    price: 0,
    oldPrice: 0,
    percentage: 0,
    mainImage: "",
    colorId: "",
    images: [],
    sku: "",
    label: "",
    quantity: 1,
}
function CartModal() {
    const modalRef = useRef<any>(null)
    const productSelected: Product | null = useSelector((state: RootState) => state.product.productSelected)

    const [selectedVariable, setVariable] = useState<Variable | null>(productSelected ? productSelected?.variables[0] : null)
    let [productToCart, setProductToCart] = useState<CartProductProps>(dafaultValue)
    useEffect(() => {
        if(productSelected) {
            setVariable(productSelected.variables[0])
        }
    }, [productSelected])
    useOnClickOutSide(modalRef, () => setProductToCart(dafaultValue))
  return <>
  
      <div className="modal fade popup" id="popup_bid_success" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3 className="text-center">Produit(s) ajouté(s) au panier avec succès!</h3>
              <p className="text-center">Tous vos articles ajoutés sont maintenant dans votre panier.</p>
              <a href="#" className="btn btn-primary"> Voir le panier</a>
            </div>
          </div>
        </div>
      </div>
      {productSelected && <div ref={modalRef} className="modal fade popup"  id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button onClick={() => {
                setProductToCart(dafaultValue)
            }} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3>Ajouter au panier</h3>
              <p className="text-center line-clamp-1">{productSelected?.title}</p>
              {productSelected.variables.length === 1 ? <>
                <p>Entrer la quantité. <span className="color-popup">{selectedVariable?.quantity} disponibles</span>
                </p>
                <div className="flex items-center justify-center w-full gap-4">
                    <button className="qty-button down-button"
                    disabled={productToCart.quantity === 1}
                    onClick={() => {
                        setProductToCart({
                            ...productToCart,
                            quantity: productToCart.quantity - 1
                        })
                    }}
                    > - </button>
                    <input type="text" className="w-[100px] text-center form-control quantity" value={productToCart.quantity} />
                    <button className="qty-button up-button"
                    disabled={productToCart.quantity === selectedVariable?.quantity}
                    onClick={() => {
                        setProductToCart({
                            ...productToCart,
                            quantity: productToCart.quantity + 1
                        })
                    }}
                    > + </button>
                </div>
              </>: <>
                    {
                        productSelected.variables.map((variable: Variable, key: number) => {
                            return <div className="mb-2" key={key}>
                                <p>Entrer la quantité de <span className="text-bold" >({variable.label})</span> - <span className="color-popup">{variable?.quantity} disponibles </span>
                                </p>
                                <div className="flex items-center justify-center w-full gap-4">
                                    <button className="qty-button down-button"
                                    disabled={productToCart.quantity === 1}
                                    onClick={() => {
                                        setProductToCart({
                                            ...productToCart,
                                            quantity: productToCart.quantity - 1
                                        })
                                    }}
                                    > - </button>
                                    <input type="text" className="w-[100px] text-center form-control quantity" value={productToCart.quantity} />
                                    <button className="qty-button up-button"
                                    disabled={productToCart.quantity === selectedVariable?.quantity}
                                    onClick={() => {
                                        setProductToCart({
                                            ...productToCart,
                                            quantity: productToCart.quantity + 1
                                        })
                                    }}
                                    > + </button>
                                </div>
                            </div>
                        })
                    }
              </>}
              <div className="hr" />
              <div className="d-flex justify-content-between">
                <p> Total:</p>
                <p className="text-right price color-popup"> {calculatePrice(productSelected).price * productToCart.quantity} DH</p>
              </div>
              {/* <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div> */}
              <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Ajouter</a>
            </div>
          </div>
        </div>
      </div>}
  </>;
}

export default CartModal;
