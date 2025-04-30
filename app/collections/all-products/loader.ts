'use server';

import { createClient } from '@/utils/supabase/server';
import { CollectionCard } from '@/lib/types/types';


export async function getCollectionsInfo(): Promise<CollectionCard[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('collections')
    .select('*');

  if (error) {
    console.error('Failed to fetch collections:', error.message);
    return null;
  }

  return data;
}
