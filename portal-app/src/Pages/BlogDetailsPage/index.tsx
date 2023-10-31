import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

function BlogDetailsPage() {
  return <>
  <PageHeader/>
  <div className="tf-section post-details">
  <div className="themesflat-container">
    <div className="wrap-flex-box style">
      <div className="post">
        <div className="inner-content">
          <h2 className="title-post">I Believe everyone can be a designer as long they love to create design</h2>
          <div className="divider" />
          <div className="meta-post flex mg-bt-31">
            <div className="box">
              <div className="inner">
                <h6 className="desc">DESIGNER INTERVIEW</h6>
                <p>AUGUST CHAPTER</p>
              </div>
            </div>
            <div className="box left">
              <div className="inner boder pad-r-50">
                <h6 className="desc">WRITER</h6>
                <p>DWINAWAN</p>
              </div>
              <div className="inner mg-l-39 mg-r-1">
                <h6 className="desc">DATE</h6>
                <p>AUGUST 11, 2021</p>
              </div>
            </div>
          </div>
          <div className="image">
            <img src="assets/images/blog/thumb-7.jpg" alt="Image" />
          </div> 
          <div className="inner-post mg-t-40">
            <h3 className="heading mg-bt-16">What is the most fun thing to become a designer?</h3>    
            <p className="mg-bt-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Cupidatat non Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p> 
            <div className="image-box">
              <img src="assets/images/blog/thumb1_details.jpg" alt="Image" />
              <img src="assets/images/blog/thumb2_details.jpg" alt="Image" />
            </div>
          </div>   
          <div className="inner-post mg-t-22">
            <h3 className="heading mg-bt-16">How is your daily routine?</h3>    
            <p className="mg-bt-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p> 
            <div className="image">
              <img src="assets/images/blog/thumb-6.jpg" alt="Image" />
            </div>
          </div>       
          <div className="inner-post mg-t-24">
            <h3 className="heading mg-bt-16">Middle Post Heading</h3>    
            <p>Middle Post Heading</p>
            <p> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            </p> 
            <p className="mg-bt-22">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>                                   
          </div>
          <div className="sc-widget style-1">
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
          </div>    
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
        <div className="widget widget-tag style-1">
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
        </div>
      </div>
    </div>
  </div>
</div></>
;
}

export default BlogDetailsPage;
