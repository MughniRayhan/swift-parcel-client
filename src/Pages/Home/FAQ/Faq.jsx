import React from 'react'

function Faq() {
  return (
   <section data-aos="fade-up"
     data-aos-duration="5000" className="bg-gray-100 py-20 px-4 ">
         <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
         Frequently Asked Question (FAQ)
        </h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title font-semibold">How long does it take to deliver a parcel?</div>
  <div className="collapse-content text-sm bg-[#E6F2F3]">We offer both express and standard delivery options. Express delivery within Dhaka takes 4–6 hours, while standard delivery across Bangladesh takes 24–72 hours depending on the location.</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">Can I track my parcel in real time?</div>
  <div className="collapse-content text-sm bg-[#E6F2F3]">Yes, every parcel comes with a real-time tracking ID. You can monitor its exact location and status from pickup to final delivery.</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold"> Is my parcel safe during delivery?</div>
  <div className="collapse-content text-sm bg-[#E6F2F3]">Absolutely. We use OTP-based verification to ensure secure delivery and have strict handling protocols to protect your parcel throughout the journey.</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">Do you offer cash on delivery (COD)?</div>
  <div className="collapse-content text-sm bg-[#E6F2F3]">Yes, we support 100% cash on delivery across all 64 districts in Bangladesh, giving both senders and receivers peace of mind.
</div>
</div>
<div className="collapse collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">What happens if my parcel gets returned?</div>
  <div className="collapse-content text-sm bg-[#E6F2F3]">We have a dedicated reverse logistics system. If a delivery fails or a customer requests a return, we’ll return the parcel to the sender safely and quickly.</div>
</div>
</section>
  )
}

export default Faq