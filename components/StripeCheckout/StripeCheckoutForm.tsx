
'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeFormProps, PaymentSectionProps, StripeCheckoutFormRef } from '@/lib/types/types';





// StripeCheckoutForm Component
const StripeCheckoutForm = forwardRef<StripeCheckoutFormRef, StripeFormProps>(
  ({ clientSecret}, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false); // Renamed to reflect internal use

    const handleStripePayment = async () => {
      if (!stripe || !elements) {
        setMessage('Payment form not loaded.');
        return { success: false };
      }

      setIsProcessing(true);
      
      try {
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setMessage(submitError.message ?? 'Please complete the payment form.');
          return { success: false };
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          clientSecret,
          redirect: 'if_required',
        });

        if (error) {
          setMessage(error.message ?? 'An unexpected error occurred.');
          return { success: false };
        }

        if (paymentIntent?.status === 'succeeded') {
          setMessage('Payment successful!');
          return { success: true, paymentIntentId: paymentIntent.id };
        }

        return { success: false };
      } finally {
        setIsProcessing(false);
      }
    };

    useImperativeHandle(ref, () => ({
      handleStripePayment,
      isProcessing, // Expose if parent component needs to know processing state
    }));

    return (
      <>
        <div className="border p-3 rounded-md">
          <PaymentElement />
        </div>
        {message && <div className="text-orange-600 text-center">{message}</div>}
      </>
    );
  }
);

StripeCheckoutForm.displayName = 'StripeCheckoutForm';

// PaymentSection Component
export const PaymentSection = forwardRef<StripeCheckoutFormRef, PaymentSectionProps>(
  ({ clientSecret, error, stripePromise, appearance, amount }, ref) => {
    return (
      <div className="space-y-4">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <StripeCheckoutForm
              ref={ref}
              clientSecret={clientSecret}
              amount={amount}
              paymentIntentId=""
            />
          </Elements>
        ) : (
          <div className="text-center">
            {/* <p>Loading payment form...</p> */}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

PaymentSection.displayName = 'PaymentSection';

export default StripeCheckoutForm;
