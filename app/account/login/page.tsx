import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm'; // Your client component

export default async function LoginPage() {
  const supabase = await createClient();

  // Check if user is logged in
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Not logged in, show login form
    return <LoginForm />;
  }

  // Check user role
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('authority')
    .eq('user_id', user.id)
    .single();

  if (roleError || !role) {
    console.error('Role check failed:', roleError?.message);
    // Fallback: redirect to user dashboard
    redirect('/dashboard/user');
  }

  // Redirect based on role
  if (role.authority === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/user');
  }
}