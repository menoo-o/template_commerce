// components/checkout/PaymentSection.tsx
'use client';

import { Elements } from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import StripeCheckoutForm from '@/components/StripeCheckout/StripeCheckoutForm';


interface PaymentSectionProps {
  clientSecret: string | null;
  error: string | null;
  stripePromise: any;
  appearance: Appearance;
  amount: number;
}

export const PaymentSection = ({
  clientSecret,
  error,
  stripePromise,
  appearance,
  amount
}: PaymentSectionProps) => (
  <div className="space-y-4">
    {clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <StripeCheckoutForm clientSecret={clientSecret} amount={amount} />
      </Elements>
    ) : (
      <div className="text-center">
        <p>Loading payment form...</p>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    )}
  </div>
);