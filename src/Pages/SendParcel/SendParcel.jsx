import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const SendParcel = () => {
    const districtData = useLoaderData(); 
    const axiosSecure = UseAxiosSecure();
    const {user} = UseAuth();
    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");
  
  const parcelType = watch("type");

const onSubmit = (data) => {
    const isSameDistrict = data.sender_region === data.receiver_region;
    const weight = parseFloat(data.weight || 0);
    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      breakdown = `Document Delivery<br>${isSameDistrict ? "Within Same District" : "Outside District"}`;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        extraCost = extraWeight * 40;
        if (!isSameDistrict) extraCost += 40; // Out-of-city surcharge
        baseCost = isSameDistrict ? 110 : 150;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: "Confirm Booking?",
      html: `
        <div class="text-left space-y-2 text-sm w-full">
          <div><span class="font-bold">Type:</span> ${data.type}</div>
          ${
            data.type === "non-document"
              ? `<div><span class="font-bold">Weight:</span> ${data.weight} kg</div>`
              : ""
          }
          ${
            isSameDistrict
              ? `<div><span class="font-bold">Delivery Zone:</span> Within Same District</div>`
              : `<div><span class="font-bold">Delivery Zone:</span> Outside District</div>`
          }
          <div><span class="font-bold">From:</span> ${data.sender_region}</div>
          <div><span class="font-bold">To:</span> ${data.receiver_region}</div>
          <div><span class="font-bold">Base Cost:</span> ৳${baseCost}</div>
          <div><span class="font-bold">Extra Cost:</span> ৳${extraCost}</div>
          <div><span class="font-bold text-secondary mt-4 text-lg ">Total Cost:</span> <span class="text-secondary text-lg font-bold">৳${totalCost}</span></div>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Edit",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "bg-primary font-bold text-black px-4 py-2 rounded mx-2",
        cancelButton: "bg-gray-400 font-bold text-white px-4 py-2 rounded mx-2",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const generateTrackingID = () => {
          const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
          const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
          return `TRK-${datePart}-${randomPart}`;
        };

        const finalData = {
          ...data,
          baseCost,
          extraCost,
          cost: totalCost,
          created_by: user?.email || "guest",
          payment_status: "unpaid",
          delivery_status: "pending",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };

        console.log("Parcel saved:", finalData);
        axiosSecure.post("/parcels", finalData)
          .then((res) => {
            console.log(res.data)
            if(res.data.insertedId){
             Swal.fire("Success!", "Parcel booked successfully!", "success");
        reset();
            }
          })
       navigate('/dashboard/myParcels')
      }
    });
   
  };



  const getDistrictsByRegion = (region) => {
    return districtData
      .filter((d) => d.region === region)
      .map((d) => d.district);
  };

  const allRegions = [...new Set(districtData.map((d) => d.region))];

  return (
    <div className=" px-12 py-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-extrabold text-secondary mb-2">Add Parcel</h2>
      

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10 py-8 border-t border-gray-200">
        <p className=" font-extrabold mb-8 ">Enter your parcel details</p>
        {/* Parcel Info */}
        
          <div>
            
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input type="radio"  value="document" {...register("type", { required: true })} /> Document
              </label>
              <label className="flex items-center gap-1">
                <input type="radio"  value="non-document" {...register("type", { required: true })} /> Non-Document
              </label>
            </div>
            {errors.type && <p className="text-red-500 text-sm">Parcel type is required</p>}
          </div>

        <div className="flex flex-col justify-between md:flex-row gap-4 w-full py-4">
              <div className="flex-1">
            <label className="font-semibold">Parcel Title</label>
            <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          <div className="flex-1">
            <label className="font-semibold">Weight (KG)</label>
            <input type="number" step="any" {...register("weight")} className="input input-bordered w-full" disabled={parcelType === "document"} />
          </div>
        </div>
       

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 py-4 border-t border-gray-200">
            {/* Sender Info */}
        <div>
          <h3 className="text-lg font-extrabold my-6 text-secondary ">Sender Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("sender_name", { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
            <input {...register("sender_contact", { required: true })} placeholder="Sender Contact No" className="input input-bordered w-full" />
            <input {...register("sender_address", { required: true })} placeholder="Sender Address" className="input input-bordered w-full" />

            <select {...register("sender_region", { required: true })} className="select select-bordered w-full" onChange={(e) => setSelectedSenderRegion(e.target.value)}>
              <option value="">Select Region</option>
              {allRegions.map((region, i) => (
                <option key={i} value={region}>{region}</option>
              ))}
            </select>
 </div>
            <select {...register("sender_center", { required: true })} className="select select-bordered w-full mt-3">
              <option value="">Select Service Center</option>
              {getDistrictsByRegion(selectedSenderRegion).map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <textarea {...register("pickup_instruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full mt-3" />
         
        </div>

        {/* Receiver Info */}
        <div>
          <h3 className="text-lg font-extrabold my-6 text-secondary">Receiver Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("receiver_name", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
            <input {...register("receiver_contact", { required: true })} placeholder="Receiver Contact No" className="input input-bordered w-full" />
            <input {...register("receiver_address", { required: true })} placeholder="Receiver Address" className="input input-bordered w-full" />

            <select {...register("receiver_region", { required: true })} className="select select-bordered w-full" onChange={(e) => setSelectedReceiverRegion(e.target.value)}>
              <option value="">Select Region</option>
              {allRegions.map((region, i) => (
                <option key={i} value={region}>{region}</option>
              ))}
            </select>
            </div>
            <select {...register("receiver_center", { required: true })} className="select select-bordered w-full mt-3">
              <option value="">Select Service Center</option>
              {getDistrictsByRegion(selectedReceiverRegion).map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <textarea {...register("delivery_instruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full mt-3" />
          
        </div>
</div>

        <p className="text-sm mt-4">* PickUp Time 4pm-7pm Approx.</p>
        <button type="submit" className="mt-4 btn bg-primary  w-full md:w-fit">Proceed to Confirm Booking</button>
      </form>
    </div>
  );
};

export default SendParcel;