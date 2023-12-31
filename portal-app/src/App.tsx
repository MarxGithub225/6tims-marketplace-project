/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from 'react';
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
import { useAppDispatch } from './redux/hooks';
import { getCart } from './redux/features/cartSlice';
import AuthProvider from "./context/auth";
import TermsAndConditions from './GlobalScreens/Footer/pages/TermsAndConditions';
import TermsOfSale from './GlobalScreens/Footer/pages/TermsOfSale';
import Cookies from './GlobalScreens/Footer/pages/Cookies';
import ShippingAndReturns from './GlobalScreens/Footer/pages/ShippingAndReturns';
import Faq from './GlobalScreens/Footer/pages/Faq';
import ContactUs from './GlobalScreens/Footer/pages/ContactUs';
import FavoritePage from './Pages/FavoritePage';
import ForgotPassPage from './Pages/Auth/ForgotPass';
function App() {
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()
  const headerRef: any = useRef(null)

  useEffect(() => {
    dispatch(getCart())
    if (headerRef) {
      headerRef?.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])
  
  return <AuthProvider>
    <div id="wrapper" ref={headerRef} >
      <div id="page" className="clearfix">
        <Header />
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
          < Route path={'/forgot-pass'} element={ <ForgotPassPage /> } />
          < Route path={'/registration'} element={ <RegisterPage /> } />
          < Route path={'/profile/*'} element={ <ProfilePage /> } />
          < Route path={'/favorites/*'} element={ <FavoritePage /> } />
          < Route path={'/terms-and-conditions'} element={ <TermsAndConditions /> } />
          < Route path={'/terms-of-sale'} element={ <TermsOfSale /> } />
          < Route path={'/cookies'} element={ <Cookies /> } />
          < Route path={'/shipping-and-returns'} element={ <ShippingAndReturns /> } />
          < Route path={'/faq'} element={ <Faq /> } />
          < Route path={'/contact-us'} element={ <ContactUs /> } />
        </Routes>
        
        <Footer/>
      </div>
     
    </div>

    </AuthProvider>;
}

export default App;
