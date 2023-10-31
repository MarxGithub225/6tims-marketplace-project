import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";

function BlogPage() {
  return <>
    
    <PageHeader/>
    <div className="tf-section sc-card-blog dark-style2">
        <div className="themesflat-container">
        <div className="row">
           {
            [0, 1, 2, 3, 4, 5, 6, 7].map((data: any, key: number) => {
                return  <div key={key} className="fl-blog fl-item2 col-lg-4 col-md-6">
                <article className="sc-card-article">
                    <div className="card-media">
                    <a href="blog-details.html"><img src="assets/images/blog/thumb-1.jpg" alt="" /></a>
                    </div>
                    <div className="meta-info">
                    <div className="author">
                        <div className="info">
                            <span>09 Août 2023</span>
                            <span className="name"></span>
                        </div>
                    </div>
                    <button className="wishlist-button public heart mg-t-6"><span className="number-like"> 100</span></button>
                    </div>
                    <div className="text-article">
                    <h3><a href="blog-details.html">The next big trend in crypto</a></h3>
                    <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut
                        enim reprehenderit cupidatat labore ad laborum consectetur
                        consequat...</p>
                    </div>
                    <a href="blog-details.html" className="sc-button fl-button pri-3"><span>Read More</span></a>
                </article>
                </div>
            })
           }
            
            <div className="col-md-12 wrap-inner load-more text-center mg-t-10">
            <a href="blog.html" id="loadmore" className="sc-button loadmore fl-button pri-3"><span>Load More</span></a>
            </div>
        </div>
        </div>
    </div>

  </>;
}

export default BlogPage;
