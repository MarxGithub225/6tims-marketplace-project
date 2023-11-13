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
function BlogDetailsPage() {
  const {id} = useParams<any>()
  const { client } = useBlog()
  const [liked, setLiked] = useState<boolean>(false)
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
          <ul>
            <li className="box-recent-post">
              <div className="box-feature"><a href="blog-details.html"><img src="assets/images/box-item/icon1-recont-post.jpg" alt="image" /></a></div>
              <div className="box-content">
                <a href="blog-details.html" className="title-recent-post">6 Make Mobile Website Faster</a>
                <span><span className="sub-recent-post">Lorem ipsum dolor sit amer....</span><a href="blog.html" className="day-recent-post">August 10, 2021</a></span>
              </div>
            </li>
            <li className="box-recent-post">
              <div className="box-feature"><a href="blog-details.html"><img src="assets/images/box-item/icon2-recont-post.jpg" alt="image" /></a></div>
              <div className="box-content">
                <a href="blog-details.html" className="title-recent-post">Experts Web Design Tips</a>
                <span><span className="sub-recent-post">Lorem ipsum dolor sit amer....</span><a href="blog.html" className="day-recent-post">August 22, 2021</a></span>
              </div>
            </li>
            <li className="box-recent-post">
              <div className="box-feature"><a href="blog-details.html"><img src="assets/images/box-item/icon3-recont-post.jpg" alt="image" /></a></div>
              <div className="box-content">
                <a href="blog-details.html" className="title-recent-post">Importance Of Web Design</a>
                <span><span className="sub-recent-post">Lorem ipsum dolor sit amer....</span><a href="blog.html" className="day-recent-post">August 20, 2021</a></span>
              </div>
            </li>
            <li className="box-recent-post">
              <div className="box-feature"><a href="blog-details.html"><img src="assets/images/box-item/icon4-recont-post.jpg" alt="image" /></a></div>
              <div className="box-content">
                <a href="blog-details.html" className="title-recent-post">Avoid These Erros In UI Design</a>
                <span><span className="sub-recent-post">Lorem ipsum dolor sit amer....</span><a href="blog.html" className="day-recent-post">August 12, 2021</a></span>
              </div>
            </li>
          </ul>
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
