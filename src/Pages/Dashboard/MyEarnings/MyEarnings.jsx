import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, isToday, isThisWeek, isThisMonth, isThisYear, parseISO } from 'date-fns';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';

const MyEarnings = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['completedDeliveries', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user.email}/completed-tasks`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // Calculate earnings per parcel with defensive parsing
  const earnings = parcels.map(parcel => {
    const earningRate = parcel.sender_region === parcel.receiver_region ? 0.3 : 0.5;
    return {
      ...parcel,
      earning: parcel.cost * earningRate,
    };
  });

  // Total earnings, cashed out, and pending
  const totalEarnings = earnings.reduce((sum, p) => sum + p.earning, 0);
  const totalCashedOut = earnings
    .filter(p => p.cashout_status === 'cashed_out')
    .reduce((sum, p) => sum + p.earning, 0);
  const totalPending = totalEarnings - totalCashedOut;

  // Defensive date filters
  const todayEarnings = earnings.filter(p =>
    p.delivered_time && isToday(parseISO(p.delivered_time))
  ).reduce((sum, p) => sum + p.earning, 0);

  const weekEarnings = earnings.filter(p =>
    p.delivered_time && isThisWeek(parseISO(p.delivered_time))
  ).reduce((sum, p) => sum + p.earning, 0);

  const monthEarnings = earnings.filter(p =>
    p.delivered_time && isThisMonth(parseISO(p.delivered_time))
  ).reduce((sum, p) => sum + p.earning, 0);

  const yearEarnings = earnings.filter(p =>
    p.delivered_time && isThisYear(parseISO(p.delivered_time))
  ).reduce((sum, p) => sum + p.earning, 0);

  return (
    <div className="px-12 py-10 bg-white rounded-2xl shadow-md min-h-screen">
      <h2 className="sm:text-3xl text-2xl font-extrabold text-secondary mb-6">My Earnings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <div className="bg-green-100 p-4 rounded">
          <h4 className="font-semibold">Total Earnings</h4>
          <p>${totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h4 className="font-semibold">Total Cashed Out</h4>
          <p>${totalCashedOut.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h4 className="font-semibold">Total Pending</h4>
          <p>${totalPending.toFixed(2)}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <h4 className="font-semibold">This Week</h4>
          <p>${weekEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded">
          <h4 className="font-semibold">Today</h4>
          <p>${todayEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-indigo-100 p-4 rounded">
          <h4 className="font-semibold">This Month</h4>
          <p>${monthEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h4 className="font-semibold">This Year</h4>
          <p>${yearEarnings.toFixed(2)}</p>
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-secondary mt-10">Delivery History</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-lg mt-5">
        {earnings.length === 0 ? (
          <p className="p-4 text-center">No Earnings Yet</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead className="bg-primary font-bold text-gray-700">
              <tr>
                <th className="px-2 py-1">Tracking ID</th>
                <th className="px-2 py-1">Sender</th>
                <th className="px-2 py-1">Receiver</th>
                <th className="px-2 py-1">Cost</th>
                <th className="px-2 py-1">Earning</th>
                <th className="px-2 py-1">Picked Time</th>
                <th className="px-2 py-1">Delivered Time</th>
                <th className="px-2 py-1">Cashout Status</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map(parcel => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.sender_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>${parcel.cost}</td>
                  <td>${parcel.earning.toFixed(2)}</td>
                  <td>{parcel.picked_time ? format(parseISO(parcel.picked_time), 'Pp') : 'N/A'}</td>
                  <td>{parcel.delivered_time ? format(parseISO(parcel.delivered_time), 'Pp') : 'N/A'}</td>
                  <td>{parcel.cashout_status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyEarnings;
