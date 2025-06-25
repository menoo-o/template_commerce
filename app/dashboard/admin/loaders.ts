'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {GuestOrder} from '@/lib/types/types'; // Adjust the import path as necessary

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_confirmed_at: string | null;
}



/**
 * Fetches data for the admin dashboard, including clients and guest orders.
 * Redirects to login if the user is not authenticated.
 *
 * @returns {Promise<{ clients: Client[], guestorders: GuestOrder[] }>} The clients and guest orders data.
 */
export async function getAdminDashboardData(): Promise<{ clients: Client[]; guestorders: GuestOrder[] }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/account/login');
  }

  // Fetch clients
  let clients: Client[] = [];
  const { data: clientData, error: clientsError } = await supabase
    .from('userinfo')
    .select('id, first_name, last_name, email, email_confirmed_at')
    .order('last_name', { ascending: true });

  if (clientsError) {
    console.error('❌ Failed to fetch clients:', clientsError.message);
  } else {
    clients = clientData || [];
  }

  // Fetch guest orders
  let guestorders: GuestOrder[] = [];
  const { data: guestData, error: orderError } = await supabase
    .from('guest_orders')
    // select all fields
    .select('*')

  if (orderError) {
    console.error('❌ Failed to fetch guest orders:', orderError.message);
  } else {
    guestorders = guestData || [];
  }

  return { clients, guestorders };
}