import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";
import UseAuth from "../../../Hooks/UseAuth";

const CompletedDeliveries = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();

  // Fetch completed deliveries
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/${user?.email}/completed-tasks`);
      return res.data;
    },
  });

  // Cash out mutation
  const cashOutMutation = useMutation({
    mutationFn: async (parcelId) => {
      return axiosSecure.patch(`/parcels/${parcelId}/cashout`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["completedDeliveries", user?.email]);
      Swal.fire("Success", "Cash Out done!", "success");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className=" px-12 py-10 bg-white rounded-2xl shadow-md min-h-screen">
      <h2 className="text-3xl font-extrabold text-secondary mb-2">Completed Deliveries</h2>

       <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary font-bold text-gray-700">
            <tr>
              <th>Parcel ID</th>
              <th>Picked Time</th>
              <th>Delivered Time</th>
              <th>Cost (৳)</th>
              <th>Earning (৳)</th>
              <th>Cashout</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => {
              const sameDistrict = parcel.sender_region === parcel.receiver_region;
              const earning = sameDistrict
                ? parcel.cost * 0.3
                : parcel.cost * 0.5;

              return (
                <tr key={parcel._id}>
                  <td>{parcel._id}</td>
                  <td>{parcel.picked_time ? new Date(parcel.picked_time).toLocaleString() : "N/A"}</td>
                  <td>{parcel.delivered_time ? new Date(parcel.delivered_time).toLocaleString() : "N/A"}</td>
                  <td>৳{parcel.cost}</td>
                  <td>৳{earning.toFixed(2)}</td>
                  <td>
                    {parcel.cashout_status === "cashed_out" ? (
                      <span className="text-green-600 font-semibold">Cashed Out</span>
                    ) : (
                      <button
                        className="btn  btn-success"
                        onClick={() => {
                          Swal.fire({
                            title: "Confirm Cash Out",
                            text: `Cash out ৳${earning.toFixed(2)}?`,
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Yes, cash out",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              cashOutMutation.mutate(parcel._id);
                            }
                          });
                        }}
                      >
                        Cash Out
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
