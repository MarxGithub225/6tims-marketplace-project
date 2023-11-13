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
      {/* /#page */}
      {/* Modal Popup Bid */}
      <div className="modal fade popup" id="popup_bid_success" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3 className="text-center">Your Bidding
                Successfuly Added</h3>
              <p className="text-center">your bid <span className="price color-popup">(4ETH) </span> has been listing to our database</p>
              <a href="#" className="btn btn-primary"> Watch the listings</a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center">You must bid at least <span className="price color-popup">4.89 ETH</span>
              </p>
              <input type="text" className="form-control" placeholder="00.00 ETH" />
              <p>Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input type="text" className="form-control quantity" defaultValue={1} />
              <div className="hr" />
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
