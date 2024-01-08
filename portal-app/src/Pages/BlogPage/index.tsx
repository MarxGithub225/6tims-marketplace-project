/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { useState } from "react";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PaginationOptionBlog } from "../../sdks/blog-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import useBlog from "../../hooks/useBlog";
import { Blog } from "../../sdks/blog-v1/utils/DataSchemas";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { PaginationOptionCategory } from "../../sdks/category-v1/utils/DataSchemas";
import moment from "moment";
import { removeUnnecessaryHTMLStuff } from "../../utilities/helper";
import { Link } from "react-router-dom";
function BlogPage() {

    const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(15)
  const { client } = useBlog()
  const [meta, setMeta] = useState<any> (null)
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage}: any =
  useInfiniteQuery({
        queryKey: ['hotAllBlogsData', limit],
        queryFn: async ({ pageParam}: any) => {
            let filter: PaginationOptionBlog = {page: pageParam, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getPublishedBlogs(filter)

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
  return <>
    
    <PageHeader
    header="Nos blogs"
    />
    <div className="tf-section sc-card-blog dark-style2">
        <div className="themesflat-container">
        {(data && data?.pages) ?  <div className="row">
        <>
        {data.pages.map((page: Array<Blog>) => (
          <div className="grid grid-cols-1 size500:grid-cols-2 limitTablet:grid-cols-3 desktop:grid-cols-4 gap-x-[15px] bigTablet:gap-x-[30px] px-[15px] bigTablet:px-[30px]">
           {page.map((blog: Blog, key: number) => {
                return  <div key={key} className="fl-blog fl-item2 w-full">
                <article className="sc-card-article">
                    <div className="card-media">
                    <Link to={`/blog/${blog._id}`}><img src={`${API_FILE_URL}/blogs/${blog?.image?.path}`} alt={`6tims - tims group | ${blog.slug}`} /></Link>
                    </div>
                    <div className="meta-info">
                    <div className="author">
                        <div className="info">
                            <span>{moment(blog.createdAt).format('DD MMMM YYYY')}</span>
                            <span className="name"></span>
                        </div>
                    </div>
                    {blog.likes.length > 0 ? <button className="wishlist-button public heart mg-t-6"><span className="number-like"> {blog.likes.length}</span></button> : <div className="w-[64px] h-[26px] mg-t-6" ></div>}
                    </div>
                    <div className="text-article">
                    <h3 className="ellips-txt"><Link to={`/blog/${blog._id}`}>{removeUnnecessaryHTMLStuff(blog.title)}</Link></h3>
                    <p className="ellips-txt-3">{removeUnnecessaryHTMLStuff(blog.description)}</p>
                    </div>
                    <Link to={`/blog/${blog._id}`} className="sc-button fl-button pri-3"><span>Lire plus</span></Link>
                </article>
                </div>
            })
           }
           </div>
           ))}
           </>
            
           {meta?.hasNextPage && <div className="col-md-12 wrap-inner load-more text-center mg-t-10">
            <a href="" 
            onClick={(e: any) => {
                e.preventDefault()
                fetchNextPage()
              }}
            id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Charger plus</span></a>
            </div>}
        </div>: <></>}
        </div>
    </div>

  </>;
}

export default BlogPage;
