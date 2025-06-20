import React from 'react'
import { NavLink } from 'react-router'
import Logo from '../Logo/Logo'

function Navbar() {
    const NavItems = <>
     <li><NavLink>Home</NavLink></li>
     <li><NavLink>About Us</NavLink></li>
     <li><NavLink>Services</NavLink></li>
    </>
  return (
    <nav>
        <div className="navbar bg-white sm:rounded-2xl shadow-sm sm:relative sm:top-4 sm:mb-10">
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
        {NavItems}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><Logo/></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-base font-medium">
      {NavItems}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Sign In</a>
  </div>
</div>
    </nav>
  )
}

export default Navbar