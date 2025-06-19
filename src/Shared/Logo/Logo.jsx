import React from 'react'
import logo from '../../assets/logo.png'
function Logo() {
  return (
    <div className='flex items-center gap-2'>
        <img src={logo} alt="" />
        <h3 className='font-extrabold text-2xl mt-2'>SwiftParcel</h3>
    </div>
  )
}

export default Logo