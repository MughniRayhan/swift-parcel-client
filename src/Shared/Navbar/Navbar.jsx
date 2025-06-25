import React from 'react'
import { Link, NavLink } from 'react-router'
import Logo from '../Logo/Logo'
import UseAuth from '../../Hooks/UseAuth';

function Navbar() {
  const {user,logOut} = UseAuth();

  const handleLogOut = () => {
    logOut()
    .then((res) => {
      console.log("Logged out successfully");
    })
    .catch((error) => {
      console.error("Logout Error: ", error);
    })
  }

    const NavItems = <>
     <li><NavLink to='/'>Home</NavLink></li>
     <li><NavLink to='/sendParcel'>Send A Parcel</NavLink></li>
     <li><NavLink to='/coverage'>Coverage</NavLink></li>
     {
      user && <>
      <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      </>
     }
     <li><NavLink to='/about'>About Us</NavLink></li>
     <li><NavLink to='/pricing'>Pricing</NavLink></li>
     <li><NavLink to='/rider'>Be a Rider</NavLink></li>
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
    <div ><Logo/></div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-base font-medium">
      {NavItems}
    </ul>
  </div>
  <div className="navbar-end flex items-center gap-2">
    {
      user ?
      <button onClick={handleLogOut} className="btn bg-white  rounded-lg">Log Out</button>
      :
      <Link to="/login"><button className="btn bg-white  rounded-lg">Sign In</button></Link>
    }
   
   <Link to="/"><button className="btn bg-primary rounded-lg">Be a rider</button></Link>
  </div>
</div>
    </nav>
  )
}

export default Navbar