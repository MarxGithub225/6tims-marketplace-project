/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import TopSellers from "../../GlobalScreens/TopSellers";
import Brands from "../../GlobalScreens/Brands";
import PageHeader from "../../GlobalScreens/PageHeader";

import { useState } from "react";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../sdks/product-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { PaginationOptionCategory, Category1 } from "../../sdks/category-v1/utils/DataSchemas";
import { useLocation } from "react-router-dom";
import ExpendedProductCard from "../../Components/ExpendedProductCard";

function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterPrice, setFilterPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<any | null>(null)
  const [sortLabel, setSortLabel] = useState<string | null>(null)
  const [meta, setMeta] = useState<any> (null)

  const search = useLocation().search;
  const q = new URLSearchParams(search).get('q');
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(15)
  const { client } = useProduct()
  const { client: clientCategory } = useCategory()

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage}: any =
  useInfiniteQuery({
        queryKey: ['hotSearchProductsData', q, filterPrice, sortBy, limit, selectedCategory],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionProduct = {page: pageParam, limit, published_only: 'true'}
            if(q) {
              filter.filter = q
              filter.fields = 'title'
            }

            if(selectedCategory) {
              filter.categoryId = selectedCategory
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
      queryKey: ['allCategoryDataList', q],
      queryFn: async () => {
          if(q) {
            let filter: PaginationOptionCategory = {page, limit, published_only: 'true'}
            let result:  Pagination<Category1> = await clientCategory.getAllPublishedCategories(filter)
            return result.docs
          }else return null
      }
  })
  return <>
  
  <PageHeader
  header="Vos recherches"
  />
  <section className="tf-explore tf-section">
    <div className="themesflat-container">
        {data && <div className="row">
            <div className="col-12">
                <h2 className="tf-title-heading ct style-2 mg-bt-13">
                  {meta?.totalDocs} resultats trouvé(s) pour <small><i>`{q}`</i></small>
                </h2>
                <p className="sub-title ct small mg-bt-20 pad-420">
                Découvrez les produits nouveaux et tendances
                </p>
            </div>
        </div>}
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
            {categoryData && <div className="widget widget-category mgbt-24 boder-bt">
              <div className="title-wg-category">
                <h4 className="title-widget style-2">Toutes les categories</h4>
                <i className="icon-fl-down-2" />
              </div>
              <div className="content-wg-category">
                <form action="#">
                    <label onClick={() => setSelectedCategory(null)} >Tous
                      <input type="checkbox" checked={selectedCategory === null} />
                      <span className="btn-checkbox" />
                    </label><br />
                  {categoryData?.map((category: Category1) => {
                    return <>
                        <label onClick={() => setSelectedCategory(category._id)} >{category.label}
                      <input type="checkbox" checked={selectedCategory === category._id} />
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
        {data.pages.map((page: Array<Product>) => (
              <div className="grid grid-cols-2 limitTablet:grid-cols-3 gap-x-[15px] bigTablet:gap-x-[30px]">
              {page.map((product: Product, key: number) => {
                    return <ExpendedProductCard
                    key={key}
                    product={product}
                    />})}
              </div>))}
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

export default SearchPage;
