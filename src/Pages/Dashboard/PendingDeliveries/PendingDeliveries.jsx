import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';
import Swal from 'sweetalert2';

function PendingDeliveries() {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['pendingDeliveries', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user.email}/pending-tasks`);
      console.log("data",res.data)
      return res.data;
    }
  });
console.log(parcels)
  const handleUpdateStatus = async (parcelId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/update-status`, {
        status: newStatus
      });

      if (res.data.modifiedCount > 0) {
        await Swal.fire({
          icon: 'success',
          title: `Status Updated`,
          text: `Parcel status updated to ${newStatus}.`
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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
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
                      onClick={() => handleUpdateStatus(parcel._id, "in_transit")}
                    >
                      Mark as Picked Up
                    </button>
                  )}
                  {parcel.delivery_status === "in_transit" && (
                    <button
                      className="btn text-white btn-success"
                      onClick={() => handleUpdateStatus(parcel._id, "delivered")}
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
