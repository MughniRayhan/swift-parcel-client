import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import useAddTrackingEvent from '../../../Hooks/useAddTrackingEvent';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false); 
  const { id } = useParams();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { mutate: addTrackingEvent } = useAddTrackingEvent();

  const { data: parcelInfo = {}, isPending } = useQuery({
    queryKey: ['parcels', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loader />;
  }

  const amount = parcelInfo.cost * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || processing) {
      return;
    }

    setProcessing(true); 

    try {
      const card = elements.getElement(CardElement);
      if (!card) {
        setProcessing(false);
        return;
      }

      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (cardError) {
        setError(cardError.message);
        setProcessing(false);
        return;
      }

      // Create payment intent on server
      const res = await axiosSecure.post('/create-payment-intent', {
        amount: amount,
        parcelId: id,
      });

      const clientSecret = res.data.clientSecret;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log("Payment succeeded", result.paymentIntent);
          const transactionId = result.paymentIntent.id;

          const paymentData = {
            parcelId: id,
            email: user.email,
            amount,
            method: result.paymentIntent.payment_method_types,
            transactionId: transactionId,
          };

          const paymentRes = await axiosSecure.post('/payments', paymentData);

          if (paymentRes.data.insertedId) {
            addTrackingEvent({
              tracking_id: parcelInfo.tracking_id,
              event: "paid",
              remarks: "Payment successful for parcel.",
            });

            await Swal.fire({
              icon: 'success',
              title: 'Payment successful',
              html: `<strong>Transaction Id:</strong> <code>${transactionId}</code>`,
              confirmButtonText: 'Go to My Parcels',
            });

            navigate('/dashboard/myParcels');
          }
        }
        setProcessing(false);
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setError("Payment failed. Try again.");
      setProcessing(false);
    }
  };

  return (
    <div className='w-full mx-auto p-8 bg-white rounded-xl shadow min-h-screen'>
      <h2 className="text-2xl text-secondary font-bold mb-4 text-center">Pay for {parcelInfo.title}</h2>
      <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md'>
        <CardElement className='border border-gray-300 p-4 rounded-md focus:outline-none focus:border-primary' />
        <button
          type='submit'
          className={`btn bg-primary w-full mt-4 font-bold ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!stripe || !elements || processing}
        >
          {processing ? (
            <Loader/>
          ) : (
            `Pay $${parcelInfo?.cost}`
          )}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default CheckoutForm;
