import React from 'react';
import { useRouteError, Link } from 'react-router';
import errorImage from '../../assets/error.png';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className='max-w-7xl mx-auto'>
        <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
     
        <img src={errorImage} alt="" className='w-50 sm:w-70'/>
        <Link to="/" className="btn btn-primary mt-4 text-black font-bold">Go Home</Link>
     
    </div>
        <Footer/>
    </div>
  );
};

export default ErrorPage;
