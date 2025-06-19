import React from "react";
import img1 from "../../../assets/live-tracking.png";
import img2 from "../../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: img1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: img2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us",
    image: img2,
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-gray-100">
      <div className="space-y-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-xl overflow-hidden"
          >
             {/* Image */}
            <div className="w-full  p-6 flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-36 object-contain"
              />

            {/* Dashed Divider */}
            <div className="hidden md:block border-l border-dashed border-gray-500  mx-6"></div>

              {/* Text Content */}
            <div className="w-full  p-6 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 w-full">{item.description}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
