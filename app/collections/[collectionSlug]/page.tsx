// [collectionSlug]/page.tsx — handles viewing all products within a collection (like all cakes).

import Image from 'next/image';
import Link from 'next/link';
import { getCollectionPageData } from './loader';
import { notFound } from 'next/navigation';
import { ProductCardProps } from '@/lib/types/types';

export default async function AllCollectionsPage({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const { collectionSlug } = await params;
  const { collection, products } = await getCollectionPageData(collectionSlug);

  if (!collection) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            Home / {collectionSlug.replaceAll('-', ' ')}
          </div>
          <h1 className="text-4xl font-bold mb-4 text-orange-600">
            {collection.name}
          </h1>
          <p className="text-gray-700">{collection.description}</p>
        </div>

        <div className="w-full h-64 relative rounded overflow-hidden">
          <Image
            src={collection.image_url}
            alt={collection.name}
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      {/* Collection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCardItem
            key={product.slug}
            {...product}
            collectionSlug={collectionSlug}
          />
        ))}
      </div>
    </main>
  );
}

function ProductCardItem({ name, image_url, slug, collectionSlug, price }: ProductCardProps) {
  return (
    <Link
      href={`/collections/${collectionSlug}/products/${slug}`}
      className="block group border rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="w-full h-70 relative">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-lg font-semibold text-orange-600 group-hover:underline">
          {name}
        </h4>
        <h4 className='text-lg font-semibold text-orange-400'>From {price}</h4>
      </div>
    </Link>
  );
}
