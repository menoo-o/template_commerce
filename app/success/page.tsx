'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useCartStore } from '@/stores/useCartStore';

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const { clearCart}  = useCartStore();

useEffect(() => {
  const id = searchParams.get('paymentIntentId')
  if (id) {
    setPaymentIntentId(id)
    clearCart(); // Now safe to do it
    console.log('Success Page Payment Intent ID:', id)
  }
}, [searchParams, clearCart])


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      {paymentIntentId ? (
        <p>Payment ID: {paymentIntentId}</p>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading payment confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  )
}