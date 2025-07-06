import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center rounded-2xl shadow-md">
      <div className="max-w-4xl mx-auto ">
        <h1 className="sm:text-4xl text-2xl font-extrabold text-secondary mb-2">About Us</h1>
        <h2 className="sm:text-lg text-base font-semibold text-gray-600 mb-6">Delivering Trust with Every Parcel</h2>
        <p className="text-gray-600 text-justify leading-relaxed py-4 border-t border-gray-200 sm:text-base text-sm">
          At ParcelXpress, we are committed to redefining the courier experience in Bangladesh by combining cutting-edge technology with dedicated customer service. 
          Our platform ensures fast, secure, and reliable delivery solutions tailored for both businesses and individuals. 
          From document deliveries to inter-district parcel services, we guarantee efficiency at every step. 
          Our riders are trained professionals ensuring your items are handled with utmost care, while our real-time tracking keeps you updated throughout the journey. 
          Since our inception, we have aimed to build a network that connects every corner of the country seamlessly, empowering local businesses to grow and individuals to stay connected. 
          As we continue to expand, our mission remains the same: to deliver your trust, safely and on time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
