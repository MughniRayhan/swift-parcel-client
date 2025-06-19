import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'

function RootLayout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout