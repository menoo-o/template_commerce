'use server';

import { createClient } from '@/utils/supabase/server';
import { CollectionCard } from '@/lib/types/types';
import { unstable_cache } from 'next/cache';


// Cached function to fetch all collections
export const getCollectionsInfo = unstable_cache(
  async (): Promise<CollectionCard[] | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('collections')
      .select('id, name, slug, description, image_url');

    if (error) {
      console.error('Failed to fetch collections:', error.message);
      return null;
    }

    return data;
  },
  ['getCollectionsInfo'],
  {
    revalidate: 3000, // Cache for 5 minutes
    tags: ['supabase', 'collections'], // Tags for revalidation
  }
);
