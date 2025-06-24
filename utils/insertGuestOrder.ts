import { createClient } from '@/utils/supabase/server';
import { CartItem } from '@/lib/types/types';

type GuestOrder = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postcode: string;
  cart?: CartItem[];
  stripe_payment_intent_id: string;
};

export async function insertGuestOrder(params: GuestOrder) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('guest_orders')
    .insert([
      {
        ...params,
        // country: 'UK', // auto-inserted or can be explicit
        // order_status: 'processing', // optional if default
      },
    ]);

  if (error) {
    console.error('Error inserting guest order:', error.message);
    throw new Error('Failed to insert guest order');
  }

  return data;
}
