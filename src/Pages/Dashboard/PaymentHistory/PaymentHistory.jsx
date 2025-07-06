import React from 'react'
import UseAuth from '../../../Hooks/UseAuth'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Loader/Loader';
import { FaCheckCircle } from "react-icons/fa";

function PaymentHistory() {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {isPending , data: payments=[]} = useQuery({
        queryKey:['payments', user.email],
        queryFn: async()=>{
         const res = await axiosSecure.get(`/payments?email=${user.email}`);
         return res.data;
        }
    });

    if(isPending){
        return <Loader/>
    }

  return (
    <div className="px-6 py-10  rounded-xl min-h-screen ">
      <h2 className="text-2xl font-extrabold mb-4 text-secondary">Payment History</h2>
      <table className="table w-full text-sm rounded-xl bg-white">
        <thead className="bg-primary font-bold text-gray-700 ">
          <tr>
            <th>#</th>
            <th>Parcel Id</th>
            <th>Date</th>
            <th>Tracking ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.parcelId}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
              <td className="font-medium">{payment.transactionId || "-"}</td>
              <td className="text-primary font-semibold">৳{payment.amount}</td>
              <td>{payment.method?.[0]?.toUpperCase() || payment.method}</td>
              <td className="truncate max-w-[160px]">{payment.transactionId}</td>
              <td className="text-green-600 font-bold flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Paid
              </td>
            </tr>
          ))}
          {
            payments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No payment found.</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default PaymentHistory