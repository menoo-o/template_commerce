'use client';

import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import StripeCheckoutForm from "@/components/StripeCheckout/StripeCheckoutForm";

// Load Stripe with publishable key
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Public key not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [placeType, setPlaceType] = useState("residential");
  const shipping = 10;
  const { cart } = useCartStore();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: cart.reduce((sum, item) => {
          const itemPrice = item.variant?.price ?? item.product.price;
          return sum + itemPrice * item.quantity;
        }, 0) + shipping
      })
    })
      .then((res) => {
        console.log('Fetch response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Fetch response data:', data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('No client secret received:', data);
          setError(data.error || 'Failed to load payment form');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Network error occurred');
      });
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.variant?.price ?? item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

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
    <form action="/checkout" method="POST" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* LEFT: Delivery Info */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-orange-600">Delivery Address</h2>

        <div className="space-y-2">
          <label className="font-medium text-black">What kind of place is this going to?</label>
          <div className="flex flex-wrap gap-3">
            {["residential", "office", "restaurant", "other"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPlaceType(type)}
                className={`px-4 py-2 border rounded-full text-sm capitalize transition ${
                  placeType === type
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Basic fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-black font-medium">Country/Region</label>
            <input type="text" defaultValue="United Kingdom" className="w-full p-2 mt-1 border border-gray-300 rounded" readOnly />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-black font-medium">First Name</label>
            <input type="text" name="firstName" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-medium">Last Name</label>
            <input type="text" name="lastName" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
          </div>
        </div>

        <div>
          <label className="text-sm text-black font-medium">House Number & Street Address</label>
          <input type="text" name="street" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
        </div>

        <div>
          <label className="text-sm text-black font-medium">Address Line 2 <span className="text-gray-500">(optional)</span></label>
          <input type="text" name="address2" className="w-full p-2 mt-1 border border-gray-300 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-black font-medium">City</label>
            <input type="text" name="city" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="text-sm text-black font-medium">Postcode</label>
            <input type="text" name="postcode" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
          </div>
        </div>

        <div>
          <label className="text-sm text-black font-medium flex items-center gap-2">
            UK Phone Number
            <Popover>
              <PopoverTrigger>
                <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="text-sm text-gray-700 max-w-xs">
                In case we need to contact you about your delivery.
              </PopoverContent>
            </Popover>
          </label>
          <input type="tel" name="phone" className="w-full p-2 mt-1 border border-gray-300 rounded" required />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="email-offers" name="emailOffers" />
          <label htmlFor="email-offers" className="text-sm text-gray-700">
            Email me with news and offers
          </label>
        </div>

        <h2 className="text-2xl font-bold text-orange-600 pt-4">Payment Information</h2>

        <div className="space-y-4">
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <StripeCheckoutForm clientSecret={clientSecret} />
            </Elements>
          ) : (
            <div className="text-center">
              <p>Loading payment form...</p>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-black">Your Order</h2>

        <div className="space-y-4 border-b pb-4">
          {cart.map((item, index) => (
            <div key={`${item.product.id}-${item.variant?.id ?? 'base'}-${index}`} className="flex justify-between text-sm text-gray-700">
              <span>
                {item.product.name}
                {item.variant?.size && ` (${item.variant.size})`} x{item.quantity}
              </span>
              <span>${((item.variant?.price ?? item.product.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="text-right text-sm">
            <Link href="/cart" className="text-orange-500 hover:underline">Change</Link>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-black">
            <span>Total</span>
            <span>${(subtotal + shipping).toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold">
          Confirm Payment
        </button>
      </div>
    </form>
  );
}