"use server";
import { createClient } from "@/utils/supabase/server";

export async function sendResetEmail(email: string) {
  const supabase = await createClient();

//  Send reset password email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/account/update-password`,
  });

  return { error: error?.message || null };
}
