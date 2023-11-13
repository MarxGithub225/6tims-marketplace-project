/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../../sdks/product-v1/utils/DataSchemas";
import { PaginationOptionCategory } from "../../../sdks/category-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../../utilities/constants";
import useProduct from "../../../hooks/useProduct";
import { Product } from "../../../sdks/product-v1/utils/DataSchemas";
import { Category1 } from "../../../sdks/category-v1/utils/DataSchemas";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import Filter from "../../../GlobalScreens/Filter";

function HomeExplore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [allCount, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(8)
  const [filterPrice, setFilterPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<any | null>(null)
  const [sortLabel, setSortLabel] = useState<string | null>(null)
  const { client } = useProduct()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['allBestProductsData', page, limit, selectedCategory, filterPrice, sortBy],
        queryFn: async () => {
            let filter: PaginationOptionProduct = {page, limit, published_only: 'true', approved: 'true', new: 'false', cancelled: 'false', archived: 'false', sort: 'viewsCount', order: -1}
            if(selectedCategory) {
              filter.categoryId = selectedCategory
            }else {
              filter.categoryId = ""
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
            let result: Pagination<any> = await client.getPublishedProducts(filter)
            setCount(result.totalDocs)
            return result?.docs
        }
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
  return <section className="tf-section live-auctions style3 home5 mobie-pb-70 bg-style3">
  <div className="themesflat-container">
  {(data && data?.length) ?  <div className="row">
      <div className="col-md-12">
        <div className="heading-live-auctions mg-bt-24">
          <h2 className="tf-title">
            Tous nos produits</h2>
        </div>
      </div>
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
      {data.map((product: Product, key: number) => {
                return <div key={key} className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div className="sc-card-product">
          <div className="card-media">
            <a href={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></a>
            {product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
          </div>
          <div className="card-title">
            <h5 className="style2 line-clamp-1 w-fit"><a href={`/${product.slug}-${product?._id}.html`}>{product.title}</a></h5>
            {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
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
            <div className="price">
              {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <span className="line-through">{calculatePrice(product).oldPrice } DH</span>}
              <h5> {calculatePrice(product).price} DH</h5>
            </div>
          </div>
          <div className="card-bottom">
            <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button style bag fl-button pri-3"><span>Panier</span></a>
            <a href="activity1.html" className="view-history reload">Voir historique</a>
          </div>
        </div>
      </div>})}
      {allCount > 8 && <div className="col-md-12 wrap-inner load-more text-center">
        <a href="#" id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Load More</span></a>
      </div>}
    </div>: <></>}
  </div>
</section>;
}

export default HomeExplore;