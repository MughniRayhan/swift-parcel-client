import React from 'react'
import UseAuth from '../Hooks/UseAuth';
import Loader from '../Components/Loader/Loader';
import { Navigate } from 'react-router';

function PrivateRoute({children}) {
    const { user, loading } = UseAuth();

    if(loading){
      return Loader;
    }

    if(!user){
     <Navigate to='/login' ></Navigate>
    }
  
    return children;
}

export default PrivateRoute