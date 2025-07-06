import React from 'react'
import useUserRole from '../../../Hooks/useUserRole'
import Loader from '../../../Components/Loader/Loader'
import Forbidden from '../../Forbidden/Forbidden';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
function DashboardHome() {
  const {role,roleLoading} = useUserRole();

  if(roleLoading){
    return <Loader/>
  }

  if(role === "user"){
    return <UserDashboard></UserDashboard>
  }

  else if(role === "rider"){
    return <RiderDashboard></RiderDashboard>
  }

  else if(role === "admin"){
    return <AdminDashboard></AdminDashboard>
  }

  else{
    return <Forbidden></Forbidden>
  }
  return (
    <div>DashboardHome</div>
  )
}

export default DashboardHome