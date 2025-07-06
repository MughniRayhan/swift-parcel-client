import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../Shared/Logo/Logo'
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserPlus, FaMapMarkerAlt, FaUserEdit, FaMotorcycle, FaUserClock, FaUserShield, FaTasks, FaCheckCircle, FaWallet} from 'react-icons/fa';
import useUserRole from '../Hooks/useUserRole';

function DashboardLayout() {
   const {role,roleLoading} = useUserRole()
   console.log(role)
  return (
<div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
   
        {/* Navbar */}
    <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">Dashboard</div>
      
    </div>
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side ">
     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
<ul className="menu bg-base-200 text-base-content min-h-full sm:w-80 w-[80%] p-4">
  <div className='flex items-center justify-between lg:hidden'>
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg></label>
      {/* Sidebar content here */}
    <div ><Logo/></div>
  </div>
       <div className='mb-4 hidden lg:block'><Logo/></div>    
     <NavLink to='/dashboard' className="flex items-center gap-2 mt-5 text-lg  dashboard_homepage">
      <FaHome /> Home
    </NavLink>
    
    <NavLink to='/dashboard/myParcels' className="flex items-center gap-2 mt-5 text-lg  dashboard_page">
      <FaBoxOpen /> My Parcels
    </NavLink>
    
    <NavLink to='/dashboard/paymentHistory' className="flex items-center gap-2 mt-5 text-lg   dashboard_page">
      <FaMoneyCheckAlt /> Payment History
    </NavLink>
    
    <NavLink to='/dashboard/track' className="flex items-center gap-2 mt-5 text-lg  dashboard_page">
      <FaMapMarkerAlt /> Track a Package
    </NavLink>
    
    <NavLink to='/dashboard/profile' className="flex items-center gap-2 mt-5 text-lg  dashboard_page">
      <FaUserEdit /> Update Profile
    </NavLink>
{/* rider links */}
{
  !roleLoading && role=="rider" &&
  <>
  <NavLink to='/dashboard/pending-deliveries' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaTasks /> Pendin Deliveries
</NavLink>

<NavLink to='/dashboard/completed-deliveries' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaCheckCircle /> Completed Deliveries
</NavLink>

<NavLink to='/dashboard/my-earnings' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaWallet /> My Earnings
</NavLink>
  </>
}
{/* admin links */}
{
  !roleLoading && role==="admin" && 
  <>
  <NavLink to='/dashboard/assign-rider' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUserPlus /> Assign Rider
</NavLink>

  <NavLink to='/dashboard/activeRiders' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaMotorcycle /> Active Riders
</NavLink>


<NavLink to='/dashboard/pendingRiders' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUserClock /> Pending Riders
</NavLink>

<NavLink to='/dashboard/makeAdmin' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUserShield /> Make Admin
</NavLink>
  </>
}
    </ul>
  </div>
</div>
  )
}

export default DashboardLayout