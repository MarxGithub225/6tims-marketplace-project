import React from "react";
import Brands from "../../GlobalScreens/Brands";
import TopSellers from "../../GlobalScreens/TopSellers";
import HomeBanners from "./screens/HomeBanners";
import HomeBlogs from "./screens/HomeBlogs";
import HomeCategories from "./screens/HomeCategories";
import HomeExplore from "./screens/HomeExplore";
import HomeFeatures from "./screens/HomeFeatures";
import HomeHotProducts from "./screens/HomeHotProducts";

function HomePage() {
  return <div style={{pointerEvents: 'none'}}>
   <section className="flat-cart_item home6 style2" >
      <div className="overlay" />
      <div className="themesflat-container">
        <div className="row">
          <HomeCategories/>
          <HomeBanners/>
        </div>
      </div>
    </section>
    <HomeFeatures/>
    <HomeHotProducts/>
    <TopSellers/>
    <HomeExplore/>
    <HomeBlogs/>
    <Brands/>
  </div>;
}

export default HomePage;
