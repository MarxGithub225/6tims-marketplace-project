/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Related from "./screens/Related";
import Brands from "../../GlobalScreens/Brands";
import TopSellers from "../../GlobalScreens/TopSellers";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../sdks/product-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { Link, useParams } from "react-router-dom";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import Countdown from "react-countdown";
import CartModal from "../../GlobalScreens/CartModal";
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/features/productSlice";

function DetailsPage() {
  const dispatch = useAppDispatch()
  const [checkedTab, setCheckedTab] = useState<number>(0)
  const {slug} = useParams<any>()
  const { client } = useProduct()
  const [liked, setLiked] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [relativeLimit, setRelativeLimit] = useState<number>(5)

  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['productDetails', slug],
      queryFn: async () => {
          if(slug) {
            const splitId = slug?.split('.html').join('').split('-')
            const _id = splitId[splitId?.length - 1]
            const [result, _] = await Promise.all([
              client.getProductById(_id),
              client.viewProduct(_id)
            ])
            return result
          }else return null
      }
  })

  const { data: relativeProducts, isLoading: relativeLoading, isFetching: relativeFetching, isError: relativeError}: any =
  useQuery({
        queryKey: ['relativesBlogsData', limit, slug, data],
        queryFn: async ({ pageParam}: any) => {
            if(slug && data) {
              const splitId = slug?.split('.html').join('').split('-')
              const _id = splitId[splitId?.length - 1]

              let filter: PaginationOptionProduct = {page, limit: relativeLimit, published_only: 'true', categoryId: data?.categoryId}
              let result: Pagination<any> = await client.getRelativeProducts(filter, _id)

              return result?.docs
            }else return []
        }
    })
  
    const getMessage = (type: string): string => {
      switch (type) {
        case 'view':
          return 'a vu ce produit'
          break;
        case 'like':
            return 'a aimé ce produit'
            break;
        case 'comment':
              return 'a commenté ce produit'
              break;
        case 'sell':
                return 'a achété ce produit'
                break;
        default:
           return 'a vu ce produit'
          break;
      }
    }
  return <>
  <PageHeader/>
  
  {/* tf item details */}
  <div className="tf-section tf-item-details">
    {data && <div className="themesflat-container">
      <div className="row">
        <div className="col-xl-6 col-md-12">
          <div className="content-left">
            <div className="media">
            <img src={`${API_FILE_URL}/products/${data?.images?.filter((img: File) => img._id === data.mainImage)[0].path}`} alt={`6tims - tims group | ${data.slug}`} />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="content-right">
            <div className="sc-item-details">
              <h2 className="style2">{data?.title}</h2>
              <div className="meta-item">
                <div className="left">
                  <span className="viewed eye">{data?.viewsCount}</span>
                  <span className="liked heart wishlist-button mg-l-8"><span className="number-like">{data?.totalrating}</span></span>
                </div>
              </div>
              <div className="client-infor sc-card-product">
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                    <img src={data.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${data.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-288.jpg`} alt={`6tims - tims group | ${data.slug}`} />
                    </div>
                    <div className="info">
                      <span>Vendeur</span>
                      <h6> <Link to={`/seller/${data.seller._id}`}>{data.seller.companyInfo.companyName}</Link> </h6>
                    </div>
                  </div>
                </div>
              </div>
              <p className="small-description" dangerouslySetInnerHTML={{__html: data.smallDescription}} />
              <div className="meta-item-details style2">
                <div className="item meta-price">
                  <span className="heading">Prix</span>
                  <div className="price">
                    <div className="price-box">
                    <h5> {calculatePrice(data).price} DH</h5>
                      {(calculatePrice(data).promo && !calculatePrice(data).isBonus) && <span className="line-through">{calculatePrice(data).oldPrice } DH</span>}
                      {calculatePrice(data).isBonus && <span>{data?.boughtNumber} achété {data?.bonusNumber} offert</span>}
                    </div>
                  </div>
                </div>
                {calculatePrice(data)?.promo && <div className="item count-down">
                  <span className="heading style-2">Fin promo dans:</span>
                  <Countdown className="js-countdown text-[20px] "  date={calculatePrice(data).countdown} />
                </div>}
              </div>
              <a href="#" 
              onClick={() => {
                dispatch(setProduct(data))
              }}
              data-toggle="modal" data-target="#popup_bid" className="sc-button loadmore style bag fl-button pri-3"><span>Mettre dans le panier</span></a>
              <div className="flat-tabs themesflat-tabs">
                <ul className="menu-tab tab-title">
                 {data.principalFeatures && <li className={`item-title ${checkedTab === 0 ? 'active': ''}`}
                 onClick={() => setCheckedTab(0)}
                 >
                    <span className="inner">Spécifications</span>
                  </li>}
                  <li className={`item-title ${checkedTab === (data.principalFeatures ? 1: 0) ? 'active': ''}`}
                  onClick={() => setCheckedTab(data.principalFeatures ? 1: 0)}
                  >
                    <span className="inner">Historique de vente</span>
                  </li>
                  <li className={`item-title ${checkedTab === (data.principalFeatures ? 2 : 1) ? 'active': ''}`}
                  onClick={() => setCheckedTab(data.principalFeatures ? 2 : 1)}
                  >
                    <span className="inner">Notes et Avis</span>
                  </li>
                  
                </ul>
                <div className="content-tab">
                  {checkedTab ===  (data.principalFeatures ? 2: 0) && <div className="content-inner tab-content">
                    <ul className="bid-history-list">
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6><a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span>bid accepted</span>
                                </div>
                                <span className="time">at 06/10/2021, 3:20 AM</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-28.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>}
                  {checkedTab ===  (data.principalFeatures ? 1: 0) && <div className="content-inner tab-content">                                               
                    <ul className="bid-history-list">
                      {data?.historical
                      ?.sort((a: any, b: any) => b?.actedAt - a?.actedAt)
                      ?.map((historic: any, key: number) => {
                        return <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                <img src={historic?.owner?.image ? `${API_FILE_URL}/icons/${historic?.owner?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | historic`} />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                {historic?.owner && <><h6> <>{historic?.owner?.fullName} </></h6> <span> {getMessage(historic?.type)} </span></>}
                                {!historic?.owner && <>Un utilisateur <span> {getMessage(historic?.type)} </span></>}
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      })
                      }
                      
                    </ul>
                  </div>}
                  {checkedTab === 0 && data.principalFeatures && <div className="content-inner tab-content">
                    <div className="provenance" dangerouslySetInnerHTML={{__html: data.principalFeatures}} />
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post">
            <div className="inner-content">
                <div className="divider" />
                  <div className="mg-bt-22" dangerouslySetInnerHTML={{__html: data.fullDescription}} />
                  {/* <div className="sc-widget style-1">
                    <div className="widget widget-tag style-2">
                        <h4 className="title-widget">Tags</h4>
                        <ul>
                        <li><a href="#">Bitcoin</a></li>
                        <li><a href="#">Token</a></li>
                        <li><a href="#">Wallet</a></li>
                        </ul>
                    </div>
                    <div className="widget widget-social style-2">
                        <h4 className="title-widget">Share:</h4>
                        <ul>
                        <li><a href="#" className="icon-fl-facebook" /></li>
                        <li className="style-2"><a href="#" className="icon-fl-coolicon" /></li>
                        <li className="mgr-none"><a href="#" className="icon-fl-mess" /></li>
                        </ul>
                    </div>
                  </div>     */}
                <div className="divider d2" />
                <div className="w-[600px]">
                <div id="comments">
                <h3 className="heading mg-bt-23">
                    Laisser un commentaire
                </h3>
                <form action="https://themesflat.co/html/axiesv/contact/contact-process.php" method="post" id="commentform" className="comment-form">
                    <fieldset className="name">
                    <input type="text" id="name" placeholder="Name" className="tb-my-input" name="name" tabIndex={2}  aria-required="true" required />
                    </fieldset>
                    <fieldset className="email">
                    <input type="email" id="email" placeholder="Email *" className="tb-my-input" name="email" tabIndex={2}  aria-required="true" required />
                    </fieldset>
                    <fieldset className="message">
                    <textarea id="message" name="message" rows={4} placeholder="Message" tabIndex={4} aria-required="true"  />
                    </fieldset>
                    <div className="btn-submit mg-t-36">
                    <CustumButton
                    label={"Envoyer"}
                    onclick={() => {}}
                    backgroundColor="#e73a5d"
                    />
                    </div>
                </form>
                </div>       
                </div>   
            </div>
        </div>
    </div>}
  </div>
  {/* /tf item details */};
  <Related
  products = {relativeProducts ?? []}
  />
  <TopSellers/>
  <Brands/>
  <CartModal/>
</>

}

export default DetailsPage;
