
'use server'

// Placeholder for future Stripe server-side logic

export async function handleCheckout(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log("Checkout form submitted:", data);
  return { success: true };
}

// utils/error-handling.ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}


export async function fetchPaymentIntent(amount: number) {
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid amount provided');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create payment intent');
    }

    if (!data.clientSecret) {
      throw new Error('No client secret returned');
    }

    return { clientSecret: data.clientSecret };
  } catch (error: unknown) {
  console.error('Error fetching payment intent:', error);
  throw new Error(getErrorMessage(error));
}
}