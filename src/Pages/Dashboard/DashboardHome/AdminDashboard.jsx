import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import Loader from '../../../Components/Loader/Loader';

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/dashboard-stats');
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Failed to load data.</p>;

  return (
    <div className="px-6 py-10 bg-white rounded-xl min-h-screen ">
      <h1 className="text-3xl font-extrabold mb-6 text-secondary ">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 text-center">
        <div className="bg-primary text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Total Parcels</p>
          <p className="text-2xl ">{data.totalParcels}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Delivered Parcels</p>
          <p className="text-2xl">{data.deliveredParcels}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Pending Parcels</p>
          <p className="text-2xl">{data.pendingParcels}</p>
        </div>
        <div className="bg-primary text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Total Users</p>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Total Riders</p>
          <p className="text-2xl">{data.totalRiders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <p className="font-semibold">Total Earnings</p>
          <p className="text-2xl">${data.totalEarnings}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Parcels Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-secondary">Recent Parcels</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.recentParcels} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="creation_date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#caeb66" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Payments Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-secondary">Recent Payments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.recentPayments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Parcels Table */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recent Parcels</h2>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
              <tr>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.recentParcels.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.delivery_status}</td>
                  <td>${parcel.cost}</td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
         <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
              <tr>
                <th>Transaction ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentPayments.map(payment => (
                <tr key={payment._id}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.email}</td>
                  <td>${payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
