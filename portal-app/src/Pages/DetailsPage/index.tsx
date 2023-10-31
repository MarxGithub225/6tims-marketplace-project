/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Related from "./screens/Related";
import Brands from "../../GlobalScreens/Brands";
import TopSellers from "../../GlobalScreens/TopSellers";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";

function DetailsPage() {
  return <>
  <PageHeader/>
  
  {/* tf item details */}
  <div className="tf-section tf-item-details">
    <div className="themesflat-container">
      <div className="row">
        <div className="col-xl-6 col-md-12">
          <div className="content-left">
            <div className="media">
              <img src="assets/images/box-item/images-item-details.jpg" alt ="" />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="content-right">
            <div className="sc-item-details">
              <h2 className="style2">“The Fantasy Flower illustration ”</h2>
              <div className="meta-item">
                <div className="left">
                  <span className="viewed eye">225</span>
                  <span className="liked heart wishlist-button mg-l-8"><span className="number-like">100</span></span>
                </div>
                <div className="right">
                  <a href="#" className="share" />
                  <a className="option" />
                </div>
              </div>
              <div className="client-infor sc-card-product">
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src="assets/images/avatar/avt-8.jpg" alt ="" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6> <a href="author02.html">Ralph Garraway</a> </h6>
                    </div>
                  </div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src="assets/images/avatar/avt-2.jpg" alt ="" />
                    </div>
                    <div className="info">
                      <span>Create By</span>
                      <h6> <a href="author02.html">Freddie Carpenter</a> </h6>
                    </div>
                  </div>
                </div>
              </div>
              <p>Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget.
                Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada.
                Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget.
                Facilisi lobortisal morbi fringilla urna amet sed ipsum</p>
              <div className="meta-item-details style2">
                <div className="item meta-price">
                  <span className="heading">Current Bid</span>
                  <div className="price">
                    <div className="price-box">
                      <h5> 4.89 ETH</h5>
                      <span>= $12.246</span>
                    </div>
                  </div>
                </div>
                <div className="item count-down">
                  <span className="heading style-2">Countdown</span>
                  <span className="js-countdown" data-timer={416400} data-labels=" :  ,  : , : , " />
                </div>
              </div>
              <a href="#" data-toggle="modal" data-target="#popup_bid" className="sc-button loadmore style bag fl-button pri-3"><span>Place a bid</span></a>
              <div className="flat-tabs themesflat-tabs">
                <ul className="menu-tab tab-title">
                 <li className="item-title active">
                    <span className="inner">Spécifications</span>
                  </li>
                  <li className="item-title ">
                    <span className="inner">Historique de vente</span>
                  </li>
                  <li className="item-title">
                    <span className="inner">Notes et Avis</span>
                  </li>
                  
                </ul>
                <div className="content-tab">
                  <div className="content-inner tab-content">
                    <ul className="bid-history-list">
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-3.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6><a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-11.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span>bid accepted</span>
                                </div>
                                <span className="time">at 06/10/2021, 3:20 AM</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-1.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-5.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-7.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-8.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <div className="price">
                            <h5> 4.89 ETH</h5>
                            <span>= $12.246</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="content-inner tab-content">                                               
                    <ul className="bid-history-list">
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <a href="#">
                                  <img src="assets/images/avatar/avt-3.jpg" alt="" className="avatar" />
                                </a>
                                <div className="badge" />
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="content-inner tab-content">
                    <div className="provenance">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post">
            <div className="inner-content">
                <div className="divider" />
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
                <div className="w-[800px]">
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
                    <textarea id="message" name="message" rows={4} placeholder="Message" tabIndex={4} aria-required="true"  />
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
        </div>
    </div>
  </div>
  {/* /tf item details */};
  <Related/>
  <TopSellers/>
  <Brands/>
</>

}

export default DetailsPage;
