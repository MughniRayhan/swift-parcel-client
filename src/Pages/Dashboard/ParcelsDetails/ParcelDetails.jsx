import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const { data: parcel, isLoading, error } = useQuery({
    queryKey: ['parcel', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error loading parcel details.</p>;

  return (
     <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h2 className="text-3xl font-extrabold mb-6 text-secondary">Parcel Details</h2>
<div className='bg-primary/5 rounded-2xl p-6 shadow-xl w-[90%] mx-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700  mt-6 py-5">
        <div>
          <p><strong>Tracking ID:</strong> {parcel.tracking_id}</p>
          <p><strong>Title:</strong> {parcel.title}</p>
          <p><strong>Type:</strong> {parcel.type}</p>
          <p><strong>Weight:</strong> {parcel.weight || 'N/A'}</p>
          <p><strong>Cost:</strong> ${parcel.cost}</p>
          <p><strong>Payment Status:</strong> {parcel.payment_status}</p>
          <p><strong>Delivery Status:</strong> {parcel.delivery_status}</p>
        </div>
        <div>
          <p><strong>Sender Name:</strong> {parcel.sender_name}</p>
          <p><strong>Sender Contact:</strong> {parcel.sender_contact}</p>
          <p><strong>Sender Address:</strong> {parcel.sender_address}, {parcel.sender_region}</p>
          <p><strong>Receiver Name:</strong> {parcel.receiver_name}</p>
          <p><strong>Receiver Contact:</strong> {parcel.receiver_contact}</p>
          <p><strong>Receiver Address:</strong> {parcel.receiver_address}, {parcel.receiver_region}</p>
        </div>
      </div>
      <div className="mt-6">
        <p><strong>Pickup Instructions:</strong> {parcel.pickup_instruction}</p>
        <p><strong>Delivery Instructions:</strong> {parcel.delivery_instruction}</p>
        <p><strong>Assigned Rider:</strong> {parcel.assigned_rider_name || 'Not assigned yet'}</p>
        <p><strong>Creation Date:</strong> {parcel.creation_date ? new Date(parcel.creation_date).toLocaleString() : 'N/A'}</p>
      </div>
</div>
    </div>
  );
};

export default ParcelDetails;
