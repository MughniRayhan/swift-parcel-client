import axios from 'axios'
import React from 'react'

function UseAxios() {
    const axiosInstance = axios.create({
        baseURL: 'https://swift-parcel-server-kappa.vercel.app/'
    })
  return axiosInstance;
}

export default UseAxios