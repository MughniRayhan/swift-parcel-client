import React from 'react'
import merchant from '../../../assets/location-merchant.png'

function MerchantBe() {
  return (
   <section className="bg-[url('/assets/be-a-merchant-bg.png')] 
   bg-secondary py-20 px-12 rounded-3xl">
     <div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
        <div className='lg:w-[44%] w-full'>
           <h2 className='text-2xl md:text-3xl font-bold text-white'>
            Merchant and Customer Satisfaction is Our First Priority
           </h2>
           <p className='text-white/50 my-4'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
           <div className='flex flex-col sm:flex-row gap-4 mt-8 '>
            <button className='bg-primary sm:px-8 px-4 py-3 rounded-full font-bold text-sm sm:text-lg'>Become a Merchant</button>
            <button className='bg-transparent border border-primary text-primary sm:px-8 px-4 text-sm sm:text-lg py-3 rounded-full font-bold'>Earn with Profast Courier</button>
           </div>
        </div>
        <img src={merchant} alt="" />
    </div>
   </section>
  )
}

export default MerchantBe