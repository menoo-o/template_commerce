'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LoginState } from '@/lib/types/types';

// Reusable function to check role and redirect
export async function getUserRoleAndRedirect() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/account/login');
  }

  // Check role
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('authority')
    .eq('user_id', user.id)
    .single();

  if (roleError || !role) {
    console.error('Role check failed:', roleError?.message);
    redirect('/dashboard/user'); // Fallback to user dashboard
  }

  // Redirect based on role
  if (role.authority === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/user');
  }
}

// Login action
export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Use reusable redirect function
  await getUserRoleAndRedirect();

  // Never reached due to redirect, but satisfies TypeScript

}