'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getAdminDashboardData() {
  const supabase = await createClient();

  // Step 1: Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/account/login');
  }

  // Step 2: Check if user is admin
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('authority')
    .eq('user_id', user.id)
    .single();

  if (roleError || role?.authority !== 'admin') {
    console.error('Access denied: Not an admin', roleError?.message);
    redirect('/dashboard/user'); // Redirect non-admins to user dashboard
  }

  // Step 3: Fetch all clients from userinfo
  const { data: clients, error: clientsError } = await supabase
    .from('userinfo')
    .select('id, first_name, last_name, email, email_confirmed_at')
    .order('last_name', { ascending: true });

  if (clientsError) {
    console.error('Failed to fetch clients:', clientsError.message);
    return [];
  }

  return clients;
}