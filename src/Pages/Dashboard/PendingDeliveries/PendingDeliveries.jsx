import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';
import Swal from 'sweetalert2';
import useAddTrackingEvent from '../../../Hooks/useAddTrackingEvent';

function PendingDeliveries() {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { mutate: addTrackingEvent } = useAddTrackingEvent();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingDeliveries', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user.email}/pending-tasks`);
      console.log("data",res.data)
      return res.data;
    }
  });
console.log(parcels)
  const handleUpdateStatus = async (parcel, newStatus) => {
  try {
    const res = await axiosSecure.patch(`/parcels/${parcel._id}/update-status`, {
      status: newStatus
    });
 
    if (res.data.modifiedCount > 0) {
      await Swal.fire({
        icon: 'success',
        title: `Status Updated`,
        text: `Parcel status updated to ${newStatus}.`
      });

      
      let eventStatus = "picked_up";
      let remarksDetails = "Parcel picked up by rider.";

      if (newStatus === "delivered") {
        eventStatus = "delivered";
        remarksDetails = "Parcel delivered successfully.";
      }

      
      addTrackingEvent({
        tracking_id: parcel.tracking_id,
        event: eventStatus,
        remarks: remarksDetails,
      });

      refetch(); 
    }
  } catch (error) {
    console.error("Error updating status:", error);
    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: 'Could not update status.'
    });
  }
};


  if (isLoading) {
    return <div className="text-center my-10"><Loader/></div>;
  }

  return (
    <div className=" px-12 py-10 bg-white rounded-2xl shadow-md min-h-screen">
      <h2 className="sm:text-3xl text-2xl font-extrabold text-secondary mb-5">My Pending Deliveries</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.receiver_name}</td>
                <td>{parcel.receiver_contact}</td>
                <td>{parcel.receiver_address}, {parcel.receiver_center}, {parcel.receiver_region}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.delivery_status}</td>
                <td>
                  {parcel.delivery_status === "assigned" && (
                    <button
                      className="btn text-black btn-warning"
                      onClick={() => handleUpdateStatus(parcel, "in_transit")}
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  {parcel.delivery_status === "in_transit" && (
                    <button
                      className="btn text-white btn-success"
                      onClick={() => handleUpdateStatus(parcel, "delivered")}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingDeliveries;
