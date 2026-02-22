'use server'

import { createClient } from '@/utils/supabase/server';

interface ProjectRow {
  project: string;
}

type ApiResponse =
  | { success: true; data: ProjectRow[] }
  | { success: false; message: string };

export async function supabaseApiCall(): Promise<ApiResponse> {
  try{
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('API_Call')
    .select('project');
    
  if (error) {
    return{
      success:false,
      message:"Db is temp unavailable",
    }
  }
  return{
    success:true,
    data,
  }
}catch(err){
  const errorMsg = err instanceof Error ? err.message : String(err);
  return{
    success:false,
    // make use of catch (err)
    message:errorMsg 
  }
}
}
