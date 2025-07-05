import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import Swal from 'sweetalert2';
import useAddTrackingEvent from '../../../Hooks/useAddTrackingEvent';

function AssignRider() {
  const axiosSecure = UseAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const { mutate: addTrackingEvent } = useAddTrackingEvent();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['paidPendingParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels/assignable');
      return res.data;
    }
  });

  const openModal = async (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);

    try {
      const res = await axiosSecure.get(`/riders/by-district/${parcel.sender_center}`);
      setRiders(res.data);
    } catch (error) {
      console.error("Failed to load riders:", error);
    }
  };

  const handleAssign = async (rider) => {
  try {
    const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
    });
    console.log(res)
    if (res.data.parcelResult.modifiedCount > 0) {
      await Swal.fire({
        icon: 'success',
        title: 'Rider Assigned!',
        text: `Assigned ${rider.name} successfully.`,
      });

       addTrackingEvent({
         tracking_id: selectedParcel.tracking_id,
         event: "rider_assigned",
         remarks: `Rider ${rider.name} assigned to parcel.`
        });

      setIsModalOpen(false);
      refetch();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Assignment Failed',
        text: 'Parcel was not updated. Please check again.',
      });
    }
  } catch (error) {
    console.error("Error assigning rider:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to assign rider.',
    });
  }
};


  if (isLoading) {
    return <div className="text-center my-10"><Loader/></div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Assign Rider to Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Sender District</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel._id}</td>
                <td>{parcel.sender_name}</td>
                <td>{parcel.receiver_name}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.sender_center}</td>
                <td>{parcel.delivery_status}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => openModal(parcel)}>
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 shadow-2xl bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Select Rider for Parcel</h3>
            {riders.length === 0 ? (
              <p>No riders available in this district.</p>
            ) : (
              <table className="table table-compact">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, i) => (
                    <tr key={rider._id}>
                      <td>{i + 1}</td>
                      <td>{rider.name}</td>
                      <td>{rider.phone}</td>
                      <td>{rider.district}</td>
                      <td>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleAssign(rider)}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className="btn btn-sm mt-4" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignRider;
