/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import TopSellers from "../../GlobalScreens/TopSellers";
import Brands from "../../GlobalScreens/Brands";
import PageHeader from "../../GlobalScreens/PageHeader";

import { useState } from "react";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../sdks/product-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { PaginationOptionCategory, Category2, Category1, Category3 } from "../../sdks/category-v1/utils/DataSchemas";
import { useLocation } from "react-router-dom";

function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterPrice, setFilterPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<any | null>(null)
  const [sortLabel, setSortLabel] = useState<string | null>(null)
  const [meta, setMeta] = useState<any> (null)

  const search = useLocation().search;
  const category2Id = new URLSearchParams(search).get('category2Id');
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(15)
  const { client } = useProduct()
  const { client: clientCategory } = useCategory()

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage}: any =
  useInfiniteQuery({
        queryKey: ['hotProductsData', category2Id, filterPrice, sortBy, limit],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionProduct = {page: pageParam, limit, published_only: 'true'}
            if(category2Id) {
              filter.category2Id = category2Id
            }
            let result: Pagination<any> = await client.getBestProducts(filter)

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
        },
        initialPageParam: 1,
        getNextPageParam(lastPage: any, allPages: any) {
          return lastPage?.length > 0 ? allPages?.length + 1 : undefined;
        },
    })
    
  const { data: categoryData, isLoading: categoryLoading, isFetching: categoryFetching, isError: categoryError }: any =
  useQuery({
      queryKey: ['allCategoryDataList', category2Id],
      queryFn: async () => {
          if(category2Id) {
            let result: Category2 = await clientCategory.getSubCategoryById(category2Id)
            return result
          }else return null
      }
  })
  return <>
  
  <PageHeader/>
  <section className="tf-explore tf-section">
    <div className="themesflat-container">
        <div className="row">
            <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">
                    {categoryData?.label}
                </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                Découvrez les produits nouveaux et tendances
                </p>
            </div>
        </div>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div id="side-bar" className="side-bar style-3">
            {/* <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Status</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Buy Now
                    <input type="checkbox" defaultChecked />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>On Auctions
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Has Offers
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div> */}
            {categoryData?.category && <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Toutes les categories</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">

                  {categoryData?.category?.subCategory2Ids?.map((category: Category2) => {
                    return <>
                    <label>{category.label}
                      <input type="checkbox" />
                      <span className="btn-checkbox" />
                    </label><br />
                    </>
                  })}
                </form>
              </div>
            </div>}
            {categoryData?.category && <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Autres sous categories</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
              <form action="#">

              {categoryData?.category?.subCategory3Ids?.map((category: Category3) => {
                return <>
                <label>{category.label}
                  <input type="checkbox" />
                  <span className="btn-checkbox" />
                </label><br />
                </>
              })}
              </form>
              </div>
            </div>}
            {/* <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">COULEUR</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Ethereum
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Polygon
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Klaytn
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">MARQUES</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Ethereum
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Polygon
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Klaytn
                    <input type="checkbox" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Remise (%)</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Abstraction
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Patternlicious
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Skecthify
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Cartoonism
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Virtuland
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Papercut
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div>
            <div className="widget widget-category">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Apprèciations (%)</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                  <label>Abstraction
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Patternlicious
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Skecthify
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Cartoonism
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label>Virtuland
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                  <label className="mgbt-none">Papercut
                    <input type="radio" />
                    <span className="btn-checkbox" />
                  </label><br />
                </form>
              </div>
            </div> */}
          </div>
        </div>
        {(data && data?.pages) ?  <div className="col-xl-9 col-lg-9 col-md-12">
          <div className="box-epxlore gap-x-[28.575px]">
            {data.pages.map((page: Array<Product>) => (
          <>
          {page.map((product: Product, key: number) => {
                return <div className="sc-card-product explode style2 mg-bt">
              <div className="card-media">
              <a href={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></a>
            {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
              </div>
              <div className="card-title">
                <h5 className="line-clamp-1 w-fit"><a href={`/${product.slug}-${product?._id}.html`}>{product.title}</a></h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                  <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | ${product.slug}`} />
                  </div>
                  <div className="info">
                    <span>Vendeur</span>
                    <h6> <a href={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}</a> </h6>
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
              </div>
            </div>})}
            </>))}
          </div>
          {meta?.hasNextPage && <div className="btn-auction center">
            <a href="#" 
            onClick={(e: any) => {
              e.preventDefault()
              fetchNextPage()
            }}
            className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
          </div>}
        </div>: <></>}
      </div>
    </div>
  </section>
  <TopSellers/>
  <Brands/>
  </>;

}

export default CategoryPage;
