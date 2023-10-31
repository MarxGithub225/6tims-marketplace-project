import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import { Heart, Home } from "react-feather";
import author_db from '../../assets/images/author-db.jpeg'
function ProfilePage() {
  return <>
  <PageHeader/>
   <section className="tf-dashboard tf-tab2">
  <div className="tf-container">
    <div className="row ">
      <div className="col-xl-3 col-lg-12 col-md-12">
        <div className="dashboard-user">
          <div className="dashboard-infor">
            <div className="avatar">
              <img src={author_db} alt="images" />
            </div>
            <div className="name">Francisco Maia</div>
            <div className="pax"><i className="fab fa-ethereum" />0x59485…82590</div>
            <div className="description">
              8,888 NFTs of beautiful, Asian women painstakingly-crafted where even the most intricate
            </div>
          </div>
          <div className="dashboard-filter">
            <div className="menu-item flex items-center gap-x-3">
                <Home/>
                <span>Accueil</span>
            </div>

            <div className="menu-item flex items-center gap-x-3">
                <Heart/>
                <span>Favorites</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
        <div className="dashboard-content inventory content-tab2">
          
          <div className="inner-content history active">
            <h4 className="title-dashboard">History</h4>
            <div className="history-filter">
              <div className="history-content">
                <div className="inner tf-filter-container">
                  <div className="history-details tf-loadmore 3d">
                    <div className="authorr">
                      <div className="avatar">
                        <img src="assets/images/author/history-at1.jpg" alt="images" />
                      </div>
                      <div className="content">
                        <a href="#" className="name">Kayle Jr. Brown</a>
                        <div className="description">started following <a href="#">Grey Peep</a> </div>
                        <div className="date">
                          <span className="time">16:24</span>
                          <span><i className="fas fa-circle" /></span>
                          <span className="month">20/05/2022</span>
                        </div>
                      </div>
                    </div>
                    <div className="category-filter">
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path className="fill-svg" d="M17.9163 14.7012V15.1262C17.9163 15.7429 17.708 16.3346 17.3247 16.8096C17.183 16.9929 16.9497 17.0846 16.708 17.0846H14.4747C14.8163 16.493 14.9997 15.8179 14.9997 15.1262V14.7012C14.9997 13.5012 14.558 12.3931 13.808 11.5514C13.8663 11.5347 13.9163 11.5013 13.9663 11.4763C14.3497 11.2597 14.8247 11.193 15.2747 11.3014C16.8247 11.693 17.9163 13.0845 17.9163 14.7012ZM12.083 2.91797C11.8163 2.91797 11.558 2.94305 11.308 3.00138C12.2997 3.90972 12.9163 5.21797 12.9163 6.66797C12.9163 8.11797 12.2997 9.42622 11.308 10.3346C11.558 10.3929 11.8163 10.418 12.083 10.418C14.1497 10.418 15.833 8.73464 15.833 6.66797C15.833 4.6013 14.1497 2.91797 12.083 2.91797ZM7.91634 2.91797C5.84967 2.91797 4.16634 4.6013 4.16634 6.66797C4.16634 8.73464 5.84967 10.418 7.91634 10.418C9.98301 10.418 11.6663 8.73464 11.6663 6.66797C11.6663 4.6013 9.98301 2.91797 7.91634 2.91797ZM11.108 11.3014C10.958 11.268 10.8163 11.2513 10.6663 11.2513C10.358 11.2513 10.058 11.3263 9.79968 11.4763C9.21635 11.793 8.56634 11.9514 7.91634 11.9514C7.26634 11.9514 6.62468 11.793 6.04968 11.4847C5.77468 11.3347 5.46634 11.2513 5.15801 11.2513C5.02468 11.2513 4.89966 11.268 4.77466 11.293C3.19132 11.6597 2.08301 13.0679 2.08301 14.7012V15.1262C2.08301 15.7429 2.29136 16.3346 2.67469 16.8096C2.81636 16.9929 3.04968 17.0846 3.29135 17.0846H12.5413C12.783 17.0846 13.0163 16.9929 13.158 16.8096C13.5413 16.3346 13.7497 15.7429 13.7497 15.1262V14.7012C13.7497 13.0845 12.658 11.693 11.108 11.3014Z" fill="white" />
                      </svg>
                      Following
                    </div>
                  </div>
                </div>
                <div className="table-btn mt52">
                  <a href="#">Load more</a>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>

  </>;
}

export default ProfilePage;
