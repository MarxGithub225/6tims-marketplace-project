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
import ExploreProductCard from "../../Components/ExploreProductCard";
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
          <div className="grid grid-cols-2 limitTablet:grid-cols-3 desktop:grid-cols-4 gap-x-[15px] bigTablet:gap-x-[30px] px-[15px] bigTablet:px-[30px]">
          {page.map((product: Product, key: number) => {
                return <ExploreProductCard
                product={product}
                key={key}
              />})}
          </div>
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
