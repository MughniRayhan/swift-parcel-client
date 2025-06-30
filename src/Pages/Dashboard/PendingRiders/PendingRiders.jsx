import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader/Loader';

function PendingRiders() {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

const { isPending, data:pendingRiders=[], refetch} = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async()=>{
      const res = await axiosSecure.get('/riders/pending');
      return res.data
    }
})

if(isPending){
    return <Loader/>
}

  const handleApprove = async (riderId) => {
    const confirm = await Swal.fire({
      title: 'Approve Rider?',
      text: "This will make them active.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${riderId}/approve`);
        if (res.data.modifiedCount) {
            refetch();
          Swal.fire('Approved!', 'Rider has been approved.', 'success');
        }
      } catch (error) {
        console.error("Error approving rider:", error);
      }
    }
  };

  const handleReject = async (riderId) => {
    const confirm = await Swal.fire({
      title: 'Reject Rider?',
      text: "This will remove their application.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/riders/${riderId}`);
        if (res.data.deletedCount) {
            refetch();
          Swal.fire('Rejected!', 'Rider has been rejected.', 'success');
          
        }
      } catch (error) {
        console.error("Error rejecting rider:", error);
      }
    }
  };

  return (
    <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h2 className="text-3xl font-extrabold mb-6 text-secondary">Pending Riders</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-success btn-sm mr-2"
                    onClick={() => handleApprove(rider._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleReject(rider._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
              {pendingRiders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No pending riders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for rider details */}
      {selectedRider && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] relative shadow-2xl">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <p><span className="font-bold">Name:</span> {selectedRider.name}</p>
            <p><span className="font-bold">Email:</span> {selectedRider.email}</p>
            <p><span className="font-bold">Phone:</span> {selectedRider.phone}</p>
            <p><span className="font-bold">Region:</span> {selectedRider.region}</p>
            <p><span className="font-bold">District:</span> {selectedRider.district}</p>
            <p><span className="font-bold">Bike Brand:</span> {selectedRider.bikeBrand}</p>
            <p><span className="font-bold">Bike Reg:</span> {selectedRider.bikeRegNumber}</p>
            <p><span className="font-bold">NID:</span> {selectedRider.nid}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-success flex-1"
                onClick={() => {
                  handleApprove(selectedRider._id);
                  setSelectedRider(null);
                }}
              >
                Approve
              </button>
              <button
                className="btn btn-error flex-1"
                onClick={() => {
                  handleReject(selectedRider._id);
                  setSelectedRider(null);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingRiders;
