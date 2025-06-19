import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brands/casio.png";
import brand2 from "../../../assets/brands/amazon_vector.png";
import brand3 from "../../../assets/brands/moonstar.png";
import brand4 from "../../../assets/brands/start.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/start-people 1.png";
import brand7 from "../../../assets/brands/amazon.png";


const brands = [
 brand1,
 brand2,    
 brand3,
 brand4, 
 brand5,
 brand6,
 brand7
];

const SalesTeam = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee direction="right" speed={40} pauseOnHover={true} gradient={false} className="">
        {brands.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt=""
            className="  mx-8 object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default SalesTeam;
