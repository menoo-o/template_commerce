import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/private';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development'; // Boolean, not a string!!

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`); // e.g., http://localhost:3000/private
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`); // e.g., https://template-setup.vercel.app/private
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}