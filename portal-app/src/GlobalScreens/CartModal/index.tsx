/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product, Variable } from "../../sdks/product-v1/utils/DataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useOnClickOutSide from "../../utils/onClickOutSide";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { setCart } from "../../redux/features/cartSlice";
import { Link, useLocation } from "react-router-dom";
interface CartVariableProps {
  quantity: number
  sku: string
  label: string
}
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
    colorId: string
    image: string
    variables: Array<CartVariableProps>
    totalQty: number
    totalPrice: number,
    initialProduct: Product | null
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
    colorId: "",
    image: "",
    totalQty: 0,
    totalPrice: 0,
    variables: [],
    initialProduct: null
}
function CartModal() {
    const {pathname}  = useLocation()
    const dispatch = useDispatch()
    const modalRef = useRef<any>(null)
    const productSelected: Product | null = useSelector((state: RootState) => state.product.productSelected)
    const cart = useSelector((state: RootState) => state.cart.cart)

    let [productToCart, setProductToCart] = useState<CartProductProps>(dafaultValue)
    useOnClickOutSide(modalRef, () => setProductToCart(dafaultValue))

    const cartAction = (index: number, action: string, variable: Variable) => {
      let list = [...productToCart.variables];
      let currentQty = asData(index) ? list[index]['quantity']: 0;
      let thisDATA = {
        ...list[index],
        label: variable.label,
        sku: variable.sku,
        quantity: action==='plus' ? currentQty + 1 : currentQty - 1
      }

      list[index] = thisDATA;

      if(productSelected) {
        const _theproductToCart: CartProductProps = {
          ...productToCart,
          _id: productSelected?._id,
          sellerId: productSelected?.sellerId,
          title: productSelected?.title,
          slug: productSelected?.slug,
          boughtNumber: productSelected?.boughtNumber,
          bonusNumber: productSelected?.bonusNumber,
          promo: calculatePrice(productSelected).promo,
          isBonus: calculatePrice(productSelected).isBonus,
          price: calculatePrice(productSelected).price,
          oldPrice: calculatePrice(productSelected).oldPrice,
          percentage: calculatePrice(productSelected).percentage,
          image: `${API_FILE_URL}/products/${productSelected?.images?.filter((img: File) => img._id === productSelected.mainImage)[0].path}`,
          colorId: productSelected.colorId,
          variables: list,
          totalQty: action==='plus' ? productToCart.totalQty + 1 : productToCart.totalQty - 1,
          totalPrice: action==='plus' ?  (productToCart.totalPrice + calculatePrice(productSelected).price) : (productToCart.totalPrice - calculatePrice(productSelected).price),
        }
        setProductToCart(_theproductToCart)
      }
    }

    const decreaseProductToCart = (variable: Variable, index: number) => {
      cartAction(index, 'moins', variable)
    }

    const increaseProductToCart = (variable: Variable, index: number) => {
      cartAction(index, 'plus', variable)
    }

    const asData = (index: number): boolean => {
        return productToCart.variables.length && productToCart.variables[index] ? true: false
    }

    useEffect(() => {
      if(productSelected && cart && cart.length) {
        const getProductToCart: Array<CartProductProps> = cart.filter((_car: CartProductProps) => _car._id === productSelected._id)
        if(getProductToCart.length){
          setProductToCart(getProductToCart[0])
        }
      }
    }, [cart, productSelected])

    const addToCart = () => {
      const showSuccess = window.document.getElementById("showSuccess")
      dispatch(setCart({...productToCart, initialProduct: productSelected}))

      if(showSuccess) {
        showSuccess.click()
      }
    }

    const checkOutOfStock = () => {
      if(productSelected) {
        if(productSelected.variables.length === 1) {
          if(productSelected.variables[0].quantity > 0 && productSelected.variables[0].isActivated) {
            return false
          }else return true
        }else {
          let result = false;

          productSelected.variables.forEach((element: Variable) => {
            if(element.quantity > 0 && element.isActivated) {
              result =  false
            }else result =  true
          });

          return result
        }
      }
      
    }
    
  return <>
  
      <div className="modal fade popup" id="popup_bid_success" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              {pathname !== '/cart' && <h3 className="text-center">Produit ajouté au panier avec succès!</h3>}
              {pathname === '/cart' && <h3 className="text-center">Quantité de produit modifié!</h3>}
              {pathname !== '/cart' && <p className="text-center">Tous vos articles ajoutés sont maintenant dans votre panier.</p>}
              {pathname === '/cart' && <p className="text-center">La quantité de votre produit a été modifié avec succès.</p>}
              {pathname !== '/cart' && <Link to="/cart" 
              onClick={() => {
                const showSuccess = window.document.getElementById("popup_bid_success")
                if(showSuccess) {
                  showSuccess.click()
                }
              }}
              className="btn btn-primary"> Voir le panier</Link>}
              {pathname === '/cart' && <Link 
              onClick={() => {
                const showSuccess = window.document.getElementById("popup_bid_success")
                if(showSuccess) {
                  showSuccess.click()
                }
              }}
              to="/cart" className="btn btn-primary"> Payer maintenant</Link>}
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
              {(productSelected.variables.length === 1 && productSelected.variables[0].quantity > 0 && productSelected.variables[0].isActivated) ? <>
                <p>Entrer la quantité. <span className="color-popup">{productSelected.variables[0]?.quantity} disponibles</span>
                </p>
                <div className="flex items-center justify-center w-full gap-4">
                    <button className="qty-button down-button"
                    disabled={!asData(0) || (asData(0) && productToCart.variables[0].quantity === 0)}
                    onClick={() => {
                        decreaseProductToCart(productSelected.variables[0], 0)
                    }}
                    > - </button>
                    <input type="text" className="w-[100px] text-center form-control quantity" value={asData(0) ? productToCart.variables[0].quantity: 0} />
                    <button className="qty-button up-button"
                    disabled={(asData(0) && (productToCart.variables[0].quantity === productSelected.variables[0]?.quantity))}
                    onClick={() => {
                      increaseProductToCart(productSelected.variables[0], 0)
                    }}
                    > + </button>
                </div>
              </>: <div className={`max-h-[300px] overflow-y-auto cart-modal-list ${productSelected.variables?.length > 3 ? 'pr-2': ''}`}>
                    {
                        productSelected.variables.map((variable: Variable, key: number) => {
                          if(variable.quantity > 0 && variable.isActivated)
                            return <div className="mb-2" key={key}>
                                <p>Entrer la quantité de <span className="font-bold" >({variable.label})</span> - <span className="color-popup">{variable?.quantity} disponibles </span>
                                </p>
                                <div className="flex items-center justify-center w-full gap-4">
                                    <button className="qty-button down-button"
                                    disabled={!asData(key) || (asData(key) && productToCart.variables[key].quantity === 0)}
                                    onClick={() => {
                                        decreaseProductToCart(variable, key)
                                    }}
                                    > - </button>
                                    <input type="text" className="w-[100px] text-center form-control quantity" value={asData(key) ? productToCart.variables[key].quantity: 0} />
                                    <button className="qty-button up-button"
                                    disabled={(asData(key) && (productToCart.variables[key]?.quantity === variable?.quantity))}
                                    onClick={() => {
                                        increaseProductToCart(variable, key)
                                    }}
                                    > + </button>
                                </div>
                            </div>
                        })
                    }
              </div> }

              {checkOutOfStock() && <p className="text-center text-[red] line-clamp-1">En rupture de stock</p>}
              <div className="hr" />
              {!checkOutOfStock() && <div className="d-flex justify-content-between">
                <p> Total:</p>
                <p className="text-right price color-popup"> {productToCart.totalPrice} DH</p>
              </div>}
              {/* <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div> */}
              <a href="#"
              onClick={(e: any) => {
                e.preventDefault()
                addToCart()
              }}
              style={{
                pointerEvents: checkOutOfStock() ? 'none': 'initial',
                opacity: checkOutOfStock() ? .5 : 1
              }}
              className="btn btn-primary"> Ajouter</a>
              <a style={{display: 'none'}} href="#" id="showSuccess" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Ajouter</a>
            </div>
          </div>
        </div>
      </div>}
  </>;
}

export default CartModal;
