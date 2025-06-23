import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';

function RootLayout() {
  useEffect(() => {
      AOS.init({
      once: false, 
    });
    }, []);
  
  return (
    <div className='max-w-7xl mx-auto'>
      <Toaster position="top-right" reverseOrder={false} />
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout