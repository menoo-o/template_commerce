import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing');

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not defined');
    return NextResponse.json(
      { error: 'Server configuration error: STRIPE_SECRET_KEY missing' },
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // £10 in pence
      currency: 'gbp',
      payment_method_types: ['card'],
    });

    console.log('Payment Intent created:', paymentIntent.id);
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error('Stripe Error:', {
      message: error.message,
      type: error.type,
      name: error.name,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: `Failed to create payment intent: ${error.message}` },
      { status: 500 }
    );
  }
}