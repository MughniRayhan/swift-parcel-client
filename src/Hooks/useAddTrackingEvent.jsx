import { useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const useAddTrackingEvent = () => {
  const axiosSecure = UseAxiosSecure();

  return useMutation({
    mutationFn: async ({ tracking_id, event, remarks }) => {
      const res = await axiosSecure.post("/tracking", {
         tracking_id, 
         event, 
         remarks 
        });
      return res.data;
    }
    
  });
};

export default useAddTrackingEvent;
