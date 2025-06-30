import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

function BeARider() {
  const { user } = UseAuth(); 
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, watch, reset } = useForm();
  const districtData = useLoaderData(); 

  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");

  const getDistrictsByRegion = (region) => {
    return districtData
      .filter((d) => d.region === region)
      .map((d) => d.district);
  };

  const allRegions = [...new Set(districtData.map((d) => d.region))];

  const onSubmit = async(data) => {
    const riderApplication = {
      ...data,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };
    console.log(riderApplication);

    try {
      const res = await axiosSecure.post('/riders', riderApplication);
      if(res.data.insertedId){
        Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          text: 'Your rider application has been submitted successfully. We will review and contact you soon.',
          confirmButtonColor: '#03373d'
        });
        reset();
      }
    } catch (error) {
      console.error("Error submitting rider application:", error);
    }
  };

  return (
    <div className="px-12 py-10 bg-white rounded-2xl shadow-md">
      <h2 className="sm:text-4xl text-3xl font-extrabold text-secondary mb-2">Become a Rider</h2>
      <p className='text-gray-600 w-[55%] mb-8'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      
      <h2 className="text-3xl font-extrabold text-secondary mb-4 pt-6 border-t border-gray-200">Tell us about yourself</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full"
            {...register("name")}
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full"
            {...register("email")}
          />
        </div>

        {/* Region */}
        <div>
          <label className="label">Region</label>
          <select 
            {...register("region", { required: true })} 
            className="select select-bordered w-full" 
            onChange={(e) => setSelectedSenderRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {allRegions.map((region, i) => (
              <option key={i} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select 
            {...register("district", { required: true })} 
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {getDistrictsByRegion(selectedSenderRegion).map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Bike Brand */}
        <div>
          <label className="label">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            placeholder="e.g. Yamaha, Honda"
            className="input input-bordered w-full"
          />
        </div>

        {/* Bike Registration Number */}
        <div>
          <label className="label">Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeRegNumber", { required: true })}
            placeholder="e.g. DHA-1234"
            className="input input-bordered w-full"
          />
        </div>

        {/* NID */}
        <div>
          <label className="label">NID</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            placeholder="National ID Number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="label">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            placeholder="e.g. 017xxxxxxxx"
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary text-black w-full">Submit</button>
      </form>
    </div>
  );
}

export default BeARider;
