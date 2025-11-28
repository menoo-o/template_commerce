'use server'

import { createClient } from '@/utils/supabase/server';

export async function supabaseApiCall(){
  const supabase = await createClient();
  const { data, error } = await supabase
  .from('API_Call')
  .select('project');

    if (error) {
        console.error('Supabase API Call Error:', error.message);
        throw new Error('Failed to fetch data from Supabase');
    }

    return data;
}