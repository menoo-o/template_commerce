import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/private'; // Default redirect to /private

  // If no code is provided, redirect to login with error
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const supabase = await createClient();

  // Exchange OAuth code for session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error('Code exchange error:', error.message);
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Handle successful auth
  const user = data.user;
  if (user) {
    const { email, id } = user;
    const metadata = user.user_metadata; // Google profile data
    const firstName = metadata.given_name || metadata.first_name || 'Unknown';
    const lastName = metadata.family_name || metadata.last_name || 'Unknown';

    // Upsert into userinfo
    const { error: upsertError } = await supabase
      .from('userinfo')
      .upsert({
        id,
        first_name: firstName,
        last_name: lastName,
        email,
      });

    if (upsertError) {
      console.error('Upsert error:', upsertError.message);
      // Log but proceed—upsert failure shouldn’t block login
    }
  }

  // Redirect based on environment
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