/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Header from './GlobalScreens/Header';
import Footer from './GlobalScreens/Footer';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import DetailsPage from './Pages/DetailsPage';
import Exploration from './Pages/Exploration';
import SearchPage from './Pages/SearchPage';
import CategoryPage from './Pages/CategoryPage';
import BlogPage from './Pages/BlogPage';
import BlogDetailsPage from './Pages/BlogDetailsPage';
import SellersPage from './Pages/SellersPage';
import SellerPage from './Pages/SellerPage';
import ProductHistorical from './Pages/ProductHistorical';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import ProfilePage from './Pages/Account';
function App() {


  let public_routes = [

  ]
  
  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        <Header/>
        <Routes>
          < Route path={'/*'} element={ <HomePage /> } />
          < Route path={'/:slug'} element={ <DetailsPage /> } />
          < Route path={'/hot-exploration'} element={ <Exploration /> } />
          < Route path={'/search/*'} element={ <SearchPage /> } />
          {/* GET CATEGORYS WITH QUERIES PARAMS */}
          < Route path={'/category/*'} element={ <CategoryPage /> } /> 
          < Route path={'/blogs'} element={ <BlogPage /> } />
          < Route path={'/blog/:id'} element={ <BlogDetailsPage /> } />
          < Route path={'/sellers'} element={ <SellersPage /> } />
          < Route path={'/seller/:id'} element={ <SellerPage /> } />
          < Route path={'/partner/:id'} element={ <SellerPage /> } />
          < Route path={'/product-activity/:id'} element={ <ProductHistorical /> } />
          < Route path={'/cart'} element={ <CartPage /> } />
          < Route path={'/checkout'} element={ <CheckoutPage /> } />

          < Route path={'/login'} element={ <LoginPage /> } />
          < Route path={'/registration'} element={ <RegisterPage /> } />
          < Route path={'/profile/*'} element={ <ProfilePage /> } />
        </Routes>
        
        <Footer/>
      </div>
     
    </div>

  );
}

export default App;
