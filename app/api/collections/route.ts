import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// This route fetches all collections from the Supabase database
// and returns them as a JSON response.
export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('collections')
        .select('id, name, slug, description, image_url');
    
      if (error) {
        console.error('Error fetching collections:', error.message);
        return null;
      }
    return NextResponse.json(data)
}