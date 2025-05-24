// 'use client';

// import { useState } from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// interface CheckoutFormProps {
//   clientSecret: string;
//   amount: number
// }

// export default function StripeCheckoutForm({ clientSecret, amount }: CheckoutFormProps) {
// return <PaymentForm clientSecret={clientSecret} amount={amount} />;
// }

// function PaymentForm({ clientSecret }: CheckoutFormProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       setMessage('Payment form not loaded.');
//       return;
//     }

//     setIsLoading(true);

//     // Submit the form to validate PaymentElement data
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setMessage(submitError.message ?? 'Please complete the payment form.');
//       setIsLoading(false);
//       return;
//     }

//     // Confirm the payment
//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'http://localhost:3000/success',
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       setMessage(error.message ?? 'An unexpected error occurred.');
//       setIsLoading(false);
//     } else if (paymentIntent?.status === 'succeeded') {
//       window.location.href = '/success';
//     }

//     setIsLoading(false);
//   };

//   // Format amount for display (e.g., 15.5 -> £15.50)
//   const formattedAmount = `£${amount.toFixed(2)}`;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="border p-3 rounded-md">
//         <PaymentElement />
//       </div>
      
//       <button
//         type="submit"
//         disabled={isLoading || !stripe || !elements}
//         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex justify-center items-center"
//       >
//         {isLoading ? (
//           <svg
//             className="animate-spin h-5 w-5 text-white"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
//             />
//           </svg>
//         ) : (
//           `Pay ${amount}`
//         )}
//       </button>
//       {message && <div className="text-red-600 text-center">{message}</div>}
//     </form>
//   );
// }

'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  clientSecret: string;
  amount: number; // Amount in pounds
}

export default function StripeCheckoutForm({ clientSecret, amount }: CheckoutFormProps) {
  return <PaymentForm clientSecret={clientSecret} amount={amount} />;
}

function PaymentForm({ clientSecret, amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setMessage('Payment form not loaded.');
      return;
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message ?? 'Please complete the payment form.');
      setIsLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000/success', // Update for production
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message ?? 'An unexpected error occurred.');
      setIsLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      window.location.href = '/success';
    }

    setIsLoading(false);
  };

  // Format amount for display (e.g., 15.5 -> £15.50)
  const formattedAmount = `£${amount.toFixed(2)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-3 rounded-md">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex justify-center items-center"
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            />
          </svg>
        ) : (
          `Pay ${formattedAmount}`
        )}
      </button>
      {message && <div className="text-red-600 text-center">{message}</div>}
    </form>
  );
}