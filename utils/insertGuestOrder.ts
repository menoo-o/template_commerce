'use server';

import { createClient } from '@/utils/supabase/server';
import { GuestOrder } from '@/lib/types/types';

export async function insertGuestOrder(params: GuestOrder) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('guest_orders')
    .insert([
      {
        ...params,
        
      },
    ]);

  if (error) {
    console.error('Error inserting guest order:', error.message);
    throw new Error('Failed to insert guest order');
  }

  return data;
}
