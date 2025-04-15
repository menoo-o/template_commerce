'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getUserInfo() {
  const supabase = await createClient();

  // Step 1: Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/account/login');
  }

  // Step 2: Fetch user's info from userinfo
  const { data: info, error: infoError } = await supabase
    .from('userinfo')
    .select('id, first_name, last_name, email, email_confirmed_at')
    .eq('id', user.id)
    .single();

  if (infoError) {
    console.error('Failed to fetch userinfo:', infoError.message);
    return null; // Or redirect to an error page
  }

  return info;
}