import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

// Helper function to split full_name
function splitName(fullName?: string): { firstName: string; lastName: string } {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: 'Unknown', lastName: 'Unknown' };
  }
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'Unknown' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || 'Unknown',
  };
}

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
    const metadata = user.user_metadata;
    const { firstName: splitFirst, lastName: splitLast } = splitName(metadata?.full_name);

    // Upsert with smarter name extraction
    const { error: upsertError } = await supabase
      .from('userinfo')
      .upsert({
        id: user.id,
        email: user.email,
        first_name: metadata?.first_name || metadata?.given_name || splitFirst,
        last_name: metadata?.last_name || metadata?.family_name || splitLast,
      });

    if (upsertError) {
      console.error('Upsert error:', upsertError.message);
      // Log but proceed
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