import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// This route fetches all collections from the Supabase database
// and returns them as a JSON response.

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('collections')
      .select('id, name, slug, description, image_url');
    
    if (error) {
      console.error('Error fetching collections:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
    
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}