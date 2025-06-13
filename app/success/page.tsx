'use client'

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    // Get paymentIntentId from URL query parameter
    const id = searchParams.get('paymentIntentId');
    if (id) {
      setPaymentIntentId(id);
      console.log('Success Page Payment Intent ID:', id); // Log for debugging
    }
  }, [searchParams]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      {paymentIntentId ? (
        <p>Payment ID: {paymentIntentId}</p>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}