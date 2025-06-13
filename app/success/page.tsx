'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('paymentIntentId')
    if (id) {
      setPaymentIntentId(id)
      console.log('Success Page Payment Intent ID:', id)
    }
  }, [searchParams])

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