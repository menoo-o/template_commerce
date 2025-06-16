// app/checkout/page.tsx
'use client';

import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { useState, useEffect, useRef } from 'react';
import { fetchPaymentIntent } from './actions';

import { loadStripe } from '@stripe/stripe-js';
import type { Appearance } from '@stripe/stripe-js';

import DeliveryAddressForm from "@/components/checkout/DeliveryAddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentSection, StripeCheckoutForm } from '@/components/StripeCheckout/StripeCheckoutForm';

// Email
import { EmailFormValues } from "@/lib/types/types";
import { useForm, SubmitHandler } from 'react-hook-form'
import EmailInfo from "@/components/checkout/EmailInfo";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


export default function CheckoutPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm<EmailFormValues>({
    defaultValues: {
      email: '',
      emailOffers: false,
    },
  })

  const onSubmit: SubmitHandler<EmailFormValues> = (data) => {
    console.log('Form data:', data)
    // API call would go here
  }
  // State for delivery address fields
  // (These will be passed down to DeliveryAddressForm component)
  // const [fName, setFName] = useState('');
  // const [lName, setLName] = useState('');
  // const [addressLine1, setAddressLine1] = useState('');
  // const [addressLine2, setAddressLine2] = useState('');
  // const [city, setCity] = useState('');
  // const [postcode, setPostcode] = useState('');
  // const [phone, setPhone] = useState('');



  
const stripeFormRef = useRef<StripeCheckoutForm>(null); // Ref for PaymentSection
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const shipping = 10;
  const { getTotalPrice } = useCartStore();

  const amount = getTotalPrice() + shipping;
  const amountRef = useRef(amount);

  useEffect(() => {
    amountRef.current = amount; // Update ref on every render
  }, [amount]);

  useEffect(() => {
    async function loadPaymentIntent() {
      try {
        const { clientSecret } = await fetchPaymentIntent(amountRef.current);
        setClientSecret(clientSecret);
      } catch {
        setError('Failed to load payment form');
      }
    }

    loadPaymentIntent();
  }, []); // Run once on mount

  // // Example: Trigger payment programmatically
  const handleProgrammaticPayment = async () => {
    if (stripeFormRef.current) {
      const result = await stripeFormRef.current.handleStripePayment();
      if (result.success) {
        console.log('Payment succeeded:', result.paymentIntentId);
      } else {
        console.log('Payment failed');
      }
    }
  };

  const appearance: Appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      colorPrimary: '#f97316',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
    },
    
}
    
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* LEFT: Delivery Info */}
      {/* Breadcrumb on top of checkout page, ..? > cart > payment */}
      <div className="space-y-6">
        
           <div className="flex items-center text-sm text-gray-400 space-x-2 mb-6">
            <Link 
              href="/" 
              className="hover:underline text-black font-medium">
                Home    
            </Link>
            <span>{'>'}</span>
            <Link href="/cart" className="hover:underline text-black font-medium">Your Cart</Link>
            <span>{'>'}</span>
            <span className="text-orange-500 font-semibold">Payment</span>
          </div>

          {/* Contact(email) Info  */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <EmailInfo register={register} errors={errors} />
              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              >
             {isSubmitting ? 'Submitting...' : 'Place Order'}
             </button>
          </form>

        <h2 className="text-2xl font-bold text-orange-600">Delivery Address</h2>

        {/* <DeliveryAddressForm
          fName={fName}
          setFName={setFName}
          lName={lName}
          setLName={setLName}
          addressLine1={addressLine1}
          setAddressLine1={setAddressLine1}
          addressLine2={addressLine2}
          setAddressLine2={setAddressLine2}
          city={city}
          setCity={setCity}
          postcode={postcode}
          setPostcode={setPostcode}
          phone={phone}
          setPhone={setPhone}  
          onSubmit={handleSubmit} // Pass submit handler
        /> */}

        <h2 className="text-2xl font-bold text-orange-600 pt-4">Payment Information</h2>

        <PaymentSection
          ref={stripeFormRef}
          clientSecret={clientSecret}
          error={error}
          stripePromise={stripePromise}
          appearance={appearance}
          amount={amount}
        />
        {/* Example button to test ref */}
        <button
          onClick={handleProgrammaticPayment}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Pay Programmatically
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <OrderSummary shipping={shipping} />

    </div>
  );
}