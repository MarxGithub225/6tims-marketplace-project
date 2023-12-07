/* eslint-disable jsx-a11y/anchor-is-valid */
import PageHeader from "../../GlobalScreens/PageHeader";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useSeller from "../../hooks/useSeller";
import { Seller } from "../../sdks/seller-v1/utils/DataSchemas";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import useProduct from "../../hooks/useProduct";
import { PaginationOptionProduct, Product } from "../../sdks/product-v1/utils/DataSchemas";
import { useAppDispatch } from "../../redux/hooks";
import { setProduct } from "../../redux/features/productSlice";
import CartModal from "../../GlobalScreens/CartModal";
import { config } from "../../utilities/helper";
function SellerPage() {

    const dispatch = useAppDispatch()
    const {id} = useParams<any>()
  const { client } = useSeller()
  const { client: clientProduct } = useProduct()
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [limitProducts, setLimitProducts] = useState<number>(20)
  const [meta, setMeta] = useState<any> (null)
  const [selectedCategory, setSelected] = useState<any>({
    index: -1,
    categoryId: ''
  })
  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['sellerDetails', id],
      queryFn: async () => {
          if(id) {
            let result: Seller = await client.getSellerById(id)
            return result
          }else return null
      }
  })

  const { data: dataCategories, isLoading: isLoadingCategories, isFetching: isFetchingCategories, isError: isErrorCategories }: any =
    useQuery({
        queryKey: ['SellercategoriesData', page, limit, id],
        queryFn: async () => {
            if(id) {
                let filter: PaginationOptionProduct = {page, limit, sellerId: id}
                let result: Pagination<any> = await clientProduct.getAllProductsGroupByCategories(filter)
                return result?.docs
            }else return []
            
        }
    })

    const { data: dataProducts, isLoading: isLoadingProducts, isFetching: isFetchingProducts, isError: isErrorProducts, fetchNextPage }: any =
    useInfiniteQuery({
        queryKey: ['SellerProductsData', page, limit, id, selectedCategory],
        queryFn: async ({ pageParam}: any) => {
            if(id) {
                let filter: PaginationOptionProduct = {page: pageParam, limit: limitProducts, sellerId: id, published_only: 'true', approved: 'true', new: 'false', cancelled: 'false', archived: 'false', sort: 'viewsCount', order: -1, categoryId: selectedCategory?.categoryId}
                let result: Pagination<any> = await clientProduct.getPublishedProducts(filter)
                setMeta({
                    hasNextPage : result?.hasNextPage,
                    hasPrevPage : result?.hasPrevPage,
                    limit : result?.limit,
                    nextPage : result?.nextPage,
                    page : result?.page,
                    pagingCounter : result?.pagingCounter,
                    prevPage : result?.prevPage,
                    totalDocs : result?.totalDocs,
                    totalPages : result?.totalPages
                })
                return result?.docs
            }else return []
            
        },
        initialPageParam: 1,
        getNextPageParam(lastPage: any, allPages: any) {
          return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
        }
    })

    const scrollImages = window.document.querySelector(".menu-tab");
    const leftScroll = () => {
      if(scrollImages)
      scrollImages.scrollBy({
        left: -200,
        behavior: "smooth"
      });
    }
    const rightScroll = () => {
      if(scrollImages) {
        scrollImages.scrollBy({
          left: 200,
          behavior: "smooth"
        });
      }
    }
  return <>
  <PageHeader
  header="Espace vendeur"
  />
    <section className="tf-section authors">
        {data && <div className="themesflat-container">
            <div className="flat-tabs tab-authors">
                <div className="author-profile flex">
                    <div className="feature-profile">
                    <img className="rounded-3xl" src={data.personnalInfo?.image ? `${API_FILE_URL}/icons/${data?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${data.companyInfo.companyName}`} />
                    </div>
                    <div className="infor-profile">
                    <span>Profile vendeur</span>
                    <h2 className="title">{data.companyInfo.companyName}</h2>
                    <p className="content">Actif dépuis le {moment(data.createdAt).format('DD MMMM, YYYY')} | a vendu {data?.soldNumber} articles</p>
                    
                    </div>
                    
                </div>
                <div className="relative">
                    <ul className="relative menu-tab flex">
                        <li className={`tablinks ${selectedCategory?.index === -1 ? 'active': ''}`}
                        onClick={() => {
                            setSelected({
                                index: -1,
                                categoryId: ''
                            })
                            }}
                        >TOUS</li>
                        {dataCategories ? 
                        dataCategories.map((data: any, key: number) => {
                            return <li key={key} 
                            onClick={() => {
                            setSelected({
                                index: key,
                                categoryId: data?.category[0]?._id
                            })
                            }}
                            className={`tablinks  ${key === selectedCategory?.index ? 'active': ''} `}>
                            {data?.category && <span className="uppercase">{data?.category[0]?.label}</span>}</li>
                        })
                        : <></>}
                    </ul>
                    <button type="button" className="w-10 h-10 rounded-full shadow bg-black absolute top-[20px] right-[15px] cursor-pointer scroll-category right-arrow" onClick={rightScroll} />

                <button type="button" className="w-10 h-10 rounded-full shadow bg-black absolute top-[20px] left-[15px] cursor-pointer scroll-category left-arrow" onClick={leftScroll} />
                </div>
            
                <div className="content-tab">
                    {(dataProducts && dataProducts?.pages) ?  <div className="content-inner">
                        <div className="row">
                        {dataProducts.pages.map((page: Array<Product>) => (
                        <>
                        {page.map((product: Product, key: number) => {
                        return <div key={key}  className="col-xl-3 col-lg-4 col-md-6 col-12">
                                <div className="sc-card-product explode ">
                                    <div className="card-media active">
                                    <Link to={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></Link>
                                    
                                    {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
                                    </div>
                                    <div className="card-title mg-bt-16">
                                    <h5 className="sline-clamp-1"><Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h5>
                                    </div>
                                    <div className="meta-info">
                                    <div className="author">
                                        <div className="avatar">
                                        <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${product.slug}`} />
                                        </div>
                                        <div className="info">
                                        <span>Vendeur</span>
                                        <h6> <Link to={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}</Link>  </h6>
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
                        </>))}
                        {meta?.hasNextPage && <div className="col-md-12 wrap-inner load-more text-center">
                            <a href="" 
                            onClick={(e: any) => {
                                e.preventDefault()
                                fetchNextPage()
                            }}
                            className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
                            </div>}
                        </div>
                    </div>: <></>}
                </div>
            </div>
        </div>}
    </section>

    <CartModal/>
  </>;
}

export default SellerPage;
