// export default function StripeCheckoutForm({ clientSecret, amount, paymentIntentId }: CheckoutFormProps) {
//   return <PaymentForm clientSecret={clientSecret} amount={amount} paymentIntentId={paymentIntentId} />;
// }


// function PaymentForm({ clientSecret, amount }: CheckoutFormProps) {
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

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setMessage(submitError.message ?? 'Please complete the payment form.');
//       setIsLoading(false);
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'http://localhost:3000/success', // Update for production
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       setMessage(error.message ?? 'An unexpected error occurred.');
//       setIsLoading(false);
//     } else if (paymentIntent?.status === 'succeeded') {
//       window.location.href = `/success?paymentIntentId=${paymentIntent.id}`;
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

//       {/* this is the btn i mentioned that exists inside here */}
//       <button
//         type="submit"
//         disabled={isLoading || !stripe || !elements}
//         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex justify-center items-center"
//       >
//         {isLoading ? (
//             <span className="loader"></span> // will add loading spinner later
//         ) : (
//           `Pay ${formattedAmount}`
//         )}
//       </button>
//       {message && <div className="text-red-600 text-center">{message}</div>}
//     </form>
//   );
// }