/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Related from "./screens/Related";
import Brands from "../../GlobalScreens/Brands";
import TopSellers from "../../GlobalScreens/TopSellers";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

import { useContext, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../sdks/product-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { Link, useLocation, useParams } from "react-router-dom";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import Countdown from "react-countdown";
import CartModal from "../../GlobalScreens/CartModal";
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/features/productSlice";
import moment from "moment";
import 'moment/locale/fr'  // without this line it didn't work
import { AuthContext, AuthStatus } from "../../context/auth";
import { notifyError, notifySuccess } from "../../Components/CustomAlert";
import { toast, Slide } from "react-toastify";
import CustomSelect from "../../Components/CustomSelect";
import { Star } from "react-feather";
import RecentViews from "./screens/RecentViews";
import { config } from "../../utilities/helper";
moment.locale('fr')
function DetailsPage() {
  const [rating, setRating] = useState({
    star : 1, 
    comment: ''
  });
  const queryClient = useQueryClient()
  let reviewRef: any = useRef(null);
  let notesRef: any = useRef(null);
  const { signOut, sessionInfo, authStatus, setUserInfo } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const [checkedTab, setCheckedTab] = useState<number>(0)
  const {slug} = useParams<any>()
  const { client } = useProduct()
  const [liked, setLiked] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [relativeLimit, setRelativeLimit] = useState<number>(5)
  let search = useLocation().search;
  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['productDetails', slug],
      queryFn: async () => {
          if(slug) {
            const splitId = slug?.split('.html').join('').split('-')
            const _id = splitId[splitId?.length - 1]
            const result: Product = await client.getProductById(_id)
            return result
          }else return null
      }
  })

  const { data:dataView }: any =
  useQuery({
      queryKey: ['productView', slug],
      queryFn: async () => {
          if(slug) {
            const splitId = slug?.split('.html').join('').split('-')
            const _id = splitId[splitId?.length - 1]
            if(authStatus === AuthStatus.SignedOut) {
              await client.viewProduct(_id)
              return null
            }else {
              await client.viewProductAuth(_id)
              return null
            }
            
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

  useEffect(() => {
    if(authStatus === AuthStatus.SignedIn && slug) {
      const splitId = slug?.split('.html').join('').split('-')
      const _id = splitId[splitId?.length - 1]
      const isLiked: boolean =  sessionInfo?.userInfo?.wishList?.filter((w: any) => w?._id === _id).length ?? false
      setLiked(isLiked)
    }

    if(search) {
      const tag = new URLSearchParams(search).get('tag');

      if (tag && reviewRef) {
        setTimeout(() => {
          reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 500);
      }
    }
  }, [slug])

  const upsertMutationLikeProduct = useMutation({
    mutationFn: async () => {
        if(authStatus === AuthStatus.SignedIn && slug) {
          const splitId = slug?.split('.html').join('').split('-')
          const _id = splitId[splitId?.length - 1]
          return await client?.likeProduct(_id)
        }else {
          let errMessage = "Veuillez vous connecter";
          toast.error(
          errMessage,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
    },
    onSuccess: (response: any) => {
        setLiked(!liked)
        const simpleUser = {
          ...sessionInfo?.userInfo,
          wishList: response.wishList
      }
      setUserInfo(simpleUser)
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
    }
  })

  const upsertMutationCommentProduct = useMutation({
    mutationFn: async () => {
      if(slug) {
        const splitId = slug?.split('.html').join('').split('-')
        const _id = splitId[splitId?.length - 1]
        return await client?.commentProduct(_id, rating)
      }
    },
    onSuccess: (response) => {
      setRating({
        star : 1, 
        comment: ''
      })
      notifySuccess({ message: `Votre message a été enregistré !` })
      setCheckedTab(data.principalFeatures ? 2 : 1)
      if (notesRef) {
        setTimeout(() => {
          notesRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 500);
      }
      queryClient.invalidateQueries({ queryKey: ["productDetails"] }).catch(e => console.log(e))
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
    }
  })

const handleSelectChangeStar = (selectedOption: any) => {
  setRating({ ...rating, star: selectedOption?.value})
}

const getProductById = () => {
  if(slug) {
    const splitId = slug?.split('.html').join('').split('-')
    return splitId[splitId?.length - 1]
  }else return ''
}
  return <>
  <PageHeader
  header="Détails du produit"
  />
  
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
                  <span className="liked star wishlist-button mg-l-8">{data?.totalrating === 0? 5: data?.totalrating}</span>
                  {authStatus === AuthStatus.SignedIn && <span
                  onClick={()=> upsertMutationLikeProduct.mutate()}
                   className={`liked heart heart-no-margin wishlist-button ${liked ? 'active': ''} mg-l-8`}></span>}
                </div>
              </div>
              <div className="client-infor sc-card-product">
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                    <img src={data.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${data.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${data.slug}`} />
                    </div>
                    <Link to={`/seller/${data.seller._id}`} className="info">
                      <span>Vendeur</span>
                      <h6> <Link to={`/seller/${data.seller._id}`}>{data.seller.companyInfo.companyName}</Link> </h6>
                    </Link>
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
              <div className="flat-tabs themesflat-tabs" ref={notesRef}>
                <ul className="menu-tab tab-title">
                 {data.principalFeatures && <li className={`item-title ${checkedTab === 0 ? 'active': ''}`}
                 onClick={() => setCheckedTab(0)}
                 >
                    <span className="inner">Spécifications</span>
                  </li>}
                  <li className={`item-title ${checkedTab === (data.principalFeatures ? 1: 0) ? 'active': ''}`}
                  onClick={() => setCheckedTab(data.principalFeatures ? 1: 0)}
                  >
                    <span className="inner">Historique du produit</span>
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
                    
                    {!data?.ratings?.length ? <span className="text-[17px]">Soyez le premier à <strong
                    className="cursor-pointer"
                    onClick={() => {
                      if (reviewRef) {
                        setTimeout(() => {
                          reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
                        }, 500);
                      }
                    }}
                    >donner votre avis</strong> </span>: <>
                    {data?.ratings
                      ?.sort((a: any, b: any) => new Date(b?.postedAt).getTime() - new Date(a?.postedAt).getTime())
                      ?.map((rating: any, key: number) => {
                        return <li key={key} >
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                <img src={rating?.owner?.image ? `${API_FILE_URL}/icons/${rating?.owner?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | rating`} />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6><a href="author02.html">{rating?.owner?.fullName} </a></h6> <span> {moment(rating?.postedAt).fromNow()}</span>
                                </div>
                                <span className="time">{rating?.comment}</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5 className="flex items-center gap-x-3"> 
                            {Array((Number(rating?.star))).fill(undefined).map((v, i) => i + 1).map((data: any, key: number) => {
                              return <Star color="#F4A607"  size={15} />
                            })}
                            {Array((5 - Number(rating?.star))).fill(undefined).map((v, i) => i + 1).map((data: any, key: number) => {
                              return <Star size={15} />
                            })}</h5>
                          </div>
                        </div>
                      </li>
                      })}
                    </> }                      
                    </ul>
                  </div>}
                  {checkedTab ===  (data.principalFeatures ? 1: 0) && <div className="content-inner tab-content">                                               
                    <ul className="bid-history-list">
                      {data?.historical
                      ?.sort((a: any, b: any) => b?.actedAt - a?.actedAt)
                      ?.map((historic: any, key: number) => {
                        return <li key={key} >
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                <img src={historic?.owner?.image ? `${API_FILE_URL}/icons/${historic?.owner?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | historic`} />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                {historic?.owner && <><h6> <>{historic?.owner?.fullName} </></h6> <span> {getMessage(historic?.type)} </span></>}
                                {!historic?.owner && <>Un utilisateur <span> {getMessage(historic?.type)} </span></>}
                                </div>
                                <span className="time">{moment(historic?.actedAt).fromNow()}</span>
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
                <div className="w-[100%]  bigTablet:w-[600px]">
                <div id="comments" ref = {reviewRef} >
                <h3 className="heading mg-bt-23">
                    Laisser un commentaire
                </h3>
                <div id="commentform" className="comment-form">
                    <CustomSelect
                    rounded="rounded-[4px]"
                     value={rating.star}
                      options={[
                        {
                            name: '5 étoiles', value: '5'
                        },
                        {
                            name: '4 étoiles', value: '4'
                        },
                        {
                            name: '3 étoiles', value: '3'
                        },
                        {
                            name: '2 étoiles', value: '2'
                        },
                        {
                            name: '1 étoile', value: '1'
                        }
                      ]}
                    onChange={handleSelectChangeStar}
                    placeholder="Note"
                    />
                    <fieldset className="message">
                    <textarea id="message" 
                    value={rating.comment}
                    onChange={e => setRating({...rating, comment: e.target.value})}
                    className="resize-none" name="message" rows={4} placeholder="Message" tabIndex={4} aria-required="true"  />
                    </fieldset>
                    <div className="btn-submit mg-t-36 inline-flex">
                    {authStatus === AuthStatus.SignedIn ? <CustumButton
                    label={"Envoyer"}
                    disabled={!rating.comment || !rating.star}
                    onclick={() => !upsertMutationCommentProduct.isPending && upsertMutationCommentProduct.mutate()}
                    backgroundColor="#e73a5d"
                    isLoading={upsertMutationCommentProduct.isPending}
                    />: <span className="text-[#e73a5d]" >Veuillez <Link className="font-bold" to={`/login?redirect=true&urlRequest=/${slug}&tag=reviewform`}>vous connecter</Link> pour laisser votre impression sur ce produit</span> }
                    </div>
                </div>
                </div>       
                </div>   
            </div>
        </div>
    </div>}
  </div>
  {/* /tf item details */};
  {sessionInfo?.userInfo && <RecentViews
    products={sessionInfo?.userInfo?.viewedList?.reverse()?.filter((pdt: Product) => pdt._id !== getProductById())}
  />}
  <Related
  products = {relativeProducts ?? []}
  />
  <TopSellers/>
  <Brands/>
  <CartModal/>
</>

}

export default DetailsPage;
