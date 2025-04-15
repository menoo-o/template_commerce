"use server";


import { LoginState } from "@/lib/types/types";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(prevState: LoginState, formData: FormData):  Promise<LoginState> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate input
  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  // Sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Get user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Failed to retrieve user.' };
  }

  // Check role
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('authority')
    .eq('user_id', user.id)
    .single();

  if (roleError || !role) {
    console.error('Role check failed:', roleError?.message);
    return { error: 'Unable to determine user role.' };
  }

  // Redirect based on role
  if (role.authority === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/user');
  }
}