// app/checkout/page.tsx
'use client';

import { useCartStore } from "@/stores/useCartStore";
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { DeliveryAddressForm } from "@/components/checkout/DeliveryAddressForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import type { Appearance } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [placeType, setPlaceType] = useState("residential");
  const shipping = 10;
  const { cart } = useCartStore();

  const amount = cart.reduce((sum, item) => {
    const itemPrice = item.variant?.price ?? item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0) + shipping;

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to load payment form');
        }
      })
      .catch((err) => {
        setError('Network error occurred')
        console.error('Error fetching client secret:', err);
      });
  }, [cart, amount]);

  const appearance: Appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      colorPrimary: '#f97316',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* LEFT: Delivery Info */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-orange-600">Delivery Address</h2>
        <DeliveryAddressForm placeType={placeType} setPlaceType={setPlaceType} />

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