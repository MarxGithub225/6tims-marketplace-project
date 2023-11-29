import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

import { Clock, Eye, Heart, MessageCircle } from "react-feather";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from '@tanstack/react-query'
import { PaginationOptionBlog } from "../../sdks/blog-v1/utils/DataSchemas";
import { Pagination } from "../../sdks/GlobalDataSchemas";
import { API_FILE_URL, calcReadingDuration, formatDuration } from "../../utilities/constants";
import useBlog from "../../hooks/useBlog";
import { Blog } from "../../sdks/blog-v1/utils/DataSchemas";
import { Link, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import ReactPlayer from "react-player";
import { removeUnnecessaryHTMLStuff } from "../../utilities/helper";
import { AuthContext, AuthStatus } from "../../context/auth";
import { toast, Slide } from "react-toastify";
import { notifyError, notifySuccess } from "../../Components/CustomAlert";
function BlogDetailsPage() {
  let reviewRef: any = useRef(null);
  const [rating, setRating] = useState({
    comment: ''
  });
  const [reload, setReload] = useState<boolean>(false)
  const { signOut, sessionInfo, authStatus, setUserInfo } = useContext(AuthContext)
  const {id} = useParams<any>()
  const { client } = useBlog()
  const [liked, setLiked] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  let search = useLocation().search;
  const { data, isLoading, isFetching, isError }: any =
  useQuery({
      queryKey: ['blogDetails', id, reload],
      queryFn: async () => {
          if(id) {
            let result: Blog = await client.getblogById(id)
            return result
          }else return null
      }
  })

  const { data:dataView }: any =
  useQuery({
      queryKey: ['blogView', id],
      queryFn: async () => {
          if(id) {
            return  await client.viewBlog(id)
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

  useEffect(() => {
    if(authStatus === AuthStatus.SignedIn && id) {
      const isLiked: boolean =  sessionInfo?.userInfo?.blogList?.filter((w: any) => w?._id === id).length ?? false
      setLiked(isLiked)
    }

    if(search) {
      const tag = new URLSearchParams(search).get('tag');

      if (tag && reviewRef) {
        setTimeout(() => {
          reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 500);
      }
    }

  }, [id])

  const upsertMutationLikeProduct = useMutation({
    mutationFn: async () => {
        if(authStatus === AuthStatus.SignedIn && id) {
          return await client?.likeBlog(id)
        }else {
          let errMessage = "Veuillez vous connecter";
          toast.error(
          errMessage,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
    },
    onSuccess: (response: any) => {
        setLiked(!liked)
        const simpleUser = {
          ...sessionInfo?.userInfo,
          blogList: response.blogList
      }
      setReload(!reload)
      setUserInfo(simpleUser)
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
    }
  })

  const upsertMutationCommentProduct = useMutation({
    mutationFn: async () => {
      if(id) {
        return await client?.commentBlog(id, rating)
      }
    },
    onSuccess: (response) => {
      setReload(!reload)
      setRating({
        comment: ''
      })
      notifySuccess({ message: `Votre message a été enregistré !` })
    },
    onError: (e: any) => {
        let error: string = "An error occured, please retry";
        if(e?.errors?.msg?.includes('duplicate')) {
            error = "DUPLICATED_DATA"
        } else error = e?.errors?.msg
        notifyError({ message: error })
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
                <span> <Heart 
                color={`${liked ? '#F4A607': '#1F1F2C'}`}
                className="cursor-pointer"
                onClick={() => {
                  if(authStatus === AuthStatus.SignedIn) {
                    upsertMutationLikeProduct.mutate()
                  }
                }}
                size={16} /> {data?.likes?.length} </span>
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
          <div className="w-[600px]">
            <div id="comments" ref = {reviewRef}>
              <h3 className="heading mg-bt-23">
                Leave A Comment
              </h3>
              <form action="https://themesflat.co/html/axiesv/contact/contact-process.php" method="post" id="commentform" className="comment-form">
                
              <fieldset className="message">
                    <textarea id="message" 
                    value={rating.comment}
                    onChange={e => setRating({...rating, comment: e.target.value})}
                    className="resize-none" name="message" rows={4} placeholder="Message" tabIndex={4} aria-required="true"  />
                    </fieldset>
                <div className="btn-submit mg-t-36">
                {authStatus === AuthStatus.SignedIn ? <CustumButton
                    label={"Envoyer"}
                    disabled={!rating.comment}
                    onclick={() => !upsertMutationCommentProduct.isPending && upsertMutationCommentProduct.mutate()}
                    backgroundColor="#e73a5d"
                    isLoading={upsertMutationCommentProduct.isPending}
                    />: <span className="text-[#e73a5d]" >Veuillez <Link className="font-bold" to={`/login?redirect=true&urlRequest=/blog/${id}&tag=reviewform`}>vous connecter</Link> pour laisser votre commentaire</span> }
                </div>
              </form>
            </div>          
          </div>      

          <div className="divider d2" />
          <div className="w-[600px]">
          <div className="flat-tabs themesflat-tabs" >
                <ul className="menu-tab tab-title">
                <li className={`item-title`}
                 >
                    <span className="inner">Spécifications</span>
                  </li>
                </ul>
                <div className="content-tab">
                  
                  <div className="content-inner tab-content">                                               
                    <ul className="bid-history-list">
                      {data?.comments
                      ?.sort((a: any, b: any) => b?.postedAt - a?.postedAt)
                      ?.map((historic: any, key: number) => {
                        return <li key={key} >
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                <img src={historic?.owner?.image ? `${API_FILE_URL}/icons/${historic?.owner?.image?.path}` : `assets/images/avatar/avt-28.jpg`} alt={`6tims - tims group | historic`} />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                {historic?.owner && <><h6> <>{historic?.owner?.fullName} </></h6> <span> </span></>}
                                </div>
                                <span className="time">{moment(historic?.postedAt).fromNow()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      })
                      }
                      
                    </ul>
                  </div>
                  
                </div>
              </div>
          </div>    
        </div>
      </div>
      <div className="side-bar details">
        <div className="widget widget-recent-post mg-bt-43">
          <h3 className="title-widget mg-bt-23">Recent Post</h3>
          {recetntsBlogs && <ul>

            {recetntsBlogs?.map((blog: Blog, key:number) => {
              return <li className="box-recent-post" key={key} >
              <div className="box-feature"><Link to={`/blog/${blog._id}`}><img src={`${API_FILE_URL}/blogs/${blog?.image?.path}`} alt={`6tims - tims group | ${blog.slug}`} /></Link></div>
              <div className="box-content">
                <Link to={`/blog/${blog._id}`} className="title-recent-post line-clamp-1">{blog.title}</Link>
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
