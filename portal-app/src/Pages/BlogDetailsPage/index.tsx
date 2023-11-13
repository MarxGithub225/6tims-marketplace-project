import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

import { BookOpen, Clock, Eye, Heart, MessageCircle, Share, ThumbsUp, Video } from "react-feather";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { PaginationOptionBlog } from "../../sdks/blog-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calcReadingDuration, calculatePrice, formatDuration } from "../../utilities/constants";
import useBlog from "../../hooks/useBlog";
import useCategory from "../../hooks/useCategory";
import { Blog } from "../../sdks/blog-v1/utils/DataSchemas";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import ReactPlayer from "react-player";
import { removeUnnecessaryHTMLStuff } from "../../utilities/helper";
function BlogDetailsPage() {
  const {id} = useParams<any>()
  const { client } = useBlog()
  const [liked, setLiked] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['blogDetails', id],
      queryFn: async () => {
          if(id) {
            let result: Blog = await client.getblogById(id)
            return result
          }else return null
      }
  })

  const { data: recetntsBlogs, isLoading: recentLoading, isFetching: recentFetching, isError: recentError}: any =
  useQuery({
        queryKey: ['recentsBlogsData', limit, id],
        queryFn: async ({ pageParam}: any) => {
            if(id) {
              let filter: PaginationOptionBlog = {page, limit, published_only: 'true'}
              let result: Pagination<any> = await client.getRecentsBlogs(filter, id)

              return result?.docs
            }else return []
        }
    })
  return <>
  <PageHeader/>
  <div className="tf-section post-details">
  <div className="themesflat-container">
    {data && <div className="wrap-flex-box style">
      <div className="post">
        <div className="inner-content">
          <h2 className="title-post">{data.title}</h2>
          <div className="divider" />
          <div className="meta-post flex mg-bt-31">
            <div className="box"/>
            <div className="box left">
              <div className="inner boder pad-r-50">
              </div>
              <div className="inner mg-l-39 mg-r-1">
                <h6 className="desc">DATE</h6>
                <p>{moment(data.createdAt).format('DD MMMM, YYYY')}</p>
              </div>
            </div>
          </div>
          {data?.isVideo? <div className="w-full rounded-lg h-[500px]">
            <ReactPlayer
                  controls
                  url={data?.videoUrl}
                  width="100%"
                  height="100%"
              />

            </div>:
            <div className="image">
            <img src={`${API_FILE_URL}/blogs/${data?.largeImage?.path}`} alt={`6tims - tims group | ${data.slug}`} />
            </div> 
          }
          <div className="mt-3 stats-item flex items-center justify-between">
              <div className="right">
                <span> <Eye size={16} /> {data?.viewsCount} </span>
                <span> <MessageCircle size={16} /> {data?.comments?.length} </span>
                <span> <Clock size={16}/> {data?.isVideo ? 
            <>{formatDuration(Number(data?.videoDuration) + Number(data?.readDuration)*60)}</>: <>{calcReadingDuration(data?.description)} min</>} </span>
              </div>

              <div className="left">
                <span> <Heart size={16} /> {data?.likes?.length} </span>
              </div>
          </div>
          
          <div className="inner-post mg-t-40"
          dangerouslySetInnerHTML={{__html: data.description}}
          /> 
          {/* <div className="sc-widget style-1">
            <div className="widget widget-tag style-2">
              <h4 className="title-widget">Tags</h4>
              <ul>
                <li><a href="#">Bitcoin</a></li>
                <li><a href="#">Token</a></li>
                <li><a href="#">Wallet</a></li>
              </ul>
            </div>
            <div className="widget widget-social style-2">
              <h4 className="title-widget">Share:</h4>
              <ul>
                <li><a href="#" className="icon-fl-facebook" /></li>
                <li className="style-2"><a href="#" className="icon-fl-coolicon" /></li>
                <li className="mgr-none"><a href="#" className="icon-fl-mess" /></li>
              </ul>
            </div>
          </div>     */}
          <div className="divider d2" />
          <div id="comments">
            <h3 className="heading mg-bt-23">
              Leave A Comment
            </h3>
            <form action="https://themesflat.co/html/axiesv/contact/contact-process.php" method="post" id="commentform" className="comment-form">
              <fieldset className="name">
                <input type="text" id="name" placeholder="Name" className="tb-my-input" name="name" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="email">
                <input type="email" id="email" placeholder="Email *" className="tb-my-input" name="email" tabIndex={2}  aria-required="true" required />
              </fieldset>
              <fieldset className="message">
                <textarea id="message" name="message" rows={4} placeholder="Message" tabIndex={4} aria-required="true" required defaultValue={""} />
              </fieldset>
              <div className="btn-submit mg-t-36">
                <CustumButton
                label={"Envoyer"}
                onclick={() => {}}
                backgroundColor="#e73a5d"
                />
              </div>
            </form>
          </div>          
        </div>
      </div>
      <div className="side-bar details">
        <div className="widget widget-recent-post mg-bt-43">
          <h3 className="title-widget mg-bt-23">Recent Post</h3>
          {recetntsBlogs && <ul>

            {recetntsBlogs?.map((blog: Blog, key:number) => {
              return <li className="box-recent-post" key={key} >
              <div className="box-feature"><a href={`/blog/${blog._id}`}><img src={`${API_FILE_URL}/blogs/${blog?.image?.path}`} alt={`6tims - tims group | ${blog.slug}`} /></a></div>
              <div className="box-content">
                <a href={`/blog/${blog._id}`} className="title-recent-post line-clamp-1">{blog.title}</a>
                <span><span className="sub-recent-post">{removeUnnecessaryHTMLStuff(blog.description).substring(0, 20).trimEnd() + '....'}</span><a href="blog.html" className="day-recent-post">{moment(blog.createdAt).format('DD MMMM YYYY')}</a></span>
              </div>
            </li>
            })}
            
            
          </ul>}
        </div>
        {/* <div className="widget widget-tag style-1">
          <h3 className="title-widget mg-bt-23">Popular Tag</h3>
          <ul>
            <li><a href="blog.html" className="box-widget-tag">Bitcoin</a></li>
            <li><a href="blog.html" className="box-widget-tag">NFT</a></li>
            <li><a href="blog.html" className="box-widget-tag">Bids</a></li>
            <li><a href="blog.html" className="box-widget-tag">Digital</a></li>
            <li><a href="blog.html" className="box-widget-tag">Arts</a></li>
            <li><a href="blog.html" className="box-widget-tag">Marketplace</a></li>
            <li><a href="blog.html" className="box-widget-tag">Token</a></li>
            <li><a href="blog.html" className="box-widget-tag">Wallet</a></li>
            <li><a href="blog.html" className="box-widget-tag">Crypto</a></li>
          </ul>
        </div> */}
      </div>
    </div>}
  </div>
</div></>
;
}

export default BlogDetailsPage;
