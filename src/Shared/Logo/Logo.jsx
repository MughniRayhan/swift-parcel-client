import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router'
function Logo() {
  return (
    <Link to='/'>
    <div  className='flex items-center '>
        <img src={logo} alt="" className='sm:w-[37px] w-[20px]'/>
        <h3 className='font-extrabold sm:text-2xl mt-2'>SwiftParcel</h3>
    </div>
    </Link>
  )
}

export default Logo