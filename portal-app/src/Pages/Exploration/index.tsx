/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Filter from "../../GlobalScreens/Filter";
import PageHeader from "../../GlobalScreens/PageHeader";
import { useState } from "react";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../sdks/product-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { PaginationOptionCategory } from "../../sdks/category-v1/utils/DataSchemas";
import { Link } from "react-router-dom";
import { config } from "../../utilities/helper";
function Exploration() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filterPrice, setFilterPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<any | null>(null)
  const [sortLabel, setSortLabel] = useState<string | null>(null)

  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(20)
  const { client } = useProduct()
  const [meta, setMeta] = useState<any> (null)
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage}: any =
  useInfiniteQuery({
        queryKey: ['hotProductsData', selectedCategory, filterPrice, sortBy, limit],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionProduct = {page: pageParam, limit, published_only: 'true'}
            if(selectedCategory) {
              filter.categoryId = selectedCategory
            }


            if(sortBy) {
              filter.sort = sortBy
              filter.order = -1
            }

            if(filterPrice) {
              if(filterPrice === 'asc') {
               filter.sort = (sortBy && sortBy === 'isPromoted') ? 'promoCost' : 'cost'
               filter.order = 1
              }else {
               filter.sort = (sortBy && sortBy === 'isPromoted') ? 'promoCost' : 'cost'
               filter.order = -1
              }
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
        queryKey: ['allCategoryDataList', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionCategory = {page, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getAllProductsGroupByCategories(filter)
            return result?.docs
        }
    })

  return <>
  
  <PageHeader
  header="Nos produits chauds"
  />
  <section className="tf-auction tf-section">
    <div className="themesflat-container">
    {(data && data?.pages) ?  <div className="row">
        
        <div className="col-md-12">
        <Filter 
        categories = {categoryData ?? []}

        selectedCategory = {selectedCategory}
        setSelectedCategory = {(categoryId: string | null) => setSelectedCategory(categoryId)}

        filterPrice = {filterPrice}
        setFilterPrice = {(status: string) => setFilterPrice(status)}

        sortBy = {sortBy}
        setSortBy = {(sort: string) => setSortBy(sort)}

        sortLabel = {sortLabel}
        setSortLabel = {(label: string) => setSortLabel(label)}
        />
        </div>
        <>
        {data.pages.map((page: Array<Product>) => (
          <>
          {page.map((product: Product, key: number) => {
                return <div key={key} className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="sc-card-product">
          <div className="card-media">
            <Link to={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></Link>
            {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
          </div>
          <div className="card-title">
            <h5 className="style2 truncate w-fit"><Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h5>
            {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
              <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${product.slug}`} />
              </div>
              <div className="info">
                <span>Vendeur</span>
                <h6> <Link to={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}</Link> </h6>
              </div>
            </div>
            <div className="price">
              {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <span className="line-through">{calculatePrice(product).oldPrice } DH</span>}
              <h5> {calculatePrice(product).price} DH</h5>
            </div>
          </div>product-activity/:id
          <div className="card-bottom">
            <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style bag fl-button pri-3"><span>Panier</span></a>
            <Link to={`/product-activity/${product._id}`} className="view-history reload">Voir historique</Link>
          </div>
        </div>
      </div>})}
          </>
        ))}
        </>
        

      {meta?.hasNextPage && <div className="col-12">
          <div className="btn-auction center">
            <a href=""
            onClick={(e: any) => {
              e.preventDefault()
              fetchNextPage()
            }}
            id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
          </div>
        </div>}
      </div>: <></>}
    </div>
  </section>
</>

}

export default Exploration;
