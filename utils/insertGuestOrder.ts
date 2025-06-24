import { createClient } from '@/utils/supabase/server';
import { GuestOrder } from '@/lib/types/types';

export async function insertGuestOrder(params: Omit<GuestOrder, 'cart'> & {
  cart: string // Serialize cart to JSON string
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('guest_orders')
    .insert([
      {
        ...params,
        // country: 'UK', // auto-inserted or can be explicit
        // order_status: 'processing', // optional if default
         cart: JSON.stringify(params.cart), // Ensure cart is serialized
      },
    ]);

  if (error) {
    console.error('Error inserting guest order:', error.message);
    throw new Error('Failed to insert guest order');
  }

  return data;
}
