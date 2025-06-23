// [collectionSlug]/loader.ts
'use server'

import { createClient } from '@/utils/supabase/server';
import { CollectionHero } from '@/lib/types/types';
import { ProductCard } from '@/lib/types/types';

//collections
      //-[collectionSlug]/loader.ts
export async function getCollectionPageData(slug: string): Promise<{ collection: CollectionHero | null, products: ProductCard[] }>{
  const supabase = await createClient();

  // Step 1: Get collection by slug
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('id, name, slug, description, image_url')
    .eq('slug', slug)
    .single();

  if (collectionError || !collection) {
    console.error('Error fetching collection:', collectionError?.message);
    throw new Error('Collection not found');
  }

  // Step 2: Get products by collection_id
  const { data: products, error: productError } = await supabase
    .from('products')
    .select('name, slug, image_url, price')
    .eq('collection_id', collection.id);

  if (productError) {
    console.error('Error fetching products:', productError.message);
    throw new Error('Failed to fetch products');
  }

  return { collection, products };
}
