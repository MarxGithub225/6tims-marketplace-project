"use client"
import { Link } from "react-router-dom";
import { LinksEnum } from "../../utilities/pagesLinksEnum";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setBackButton, setPage } from '../../redux/features/headerSlice'

function Custom404() {
  const dispatch = useDispatch()
  dispatch(setPage('not-found-page'))

  useEffect(() => {
    return () => {
      dispatch(setPage(''))
    }
  }, [])
  return <div className="relative  not-found flex w-full flex items-center justify-center flex-col px-4 bigTablet:px-0">
    <div className="label">404</div>
    <p>{"Couldn't find what you are looking for."}</p>
    <span>{"This page doesn’t exist or has been removed. Go back to the home page and continue exploring"}</span>

    <Link to={LinksEnum.home} className="home-button">
    Take me home
    </Link>
  </div>;
}

export default Custom404;