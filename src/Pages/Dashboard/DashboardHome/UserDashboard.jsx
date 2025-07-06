import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const UserDashboard = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userDashboardStats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/dashboard-stats/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Failed to load data.</p>;

  const pieData = [
    { name: 'Delivered Parcels', value: data.deliveredParcels },
    { name: 'Pending Parcels', value: data.pendingParcels },
  ];

  const COLORS = ['#4ade80', '#facc15']; // green, yellow

  return (
   <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h1 className="text-3xl font-extrabold mb-6 text-secondary ">User Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-center">
        <div className="bg-primary text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Total Parcels</p>
          <p className="text-2xl">{data.totalParcels}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Delivered Parcels</p>
          <p className="text-2xl">{data.deliveredParcels}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Pending Parcels</p>
          <p className="text-2xl">{data.pendingParcels}</p>
        </div>
      </div>

      {/* Pie Chart of Parcel Status */}
      <div className="bg-white p-4 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4 text-secondary">Parcel Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Parcels Table */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-secondary">Recent Parcels</h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
              <tr>
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.recentParcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>${parcel.cost}</td>
                  <td>{parcel.delivery_status}</td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                </tr>
              ))}
              {data.recentParcels.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No Parcels Yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
