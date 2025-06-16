
'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeFormProps, PaymentSectionProps, StripeCheckoutFormRef } from '@/lib/types/types';



// StripeCheckoutForm Component
const StripeCheckoutForm = forwardRef<StripeCheckoutFormRef, StripeFormProps>(
  ({ clientSecret, amount }, ref) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Format amount for display
    const formattedAmount = `£${amount.toFixed(2)}`;

    // Handle payment submission
    const handleStripePayment = async (): Promise<
    {
      success: boolean;
      paymentIntentId?: string;
    }
    > => {
      if (!stripe || !elements) {
        setMessage('Payment form not loaded.');
        return { success: false };
      }

      setIsLoading(true);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setMessage(submitError.message ?? 'Please complete the payment form.');
        setIsLoading(false);
        return { success: false };
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/success'
      : 'https://template-setup.vercel.app/success'
        },
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message ?? 'An unexpected error occurred.');
        setIsLoading(false);
        return { success: false };
      }

      if (paymentIntent?.status === 'succeeded') {
        setMessage('Payment successful!');
        window.location.href = `/success?paymentIntentId=${paymentIntent.id}`;
        return { success: true, paymentIntentId: paymentIntent.id };
      }

      setIsLoading(false);
      return { success: false };
    };

    // Expose handleStripePayment to parent
    useImperativeHandle(ref, () => ({
      handleStripePayment,
    }));

    // Handle form submission
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const result = await handleStripePayment();
    //   if (!result.success) {
    //     // Message is already set in handleStripePayment
    //   }
    // };

    return (
      <>
        <div className="border p-3 rounded-md">
          <PaymentElement />
        </div>
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-550 disabled:bg-gray-400 flex justify-center items-center" >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
            </svg>
          ) : (
            `Pay ${formattedAmount}`
          )}
        </button>
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
