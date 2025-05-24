import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not defined');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // £10 in pence
      currency: 'gbp',
      payment_method_types: ['card'], // Restrict to card payments
    });

    console.log('Payment Intent created:', paymentIntent.id);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}


