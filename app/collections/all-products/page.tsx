//This page shows all collections with their images and names
// It fetches the collections data from the API and displays it in a grid format

export const revalidate = 0; // Revalidate every 60 seconds

import Image from 'next/image';
 import Link from 'next/link';

import { CollectionCard } from '@/lib/types/types';

export default async function AllCollectionsPage() {
  // Fetch collections data
 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getcollections`, {
  cache: 'force-cache', // Disable caching for fresh data
})

const collections: CollectionCard[] | null = await response.json();
  

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
        <div>
          <div className="text-sm text-gray-500 mb-1">Home / All Products</div>
          <h1 className="text-4xl font-bold mb-4 text-orange-600">All Collections</h1>
          <p className="text-gray-700">
            Mithaas has been baking joyfully in central London since 1993. We believe our commitment to quality and consistency is unrivalled. From memorable celebration cakes to bountiful brownies and tempting treats — we always have something to bring to the party!
            <br /><br />
            Order now for London next day delivery from £7.95 and Nationwide delivery on brownies from £5.95.
          </p>
        </div>
        <div className="w-full h-64 relative rounded overflow-hidden">
          <Image
            src="/allcollections.png"
            alt="All Collections"
            fill
            className="object-cover rounded"
            priority
          />
        </div>
      </div>

      {/* Collection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {collections?.map((collection) => (
          <CollectionCardItem key={collection.slug} {...collection} />
        ))}
      </div>
    </main>
  );
}

function CollectionCardItem({ name, image_url, slug }: CollectionCard) {
  return (
    <Link href={`/collections/${slug}`} className="block group border rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="w-full h-48 relative">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-lg font-semibold text-orange-600 group-hover:underline">{name}</h4>
      </div>
    </Link>
  );
}