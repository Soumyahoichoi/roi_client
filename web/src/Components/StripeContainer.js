import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

export default function StripeContainer() {
  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  return (
    
    <Elements stripe={stripeTestPromise}>
      <PaymentForm/>
    </Elements>

  )
}
