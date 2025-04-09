// app/auth/confirm/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/login'; // Changed to /login

  if (!code) {
    return NextResponse.redirect(`${origin}/error?reason=missing_code`);
  }

  const supabase = await createClient();

  // Optional: Check if user is verified (Supabase already did this via code)
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.error('User fetch error:', error?.message);
    return NextResponse.redirect(`${origin}/error?reason=auth_failed`);
  }

  // Redirect to login page
  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocalEnv = process.env.NODE_ENV === 'development';

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}