// [collectionSlug]/loader.ts
'use server'

import { createClient } from '@/utils/supabase/server';
import { SingleDisplayCard } from '@/lib/types/types';
import { unstable_cache } from 'next/cache';



export const SinglePageData = unstable_cache (
  async (slug: string): Promise<{ product: SingleDisplayCard | null }> => {
  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      image_url,
      price,
      description,
      collection_id,
      product_variants (
        id,
        size,
        price
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (productError || !product) {
    console.error("Error fetching product:", productError?.message);
    throw new Error("Product not found");
  }

  return { product };
}, 

  ['SinglePageData'],
  {
    revalidate: 3000, // Cache for 50 minutes
    tags: ['supabase', 'collections'], // Global tags for revalidation
  }
);


