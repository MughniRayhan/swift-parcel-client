import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

function MyParcels() {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const {data: parcels=[], refetch} = useQuery({ 
        queryKey: ['my-parcels', user?.email], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        } 
    })

    // handle payment
    const handlePay = (id) => {
      navigate(`/dashboard/payment/${id}`);
    }
    
  // delete parcel
  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: "bg-red-600 text-white font-semibold px-4 py-2 rounded",
      cancelButton: "bg-gray-300 text-black font-semibold px-4 py-2 rounded ml-2",
    },
    buttonsStyling: false,
  }).then((res) => {
    if (res.isConfirmed) {
      axiosSecure
        .delete(`/parcels/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error deleting parcel:", error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        });
    }
  });
};

  return (
    <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h2 className="text-3xl font-extrabold mb-6 text-secondary">My Parcels</h2>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{parcel.title}</td>
                <td className="capitalize">{parcel.type}</td>
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge px-4 py-3 text-white ${
                      parcel.payment_status === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/parcel/${parcel._id}`} >
                  <button className="btn btn-sm bg-primary text-black hover:bg-primary/50">
                    <FaEye />
                  </button>
                  </Link >
               {   parcel.payment_status === "unpaid" &&
                   <button 
                  onClick={() => handlePay(parcel._id)}
                  className="btn btn-sm btn-outline btn-success">
                    <FaMoneyCheckAlt />
                  </button>
               }
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {
            parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels