import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import UseAuth from '../../../Hooks/UseAuth';

const TrackParcelUser = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: trackingHistory = [], isLoading, error } = useQuery({
    queryKey: ['trackingHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading tracking data.</p>;

  return (
    <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h2 className="text-3xl font-extrabold mb-6 text-secondary">My Parcels Tracking History</h2>

      {trackingHistory.length === 0 ? (
        <p>No tracking data found.</p>
      ) : (
       <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Tracking ID</th>
              <th>Event</th>
              <th>Remarks</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {trackingHistory.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.parcel_name}</td>
                <td>{item.tracking_id}</td>
                <td>{item.event}</td>
                <td>{item.remarks}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrackParcelUser;
