/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useRef, useState } from "react";
import $ from 'jquery'
import {ReactComponent as EnIcon} from '../../assets/icons/langs/EnIcon.svg'
import {ReactComponent as FrIcon} from '../../assets/icons/langs/FrIcon.svg'
import logo  from '../../assets/images/tims_logo_oficiel.png'
import logoWhite  from '../../assets/images/tims_logo_white.png'
import avatar  from '../../assets/images/avt-1.jpg'
import { ShoppingBag, ShoppingCart, User, UserPlus } from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutSide from "../../utils/onClickOutSide";
import { AuthContext, AuthStatus } from "../../context/auth";
import { API_FILE_URL } from "../../utilities/constants";
import { useMutation } from "@tanstack/react-query";
function Header() {
  const { authStatus, sessionInfo, signOut } = useContext(AuthContext)
  const profileRef = useRef<any>(null)
  const searchRef = useRef<any>(null)
  const cart = useSelector((state: RootState) => state.cart.cart)
  const [showProfileOptions, setShowProfileOptions] = useState<boolean>(false)
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false)
  const navigate = useNavigate()
  const changeTheme = (theme: string) => {
      if(theme === 'dark') {
        $(".body").addClass("is_dark")
        $(".light").removeClass("is_active")
        $(".dark").addClass("is_active")

        $(".tf-text").removeClass("style")
        $(".tf-text").addClass("s1")
        
        let logoHeader: any = document.getElementById("logo_header");
        let logoFooter: any = document.getElementById("logo_footer");
        let moonDark: any = document.getElementById("moon_dark");

        if(logoHeader){
            logoHeader.src = logoWhite;
        }
        if(logoFooter){
          logoFooter.src = logoWhite;
        }
        if(moonDark){
            moonDark.src = "assets/images/icon/moon-2.png";
        }
      }else {
        $(".body").removeClass("is_dark")
        $(".light").addClass("is_active")
        $(".dark").removeClass("is_active")

        $(".tf-text").addClass("style")
        $(".tf-text").removeClass("s1")

        let logoHeader: any = document.getElementById("logo_header");
        let logoFooter: any = document.getElementById("logo_footer");
        let moonDark: any = document.getElementById("moon_dark");

        if(logoHeader){
          logoHeader.src = logo;
        }
        if(logoFooter){
          logoFooter.src = logo;
        }
        if(moonDark){
            moonDark.src = "assets/images/icon/moon.png";
        }
      }
  }
  useOnClickOutSide(profileRef, () => setShowProfileOptions(false))
  useOnClickOutSide(searchRef, () => setShowSearchForm(false))
  const mutationLogout: any = useMutation({
    mutationFn: async () => {
      return await signOut();
    },
    onSuccess: (response) => {
      navigate('/')
    },
  });

  const [pageScrolled, setPageScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.document.documentElement.scrollTop > 50) {
        setPageScrolled(true);
      } else {
        setPageScrolled(false);
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header id="header_main" className={`header_1 header_2 style2 js-header ${pageScrolled ? 'is-fixed is-small': ''} `}>
  <div className="themesflat-container">
    <div className="row">
      <div className="col-md-12">                              
        <div id="site-header-inner"> 
          <div className="wrap-box flex">
            <div id="site-logo" className="clearfix">
              <div id="site-logo-inner">
                <Link to="/" rel="home" className="main-logo">
                  <img id="logo_header" src={logo} alt="nft-gaming" width={133} height={56} data-retina="assets/images/logo/logo_dark@2x.png" data-width={133} data-height={56} />
                </Link>
              </div>
            </div>
            <div className="mobile-button"><span /></div>{/* /.mobile-button */}
            
            <nav id="main-nav" className="main-nav hidden intermWidth:block ">
              <ul id="menu-primary-menu" className="menu">
                <li className="menu-item">
                  <Link to="/profile/orders">Suivi de commande</Link>
                </li>
                <li className="menu-item">
                  <Link to="/faq">Aide</Link>
                </li>
                <li className="menu-item">
                  <Link to="/contact-us">Nos contacts</Link>
                </li>
                {/* <li className="menu-item menu-item-has-children">
                  <Link to="#" className='flex items-center'><FrIcon width={19} className="mr-1"/> <span>Français</span></Link>
                  <ul className="sub-menu">
                    <li className="menu-item"><a href="#" className='flex items-center'><FrIcon width={19} className="mr-1"/> <span>Français</span></a></li>
                    <li className="menu-item"><a href="#" className='flex items-center'><EnIcon width={19} className="mr-1"/> <span>Français</span></a></li>
                  </ul>
                </li> */}
              </ul>
            </nav>{/* /#main-nav */}   
            
            <div className="flat-search-btn flex">
              <div className="sc-btn-top mr-5" id="site-header">
                <a href="https://seller.6tims.com" rel="noreferrer" target="_blank" id="connectbtn" className="sc-button header-slider style style-1 wallet fl-button pri-1"><span>Vendre sur 6tims
                  </span></a>
              </div>
              <div className="header-search flat-show-search" id="s1" ref={searchRef} >
                <a href="#" className="show-search header-search-trigger"
                onClick={(e: any) => {
                  e.preventDefault()
                  setShowSearchForm(!showSearchForm)
                }}
                >
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_334_638" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={1} y={1} width={18} height={17}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.66699 1.66666H17.6862V17.3322H1.66699V1.66666Z" fill="#f7a700" stroke="#f7a700" />
                    </mask>
                    <g mask="url(#mask0_334_638)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.67711 2.87312C5.9406 2.87312 2.90072 5.84505 2.90072 9.49903C2.90072 13.153 5.9406 16.1257 9.67711 16.1257C13.4128 16.1257 16.4527 13.153 16.4527 9.49903C16.4527 5.84505 13.4128 2.87312 9.67711 2.87312ZM9.67709 17.3322C5.26039 17.3322 1.66699 13.8182 1.66699 9.49902C1.66699 5.17988 5.26039 1.66666 9.67709 1.66666C14.0938 1.66666 17.6864 5.17988 17.6864 9.49902C17.6864 13.8182 14.0938 17.3322 9.67709 17.3322Z" fill="#f7a700" />
                      <path d="M9.67711 2.37312C5.67512 2.37312 2.40072 5.55836 2.40072 9.49903H3.40072C3.40072 6.13174 6.20607 3.37312 9.67711 3.37312V2.37312ZM2.40072 9.49903C2.40072 13.4396 5.67504 16.6257 9.67711 16.6257V15.6257C6.20615 15.6257 3.40072 12.8664 3.40072 9.49903H2.40072ZM9.67711 16.6257C13.6784 16.6257 16.9527 13.4396 16.9527 9.49903H15.9527C15.9527 12.8664 13.1472 15.6257 9.67711 15.6257V16.6257ZM16.9527 9.49903C16.9527 5.5584 13.6783 2.37312 9.67711 2.37312V3.37312C13.1473 3.37312 15.9527 6.1317 15.9527 9.49903H16.9527ZM9.67709 16.8322C5.52595 16.8322 2.16699 13.5316 2.16699 9.49902H1.16699C1.16699 14.1048 4.99484 17.8322 9.67709 17.8322V16.8322ZM2.16699 9.49902C2.16699 5.46656 5.52588 2.16666 9.67709 2.16666V1.16666C4.9949 1.16666 1.16699 4.8932 1.16699 9.49902H2.16699ZM9.67709 2.16666C13.8282 2.16666 17.1864 5.46649 17.1864 9.49902H18.1864C18.1864 4.89327 14.3593 1.16666 9.67709 1.16666V2.16666ZM17.1864 9.49902C17.1864 13.5316 13.8282 16.8322 9.67709 16.8322V17.8322C14.3594 17.8322 18.1864 14.1047 18.1864 9.49902H17.1864Z" fill="#f7a700" />
                    </g>
                    <mask id="mask1_334_638" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={13} y={13} width={6} height={6}>
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.2012 14.2999H18.3333V18.3333H14.2012V14.2999Z" fill="#f7a700" stroke="#f7a700" />
                    </mask>
                    <g mask="url(#mask1_334_638)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.7166 18.3333C17.5596 18.3333 17.4016 18.2746 17.2807 18.1572L14.3823 15.3308C14.1413 15.0952 14.1405 14.7131 14.3815 14.4774C14.6217 14.2402 15.0123 14.2418 15.2541 14.4758L18.1526 17.303C18.3935 17.5387 18.3944 17.9199 18.1534 18.1556C18.0333 18.2746 17.8746 18.3333 17.7166 18.3333Z" fill="#f7a700" />
                      <path d="M17.7166 18.3333C17.5595 18.3333 17.4016 18.2746 17.2807 18.1572L14.3823 15.3308C14.1413 15.0952 14.1405 14.7131 14.3815 14.4774C14.6217 14.2402 15.0123 14.2418 15.2541 14.4758L18.1526 17.303C18.3935 17.5387 18.3944 17.9199 18.1534 18.1556C18.0333 18.2746 17.8746 18.3333 17.7166 18.3333" stroke="#f7a700" />
                    </g>
                  </svg>
                </a>
                {showSearchForm && <div className="top-search show">
                  <form action="/search" method="get" role="search" className="search-form">
                    <input type="search" id="q" className="search-field" placeholder="Recherche..." name="q" title="Recherche pour" required />
                    <button className="search search-submit" type="submit" title="Recherche">
                      <i className="icon-fl-search-filled" />
                    </button>
                  </form>
                </div>}
              </div>

              {(cart && cart.length) ?<div className="header-search flat-show-search">
                <Link to={'/cart'} className="show-search header-search-trigger text-white relative">
                  <ShoppingCart color="#f7a700" />

                  <div className="absolute flex items-center font-bold text-[#fff] justify-center -top-3 -right-3 w-7 h-7 rounded-full bg-[#e73a5d]">
                    {cart.length < 10 ? cart.length : '+9'}
                  </div>
                </Link>
                
              </div>: <></>}
              
              <div className="admin_active" id="header_admin">
                <div className="header_avatar">
                  <div className="popup-user" ref={profileRef}
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  >
                    <img className="avatar" src={avatar} alt="avatar" />
                    {/* {authStatus === AuthStatus.SignedIn && <img className="w-[40px] h-[40px] rounded-[10px] "  src={`${API_FILE_URL}/icons/${sessionInfo?.userInfo?.image?.path}`} alt={`6tims | Tim's group - ${sessionInfo?.userInfo?.fullName}`} />} */}
                    {showProfileOptions && <div className="avatar_popup mt-20">
                    {authStatus === AuthStatus.SignedIn && <h4>{sessionInfo?.userInfo?.fullName}</h4>}
                      
                    {authStatus === AuthStatus.SignedIn && <div className="d-flex align-items-center justify-content-between mg-t-5 mg-bt-17">
                        <p> {sessionInfo?.userInfo?.email}</p>
                        
                      </div>}
                      {authStatus === AuthStatus.SignedIn && <div className="divider" />}
                      {authStatus === AuthStatus.SignedIn && <div className="hr" />}
                      <div className={`links ${authStatus === AuthStatus.SignedIn ? 'mt-20': ''}`}>
                        {authStatus === AuthStatus.SignedIn && <Link to="/profile">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z" fill="#1E293B" />
                          </svg>
                          <span>Mon profile</span>
                        </Link>}
                        {authStatus === AuthStatus.SignedIn && <Link className="mt-10" to="/profile/orders">
                          <svg width={20} height={18} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.1154 0.730469H2.88461C1.29402 0.730469 0 2.02449 0 3.61508V14.3843C0 15.9749 1.29402 17.2689 2.88461 17.2689H17.1154C18.706 17.2689 20 15.9749 20 14.3843V3.61508C20 2.02449 18.706 0.730469 17.1154 0.730469ZM18.7529 10.6035H14.6154C13.6611 10.6035 13 9.95407 13 8.99969C13 8.04532 13.661 7.34544 14.6154 7.34544H18.7529V10.6035ZM18.7529 6.11508H14.6154C13.0248 6.11508 11.7308 7.40911 11.7308 8.99969C11.7308 10.5903 13.0248 11.8843 14.6154 11.8843H18.7529V14.3843C18.7529 15.3386 18.0698 15.9996 17.1154 15.9996H2.88461C1.93027 15.9996 1.29231 15.3387 1.29231 14.3843V3.61508C1.29231 2.66074 1.93023 1.99963 2.88461 1.99963H17.1266C18.0809 1.99963 18.7529 2.6607 18.7529 3.61508V6.11508Z" fill="#1E293B" />
                          </svg>
                          <span>Mes commandes</span>
                        </Link>}
                        {authStatus === AuthStatus.SignedIn && <a 
                        onClick={(e: any) => {
                          e.preventDefault();
                          !mutationLogout.isLoading && mutationLogout.mutate()
                        }}
                        className="mt-10" href="/" id="logout">
                          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9668 18.3057H2.49168C2.0332 18.3057 1.66113 17.9335 1.66113 17.4751V2.52492C1.66113 2.06644 2.03324 1.69437 2.49168 1.69437H9.9668C10.4261 1.69437 10.7973 1.32312 10.7973 0.863828C10.7973 0.404531 10.4261 0.0332031 9.9668 0.0332031H2.49168C1.11793 0.0332031 0 1.15117 0 2.52492V17.4751C0 18.8488 1.11793 19.9668 2.49168 19.9668H9.9668C10.4261 19.9668 10.7973 19.5955 10.7973 19.1362C10.7973 18.6769 10.4261 18.3057 9.9668 18.3057Z" fill="#1E293B" />
                            <path d="M19.7525 9.40904L14.7027 4.42564C14.3771 4.10337 13.8505 4.10755 13.5282 4.43396C13.206 4.76036 13.2093 5.28611 13.5366 5.60837L17.1454 9.16982H7.47508C7.01578 9.16982 6.64453 9.54107 6.64453 10.0004C6.64453 10.4597 7.01578 10.8309 7.47508 10.8309H17.1454L13.5366 14.3924C13.2093 14.7147 13.2068 15.2404 13.5282 15.5668C13.691 15.7313 13.9053 15.8143 14.1196 15.8143C14.3306 15.8143 14.5415 15.7346 14.7027 15.5751L19.7525 10.5917C19.9103 10.4356 20 10.2229 20 10.0003C20 9.77783 19.9111 9.56603 19.7525 9.40904Z" fill="#1E293B" />
                          </svg>
                          <span>Se déconnecter</span>
                        </a>}
                        {authStatus === AuthStatus.SignedOut && <a className="" href="/login" id="logout">
                          <User className="text-[#1E293B]" />
                          <span>Se connecter</span>
                        </a>}
                        {authStatus === AuthStatus.SignedOut && <a className="mt-10" href="/registration" id="logout">
                          <UserPlus className="text-[#1E293B]" />
                          <span>S'inscrire</span>
                        </a>}
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </div>

          </div> 
        </div>
      </div>
    </div>
  </div>
  {/* <div className="mode_switcher">
    <a href="#"
    onClick={(e: any) => {
      e.preventDefault()
      changeTheme('light')
    }}
    className="light d-flex align-items-center is_active">
      <img src="assets/images/icon/sun.png" alt='' />
    </a>
    <a href="#"
    onClick={(e: any) => {
      e.preventDefault()
      changeTheme('dark')
    }}
    className="dark d-flex align-items-center">
      <img id="moon_dark" src="assets/images/icon/moon-2.png" alt='' />
    </a>
  </div> */}
</header>;
}

export default Header;
