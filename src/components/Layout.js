import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from 'react'



const Layout = () => {

  return (
    <>
    <Header />
    <main className="container-fluid pt-5">
    <Outlet />
   
   </main>
    
    </>
 
  )
}

export default Layout