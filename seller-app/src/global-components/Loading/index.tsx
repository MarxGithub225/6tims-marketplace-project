import React from "react";

function Loading() {

  return<div className={`fixed top-0 left-0 w-full flex bg-white items-center justify-center h-screen`} style={{zIndex: 1000000000000}}>
      <div className="loading-icon"/>
  </div>;
}

export default Loading;
