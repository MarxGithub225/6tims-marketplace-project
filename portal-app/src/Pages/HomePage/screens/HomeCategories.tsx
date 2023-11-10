import { useState } from "react";
import CategoryCarousel from "../../../Components/CategoryCarousel/CategoryCarousel";
import useProduct from "../../../hooks/useProduct";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionCategory } from "../../../sdks/category-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";

function HomeCategories() {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const { client } = useProduct()
  const [selectedCategory, setSelected] = useState<any>({
    index: 0,
    data: []
  })
  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['categoriesData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionCategory = {page, limit}
            let result: Pagination<any> = await client.getAllProductsGroupByCategories(filter)
            setSelected({
              index: 0,
              data: result?.docs[0]?.data
            })
            return result?.docs
        }
    })
  return <div className="col-md-12">
  <h2 className="tf-title style2 mb-25 text-left">Catégories</h2>
  <div className="flat-tabs seller-tab style3 tablet-30">
    <ul className="menu-tab gap-x-4">
      {data ? 
      data.map((data: any, key: number) => {
        return <li key={key} 
        onClick={() => {
          setSelected({
            index: key,
            data: data?.data
          })
        }}
        className={`item-title ${key === selectedCategory?.index ? 'active': ''} `}>
        {data?.category && <span className="inner">{data?.category[0]?.label}</span>}</li>
      })
      : <></>}
    </ul>
    {(selectedCategory?.data && selectedCategory?.data?.length) ? <div className="content-tab mg-t-24">
      
      <div className="content-inner">
        <div className="swiper-container seller">
          <CategoryCarousel>
          {selectedCategory?.data?.map((data: any, key: number) => {
            return <div className="slider-item" key={key}>										
            <div className="sc-author-box style-2">
              <div className="author-avatar">
                {data?.icon?.length ?
                <img src={`${API_FILE_URL}/categories/${data?.icon[0]?.path}`} alt='' className="avatar" />:
                <img src="assets/images/avatar/avt-1.jpg" alt='' className="avatar" />
                }
              </div>
              <div className="author-infor">
                <h5 className="ellips-txt"><a href="author02.html">{data?.category[0]?.label}</a></h5>
                <span className="price">{data?.count} QTé(s)</span>
              </div>
            </div>    	
          </div>
          })}
          {selectedCategory?.data?.length < 9 ? 
          <>
          {Array((9 - selectedCategory?.data?.length)).fill(undefined).map((v, i) => i + 1).map((data: any, key: number) => {
            return <div className="slider-item" key={key} />
          })}
          </>
          : <></>}
          </CategoryCarousel>
        </div>
      </div>
    </div>: <></>}
  </div> 
</div>;
}

export default HomeCategories;
