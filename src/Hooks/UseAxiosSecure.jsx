import axios from 'axios'
import React from 'react'

function UseAxiosSecure() {
    const   axiosSecure = axios.create({
        baseURL: 'http://localhost:3000/' 
    })
  return axiosSecure;
}

export default UseAxiosSecure