'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import { useCartStore } from '@/stores/useCartStore';
import { fetchPaymentIntent } from './actions';
import { CombinedFormValues, StripeCheckoutFormRef } from '@/lib/types/types';
import EmptyCart from '@/components/checkout/EmptyCart';
import EmailInfo from '@/components/checkout/EmailInfo';
import DeliveryAddressForm from '@/components/checkout/DeliveryAddressForm';
import { PaymentSection } from '@/components/StripeCheckout/StripeCheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { insertGuestOrder } from '@/utils/insertGuestOrder';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const methods = useForm<CombinedFormValues>({
    defaultValues: {
      email: '',
      emailOffers: false,
      fName: '',
      lName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postcode: '',
      phone: '',
    },
  });
  const { formState } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const stripeFormRef = useRef<StripeCheckoutFormRef>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const shipping = 10;
  const { getTotalPrice, cart } = useCartStore();
  const amount = getTotalPrice() + shipping;
  const amountRef = useRef(amount);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  useEffect(() => {
    if (cart.length === 0) return;
    async function loadPaymentIntent() {
      try {
        const { clientSecret } = await fetchPaymentIntent(amountRef.current);
        setClientSecret(clientSecret);
      } catch {
        setError('Failed to load payment form');
      }
    }
    loadPaymentIntent();
  }, [cart.length]);

    const handleProgrammaticPayment = async (data: CombinedFormValues) => {
    if (!stripeFormRef.current || !formState.isValid || amount <= 0) {
      if (amount <= 0) setFormError('Cart total must be greater than £0.');
      return;
    }
    setIsLoading(true);
    setFormError(null);
    try {
      const result = await stripeFormRef.current.handleStripePayment();
      if (result.success && result.paymentIntentId) {
      //  const serializedCart = JSON.stringify(cart); 
       await insertGuestOrder({
        first_name: data.fName,
        last_name: data.lName,
        email: data.email,
        phone: data.phone,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2,
        city: data.city,
        postcode: data.postcode,
        // cart: serializedCart, // Pass serialized cart
        stripe_payment_intent_id: result.paymentIntentId,
      });

        router.push(`/success?paymentIntentId=${result.paymentIntentId}`);
        console.log(data)
      } else {
        setFormError('Payment failed. Please check your payment details.');
    
      }
    } catch {
      setFormError('An error occurred during payment.');
    } finally {
      setIsLoading(false);
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
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      {/* LEFT: Delivery Info */}
      <div className="space-y-6">
        <div className="flex items-center text-sm text-gray-400 space-x-2 mb-6">
          <Link href="/" className="hover:underline text-black font-medium">
            Home
          </Link>
          <span>{'>'}</span>
          <Link href="/cart" className="hover:underline text-black font-medium">
            Your Cart
          </Link>
          <span>{'>'}</span>
          <span className="text-orange-500 font-semibold">Payment</span>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleProgrammaticPayment)} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Contact Information</h2>
              <EmailInfo />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Delivery Address</h2>
              <DeliveryAddressForm />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4">Payment Information</h2>
              <PaymentSection
                ref={stripeFormRef}
                clientSecret={clientSecret}
                error={error}
                stripePromise={stripePromise}
                appearance={appearance}
                amount={amount}
              />
            </div>
            {formError && <div className="text-red-600 text-center">{formError}</div>}
            <button
              type="submit"
              disabled={isLoading || !formState.isValid || amount <= 0}
              className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400 flex justify-center items-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                </svg>
              ) : (
                `Pay £${amount.toFixed(2)}`
              )}
            </button>
          </form>
        </FormProvider>
      </div>

      {/* RIGHT: Order Summary */}
      <OrderSummary shipping={shipping} />
    </div>
  );
}
