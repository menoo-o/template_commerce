// 'use server';

// import { createClient } from '@/utils/supabase/server';
// import { CollectionCard } from '@/lib/types/types';
// // import { unstable_cache } from 'next/cache';
// // import { SupabaseClient } from '@supabase/supabase-js';


// // Cached function to fetch all collections
// // Fetch collections data with provided Supabase client

// // async function fetchCollectionsInfo(supabase: SupabaseClient): Promise<CollectionCard[] | null> {
// //   const { data, error } = await supabase
// //     .from('collections')
// //     .select('id, name, slug, description, image_url');

// //   if (error) {
// //     console.error('Error fetching collections:', error.message);
// //     return null;
// //   }

// //   return data;
// // }

// // // Cached function
// // export const getCollectionsInfo = async (): Promise<CollectionCard[] | null> => {
// //   const supabase = await createClient();
// //   const cachedFetchCollectionsInfo = unstable_cache(
// //     fetchCollectionsInfo,
// //     ['getCollectionsInfo'],
// //     {
// //       revalidate: 300, // Cache for 5 minutes
// //       tags: ['supabase', 'collections'],
// //     }
// //   );
// //   return cachedFetchCollectionsInfo(supabase);
// // };

// export const getCollectionsInfo = async (): Promise<CollectionCard[] | null> => {
//   const supabase = await createClient();
  
//   const { data, error } = await supabase
//     .from('collections')
//     .select('id, name, slug, description, image_url');

//   if (error) {
//     console.error('Error fetching collections:', error.message);
//     return null;
//   }

//   return data;
// };