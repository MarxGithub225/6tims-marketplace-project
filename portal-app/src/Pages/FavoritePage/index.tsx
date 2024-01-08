/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { setProduct } from "../../redux/features/productSlice";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import { config } from "../../utilities/helper";
import { AuthContext, AuthStatus } from "../../context/auth";
import { useDispatch } from "react-redux";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import PageHeader from "../../GlobalScreens/PageHeader";
import CartModal from "../../GlobalScreens/CartModal";
import { toast, Slide } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function FavoritePage() {
    const { signOut, sessionInfo, authStatus } = useContext(AuthContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(authStatus === AuthStatus.SignedOut) {
            navigate('/')
            let errMessage = "Aucun compte connecté. Merci de vous connecter";
            toast.error(
            errMessage,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
    }
    }, [authStatus])
  return <>
  <PageHeader
  header="Mes meilleurs produits"
  />
    <section className="tf-section authors">
        {sessionInfo?.userInfo && <div className="themesflat-container">
            <div className="flat-tabs tab-authors">
                <div className="author-profile flex">
                    <div className="feature-profile">
                    <img className="rounded-3xl" src={sessionInfo?.userInfo?.image ? `${API_FILE_URL}/icons/${sessionInfo?.userInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${sessionInfo?.userInfo?.fullName}`} />
                    </div>
                    <div className="infor-profile">
                    <span>Profile vendeur</span>
                    <h2 className="title">{sessionInfo?.userInfo?.email}</h2>
                    <p className="content">{`${sessionInfo?.userInfo?.address?.city}, ${sessionInfo?.userInfo?.address?.fullLocation} - ${sessionInfo?.userInfo?.address?.zipCode}`}</p>
                    
                    </div>
                    
                </div>

                <div className="relative">
                    <ul className="relative menu-tab flex">
                        <li className={`tablinks active}`}
                        >TOUS</li>
                    </ul>
                </div>
            
                <div className="content-tab">
                    {(sessionInfo?.userInfo?.wishList) ?  <div className="content-inner">
                    <div className="grid grid-cols-2 limitTablet:grid-cols-3 desktop:grid-cols-4 gap-x-[15px] bigTablet:gap-x-[30px]">
                        {sessionInfo?.userInfo?.wishList.map((product: Product, key: number) => {
                        return <div key={key} className="w-full">
                                <div className="sc-card-product sc-card-product-margin-bottom explode ">
                                    <div className="card-media active">
                                    <Link to={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></Link>
                                    
                                    {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
                                    </div>
                                    <div className="card-title mg-bt-16">
                                    <h5 className="truncate w-fit"><Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h5>
                                    </div>
                                    <div className="meta-info">
                                    <div className="author">
                                        <div className="avatar">
                                        <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${product.slug}`} />
                                        </div>
                                        <div className="info">
                                        <span>Vendeur</span>
                                        <h6 className="line-clamp-1"> <Link to={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}</Link>  </h6>
                                        </div>
                                    </div>
                                    {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
                                    </div>
                                    <div className="card-bottom style-explode">
                                        <div className="price">
                                            <div className="price-details">
                                            <h5> {calculatePrice(product).price} DH</h5>
                                            {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <span className="line-through">{calculatePrice(product).oldPrice } DH</span>}
                                            </div>
                                        </div>
                                        <Link to={`/product-activity/${product._id}`} className="view-history reload">Voir historique</Link>
                                    </div>
                                </div>
                                </div>})}
                        
                        </div>
                    </div>: <></>}
                </div>
            </div>
        </div>}
    </section>

    <CartModal/>
  </>;
}

export default FavoritePage;

