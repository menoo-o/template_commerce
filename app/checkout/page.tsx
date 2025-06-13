// app/checkout/page.tsx
'use client';

import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { useState, useEffect, useRef } from 'react';
import { fetchPaymentIntent } from './actions';

import { loadStripe } from '@stripe/stripe-js';
import type { Appearance } from '@stripe/stripe-js';

import { DeliveryAddressForm } from "@/components/checkout/DeliveryAddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import EmailInfo from "@/components/checkout/EmailInfo";




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);


export default function CheckoutPage() {

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
          <EmailInfo />

        <h2 className="text-2xl font-bold text-orange-600">Delivery Address</h2>

        <DeliveryAddressForm  />

        <h2 className="text-2xl font-bold text-orange-600 pt-4">Payment Information</h2>

        <PaymentSection
          clientSecret={clientSecret}
          error={error}
          stripePromise={stripePromise}
          appearance={appearance}
          amount={amount}
        />
      </div>

      {/* RIGHT: Order Summary */}
      <OrderSummary shipping={shipping} />

    </div>
  );
}