import React from 'react'
import { Outlet } from 'react-router'
import authImage from '../assets/authImage.png'
import Logo from '../Shared/Logo/Logo'

function AuthLayout() {
  return (
    <div className=" lg:max-w-screen w-full min-h-screen">
        
  <div className="flex flex-col md:flex-row-reverse ">
    <div className='hidden  flex-1 bg-[#FAFDF0] lg:min-h-screen md:flex items-center justify-center w-full'>
        <img
      src={authImage}
      className="md:max-w-sm rounded-lg shadow-2xl "
    />
    </div>
    <div className='md:flex-1 sm:p-12 p-8 bg-white min-h-screen'>
        <Logo/>
      <Outlet/>
    </div>
  </div>
</div>
  )
}

export default AuthLayout