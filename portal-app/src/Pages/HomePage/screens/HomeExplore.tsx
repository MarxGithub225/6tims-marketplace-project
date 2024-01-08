/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionProduct } from "../../../sdks/product-v1/utils/DataSchemas";
import { PaginationOptionCategory } from "../../../sdks/category-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../../utilities/constants";
import useProduct from "../../../hooks/useProduct";
import { Product } from "../../../sdks/product-v1/utils/DataSchemas";
import { Category1 } from "../../../sdks/category-v1/utils/DataSchemas";
import { File } from "../../../sdks/image-v1/utils/DataSchemas";
import Filter from "../../../GlobalScreens/Filter";
import CartModal from "../../../GlobalScreens/CartModal";
import { useAppDispatch } from "../../../redux/hooks";
import { setProduct } from "../../../redux/features/productSlice";
import { Link } from "react-router-dom";
import { config } from "../../../utilities/helper";
import ExploreProductCard from "../../../Components/ExploreProductCard";

function HomeExplore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [allCount, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(20)
  const [filterPrice, setFilterPrice] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<any | null>(null)
  const [sortLabel, setSortLabel] = useState<string | null>(null)
  const { client } = useProduct()
  const dispatch = useAppDispatch()
  const [meta, setMeta] = useState<any> (null)
  const { data, isLoading, isFetching, isError, fetchNextPage }: any =
  useInfiniteQuery({
        queryKey: ['allBestProductsData', page, limit, selectedCategory, filterPrice, sortBy],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionProduct = {page: pageParam, limit, published_only: 'true', approved: 'true', new: 'false', cancelled: 'false', archived: 'false', sort: 'viewsCount', order: -1}
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
  return <section className="tf-section live-auctions style3 home5 mobie-pb-70 bg-style3 no-mobile-top-padding">
  <div className="themesflat-container">
  {(data && data?.pages) ?  <div className="row">
      <div className="col-md-12">
        <div className="heading-live-auctions mb-[0px] bigTablet:mb-[24px] ">
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
      <>
      {data.pages.map((page: Array<Product>) => (
        <div className="grid grid-cols-2 limitTablet:grid-cols-3 desktop:grid-cols-4 gap-x-[15px] bigTablet:gap-x-[30px] px-[15px] bigTablet:px-[30px]">
          {page.map((product: Product, key: number) => {
                    return <ExploreProductCard
                    product={product}
                    key={key}
                  />})}
        </div>))}
        </>
      {meta?.hasNextPage && <div 
      onClick={(e: any) => {
        e.preventDefault()
        fetchNextPage()
      }}
      className="col-md-12 wrap-inner load-more text-center">
        <a href="#" id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
      </div>}
    </div>: <></>}
  </div>
  <CartModal/>
</section>;
}

export default HomeExplore;
