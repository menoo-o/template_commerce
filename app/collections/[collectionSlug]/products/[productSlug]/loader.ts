// [collectionSlug]/loader.ts
'use server'

import { createClient } from '@/utils/supabase/server';

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
}
export interface SingleDisplayCard {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  price: number;
  description: string;
  collection_id: string;
  product_variants?: ProductVariant[];
}





export async function SinglePageData(slug: string): Promise<{ product: SingleDisplayCard | null }> {
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
}
