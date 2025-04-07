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

   // Step 1: Sign up with metadata
   const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastname
      }
    }
  });


   // Immediately update user_info if needed
   if (data.user) {
    await supabase
      .from('userinfo')
      .upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastname,
        email: email
      });
  }


if (error) {
 return { error: error.message }; // Return error back to UI
}

redirect("/account/login"); // Redirect on success
}
