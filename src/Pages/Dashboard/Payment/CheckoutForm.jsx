import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
     const [error, setError] =useState('');
    const {id} = useParams();
    const {user} = UseAuth();
    const navigate = useNavigate()
    const axiosSecure = UseAxiosSecure();

    const {data: parcelInfo={}, isPending} = useQuery({ 
        queryKey: ['parcels', id], 
        queryFn: async () => {
           const res = await axiosSecure.get(`/parcels/${id}`);
           return res.data;
        } 
    })
   
    if (isPending) {
        return <Loader/>
    }

    console.log(parcelInfo);
    const amount=parcelInfo.cost*100;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
         const card = elements.getElement(CardElement);

         if (!card) {
            return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Payment method created successfully:', paymentMethod);
    }

    const res = await axiosSecure.post('/create-payment-intent', {
      amount: amount, 
      parcelId: id
    });
 
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
        
      },
      
    });

    if(result.error){
      console.log(result.error.message)
    }else{
      if(result.paymentIntent.status==='succeeded'){
        console.log("payment succeeded", result.paymentIntent);
        const transactionId = result.paymentIntent.id;
        const paymentData = {
          parcelId: id, 
          email: user.email, 
          amount, 
          method: result.paymentIntent.payment_method_types, 
          transactionId: transactionId,
        }
        const paymentRes = await axiosSecure.post('/payments', paymentData);
        if(paymentRes.data.insertedId){
        await Swal.fire({
          icon: 'success',
          title: 'payment successfull',
          html: `<strong>Transaction Id: </strong>  <code>${transactionId}</code>`,
          confirmButtonText: 'Go to My Parcels'
        });
        navigate('/dashboard/myParcels')
        }
      }
    }

    console.log("res from intent",res)
}
  return (
      <div className=' w-full mx-auto p-8 bg-white rounded-xl shadow min-h-screen '>
         <h2 className="text-2xl  text-secondary font-bold mb-4 text-center">Pay for {parcelInfo.title}</h2>
          <form onSubmit={handleSubmit} className='max-w-md w-full mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md'>
      <CardElement className='border border-gray-300 p-4 rounded-md focus:outline-none focus:border-primary' > </CardElement>
        <button type='submit' className='btn bg-primary w-full mt-4 font-bold' disabled={!stripe || !elements}>
            Pay ${parcelInfo?.cost}
        </button>
     {error && <p className="text-red-500">{error}</p>}
    </form>
  
      </div>
  )
}

export default CheckoutForm