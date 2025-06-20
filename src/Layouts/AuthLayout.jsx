import React from 'react'
import { Outlet } from 'react-router'
import authImage from '../assets/authImage.png'
import Logo from '../Shared/Logo/Logo'

function AuthLayout() {
  return (
    <div className=" lg:max-w-screen w-full min-h-screen">
        
  <div className="flex flex-col lg:flex-row-reverse ">
    <div className='flex-1 bg-[#FAFDF0] lg:min-h-screen flex items-center justify-center w-full'>
        <img
      src={authImage}
      className="lg:max-w-sm rounded-lg shadow-2xl "
    />
    </div>
    <div className='flex-1 p-12'>
        <Logo/>
      <Outlet/>
    </div>
  </div>
</div>
  )
}

export default AuthLayout