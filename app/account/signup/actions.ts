"use server";


import { RegisterState } from "@/lib/types/types";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Signup action function
export async function register( prevState: RegisterState,  formData: FormData): Promise<RegisterState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;

  if (!email || !password || !firstName || !lastname) {
    return { error: "Incomplete Fields" };
  }


 // Step 1: Check if email already exists
//  change this table because auth.users table is not accessible
 const { data: existingUser } = await supabase
 .from("auth.users")
 .select("email")
 .eq("email", email.toLowerCase()) // Ensure case-insensitive check
 .maybeSingle();

if (existingUser) {
 return { error: "Email already in use. Please log in instead or enter a new email." };
}

// Step 2: Proceed with signup
const { error } = await supabase.auth.signUp({ email, password });

if (error) {
 return { error: error.message }; // Return error back to UI
}

redirect("/account/login"); // Redirect on success
}
