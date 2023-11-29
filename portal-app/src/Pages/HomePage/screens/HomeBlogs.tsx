import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { Blog, PaginationOptionBlog } from "../../../sdks/blog-v1/utils/DataSchemas";
import { Pagination } from "../../../sdks/GlobalDataSchemas";
import { API_FILE_URL } from "../../../utilities/constants";
import useBlog from "../../../hooks/useBlog";
import HotProductCarousel from "../../../Components/HotProductCarousel/HotProductCarousel";
import { removeUnnecessaryHTMLStuff } from "../../../utilities/helper";
import moment from "moment";
import { Link } from "react-router-dom";

function HomeBlogs() {
  const [allCount, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const { client } = useBlog()

  const { data, isLoading, isFetching, isError }: any =
    useQuery({
        queryKey: ['blogssData', page, limit],
        queryFn: async () => {
            let filter: PaginationOptionBlog = {page, limit, published_only: 'true'}
            let result: Pagination<any> = await client.getPublishedBlogs(filter)
            setCount(result.totalDocs)
            return result?.docs
        }
    })
  return <section className="tf-section live-auctions style4 home5 mobie-style">
  <div className="themesflat-container">
  {(data && data?.length) ?<div className="row">
      <div className="col-md-12">
        <div className="heading-live-auctions">
          <h2 className="tf-title pb-23 text-left">
            Notre actualité</h2>
          {allCount > 5 && <a href="/blogs" className="exp style2">DECOUVRIR PLUS</a>}
        </div>
      </div>
      <div className="col-md-12">
        <div className="swiper-container show-shadow carousel9 pad-t-17 auctions">
        <HotProductCarousel>
        {data.map((blog: Blog, key: number) => {
            return <div key={key} className="sc-card-collection style-2 home2">
            <div className="card-media-h6">
            <Link to={`/blog/${blog._id}`}><img src={`${API_FILE_URL}/blogs/${blog?.image?.path}`} alt={`6tims - tims group | ${blog.slug}`} /></Link>
            </div>
            <div className="card-bottom">
              <div className="author">
                <div className="content">
                    <div className="infor">
                        <span>{moment(blog.createdAt).format('DD MMMM YYYY')}</span>
                        <span className="name"></span>
                    </div>
                    <h4 className="ellips-txt"><Link to={`/blog/${blog._id}`}>{removeUnnecessaryHTMLStuff(blog.title)}</Link></h4>
                </div>
              </div>
              {blog.likes.length > 0 ? <button className="wishlist-button public heart mg-t-6"><span className="number-like"> {blog.likes.length}</span></button> : <></>}
            </div>
          </div> 	
        })}
        </HotProductCarousel>
          
        </div>  
      </div>
    </div>: <></>}
  </div>
</section>;
}

export default HomeBlogs;
