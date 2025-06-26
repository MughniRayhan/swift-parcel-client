import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

function Payment() {

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  )
}

export default Payment