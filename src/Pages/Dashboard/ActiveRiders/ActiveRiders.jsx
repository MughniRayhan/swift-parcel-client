import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function ActiveRiders() {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: activeRiders = [], refetch } = useQuery({
    queryKey: ['activeRiders', searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active', {
        params: { name: searchTerm },
      });
      return res.data;
    },
  });

  const handleDeactivate = async (riderId) => {
    const confirm = await Swal.fire({
      title: 'Deactivate Rider?',
      text: "This will remove their active status.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${riderId}/deactivate`);
        if (res.data.modifiedCount) {
          Swal.fire('Deactivated!', 'Rider has been deactivated.', 'success');
          refetch();
        }
      } catch (error) {
        console.error("Error deactivating rider:", error);
      }
    }
  };

  return (
    <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h2 className="text-3xl font-extrabold mb-6 text-secondary">Active Riders</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={() => refetch()} className="btn btn-primary text-black  ml-2">Search</button>
      </div>

      {/* Table */}
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
              <th>Bike Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {activeRiders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No active riders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveRiders;
