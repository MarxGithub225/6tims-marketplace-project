import { useState } from "react";
import CategoryCarousel from "../../../Components/CategoryCarousel/CategoryCarousel";
import useProduct from "../../../hooks/useProduct";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionCategory } from "../../../sdks/category-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import { Link } from "react-router-dom";

function HomeCategories() {

  const scrollImages = window.document.querySelector(".menu-tab");
  const scrollLength = scrollImages ? scrollImages.scrollWidth - scrollImages.clientWidth : 0;

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
  return <div className="col-md-12">
  {/* <h2 className="tf-title style2 mb-25 text-left">Catégories</h2> */}
  <div className="flat-tabs seller-tab style3 mt-[40px] tablet-30">
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
            return <Link to={`/category?category2Id=${data?.category[0]?._id}`} className="slider-item" key={key}>										
            <div className="sc-author-box style-2">
              <div className="author-avatar">
                {data?.icon?.length ?
                <img src={`${API_FILE_URL}/categories/${data?.icon[0]?.path}`} alt={`6tim - tims group | ${data?.category[0]?.label}`} className="avatar" />:
                <img src="assets/images/avatar/avt-1.jpg" alt={`6tim - tims group | ${data?.category[0]?.label}`} className="avatar" />
                }
              </div>
              <div className="author-infor">
                <h5 className="ellips-txt"><Link to={`/category?category2Id=${data?.category[0]?._id}`}>{data?.category[0]?.label}</Link></h5>
                <span className="price">{data?.count} QTé(s)</span>
              </div>
            </div>    	
          </Link>
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
    <button type="button" className="w-8 h-8 rounded-full shadow bg-black absolute top-[5px] right-[15px] cursor-pointer scroll-category right-arrow" onClick={rightScroll} />

    <button type="button" className="w-8 h-8 rounded-full shadow bg-black absolute top-[5px] left-[15px] cursor-pointer scroll-category left-arrow" onClick={leftScroll} />
  </div> 
</div>;
}

export default HomeCategories;
