import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server';

// Helper to split full_name (if provided in metadata)
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

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/private';

  if (!token_hash || !type) {
    return NextResponse.redirect(`${origin}/error?reason=missing_params`);
  }

  const supabase = await createClient();

  // Verify the OTP (magic link)
  const { data, error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error || !data.user) {
    console.error('OTP verification error:', error?.message);
    return NextResponse.redirect(`${origin}/error?reason=otp_failed`);
  }

  const user = data.user;
  if (user) {
    const metadata = user.user_metadata;
    const { firstName: splitFirst, lastName: splitLast } = splitName(metadata?.full_name);

    // Upsert into userinfo
    const { error: upsertError } = await supabase
      .from('userinfo')
      .upsert({
        id: user.id,
        email: user.email,
        first_name: metadata?.first_name || metadata?.given_name || splitFirst,
        last_name: metadata?.last_name || metadata?.family_name || splitLast,
        email_confirmed_at: user.email_confirmed_at, // From user object
      });

    if (upsertError) {
      console.error('Upsert error:', upsertError.message);
      // Log but proceed—upsert failure shouldn’t block redirect
    }
  }

  // Redirect to next URL
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