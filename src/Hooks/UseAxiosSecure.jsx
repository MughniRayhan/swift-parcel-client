import axios from 'axios'
import React from 'react'
import UseAuth from './UseAuth';

    const   axiosSecure = axios.create({
        baseURL: 'http://localhost:3000/' 
    })

function UseAxiosSecure() {
  const {user} = UseAuth()
 
axiosSecure.interceptors.request.use((config)=>{
  config.headers.Authorization = `Bearer ${user.accessToken}`
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return axiosSecure;
}

export default UseAxiosSecure