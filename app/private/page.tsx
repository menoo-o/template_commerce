import LogoutButton from "./LogoutButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PrivatePage() {
  const supabase = await createClient();
   // ✅ Step 1: Check user is authenticated
   const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/account/login");
  }

  // ✅ Step 2: Fetch user's info from 'userinfo' table (assumes `id` is the user ID)
  const { data: info, error: infoError } = await supabase
    .from("userinfo")
    .select("*")
    .eq("id", user.id) // match based on logged-in user
    .single(); // since you expect only 1 row

  if (infoError) {
    console.error("Failed to fetch userinfo:", infoError.message);
  }

  return (
    <>
      <p>Hello {user.email}</p>

      {info && (
        <div className="mt-4">
          <p>👤 Name: {info.first_name} {info.last_name}</p>
          <p>🧾 Role: {info.authority}</p>
        </div>
      )}

      <br />
      <LogoutButton /> {/* Your client component */} 
      <br /><br />
      <Link href='/dashboard/admin'>Continue to dashboard</Link>
    </>
  );
}