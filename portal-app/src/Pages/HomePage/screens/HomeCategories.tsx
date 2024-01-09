import { useState } from "react";
import CategoryCarousel from "../../../Components/CategoryCarousel/CategoryCarousel";
import useProduct from "../../../hooks/useProduct";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionCategory } from "../../../sdks/category-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import { Link, useNavigate } from "react-router-dom";

function HomeCategories() {

  const navigate =  useNavigate()
  const scrollImages = window.document.querySelector(".menu-tab");
  const scrollImagesSub = window.document.querySelector(".menu-sub-tab");

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

    const leftScrollSub = () => {
      if(scrollImagesSub)
      scrollImagesSub.scrollBy({
        left: -200,
        behavior: "smooth"
      });
    }
    const rightScrollSub = () => {
      if(scrollImagesSub) {
        scrollImagesSub.scrollBy({
          left: 200,
          behavior: "smooth"
        });
      }
    }
  return <div className="col-md-12">
  {/* <h2 className="tf-title style2 mb-25 text-left">Catégories</h2> */}
  <div className="flat-tabs seller-tab style3 mt-[16px] bigTablet:mt-[40px]">
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
    {(selectedCategory?.data && selectedCategory?.data?.length) ?  <ul className="relative bigTablet:px-[50px] mt-[10px] bigTablet:mt-[60px] menu-sub-tab gap-x-4">
      
          <button type="button" className="w-8 h-8 rounded-full shadow bg-[#E73A5D] absolute top-[0px] right-[15px] cursor-pointer scroll-category-sub shadow-lg right-arrow" onClick={rightScrollSub} />
          <button type="button" className="w-8 h-8 rounded-full shadow bg-[#E73A5D] absolute top-[0px] left-[15px] cursor-pointer scroll-category-sub shadow-lg left-arrow" onClick={leftScrollSub} />
          {selectedCategory?.data?.map((data: any, key: number) => {
            return <li key={key} 
        onClick={() => {
          navigate(`/category?category2Id=${data?.category[0]?._id}`)
        }}
        className={`item-title`}>
        <span className="inner">{data?.category[0]?.label}</span>
        </li>
          })}
    </ul>: <></>}
    <button type="button" className="w-8 h-8 rounded-full shadow bg-black absolute top-[5px] right-[15px] cursor-pointer scroll-category right-arrow" onClick={rightScroll} />

    <button type="button" className="w-8 h-8 rounded-full shadow bg-black absolute top-[5px] left-[15px] cursor-pointer scroll-category left-arrow" onClick={leftScroll} />
  </div> 
</div>;
}

export default HomeCategories;
