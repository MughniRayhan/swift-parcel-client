import React from 'react'
import bookingIcon from '../../../assets/bookingIcon.png'

function HowItWorks() {
    const steps = [
    {
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time.",
      icon: bookingIcon
    },
    {
      title: "Pickup Scheduling",
      description: "Merchants schedule a pickup time that suits them, ensuring convenience and flexibility.",
      icon: bookingIcon
    },
    {
      title: "Package Pickup",
      description: "Our delivery personnel pick up the package from the merchant's location at the scheduled time.",
      icon: bookingIcon
    },
    {
      title: "Real-time Tracking",
      description: "Customers can track their packages in real-time through our app, ensuring transparency and peace of mind.",
      icon: bookingIcon
    }
    
    ]
  return (
    <section data-aos="fade-up"
     data-aos-duration="5000" className="bg-gray-100 py-20 px-4 ">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          How It Works
        </h2>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 shadow-md hover:shadow-lg rounded-2xl transition-shadow duration-300">
              <img src={step.icon} alt={step.title} className="w-16 h-16 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-secondary">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
</section>
  )
}

export default HowItWorks