// [collectionSlug]/loader.ts
'use server'

import { createClient } from '@/utils/supabase/server';
import { CollectionHero } from '@/lib/types/types';
import { SingleDisplayCard } from '@/lib/types/types';


export async function SinglePageData(slug: string): Promise<{ product: SingleDisplayCard| null, collection: CollectionHero | null }> {
    const supabase = await createClient();
  
    // Step 1: Get product by slug
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
  
    if (productError || !product) {
      console.error('Error fetching product:', productError?.message);
      throw new Error('Product not found');
    }
  
    // Step 2: Get related collection
    const { data: collection, error: collectionError } = await supabase
      .from('collections')
      .select('*')
      .eq('id', product.collection_id)
      .single();
  
    if (collectionError) {
      console.error('Error fetching collection:', collectionError.message);
    }
  
    return { product, collection };
  }
  