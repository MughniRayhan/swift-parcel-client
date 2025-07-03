import React from 'react'
import useUserRole from '../Hooks/useUserRole';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader/Loader';

function RiderRoute({children}) {
     const {user,loading} = UseAuth();
     const {role,roleLoading} = useUserRole();
     const location = useLocation()

     if(loading || roleLoading){
        return <Loader></Loader>
     }

     if(!user || role !== "rider"){
    return <Navigate state={location.pathname}  to='/forbidden'></Navigate>
}
return children;
}

export default RiderRoute