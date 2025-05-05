// [collectionSlug]/products/[productSlug]/page.tsx — displays individual product detail.

import React from 'react'
// import Link from 'next/link';
import {SinglePageData} from './loader'
import { notFound } from 'next/navigation';
import { SingleDisplayCard } from '@/lib/types/types';
import Image from 'next/image';

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const { collection, product } = await SinglePageData(productSlug);

  if (!collection || !product) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* Left: Product Image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Right: Product Details */}
      <div>
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          Home / {collection.name} / {product.name}
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          {product.name}
        </h1>

        {/* Price */}
        <p className="text-lg text-gray-700 mb-4">
          From <span className="font-semibold text-black">Rs {product.price}</span>
        </p>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

        {/* Size Options - placeholder for now */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Select Size</h4>
          <div className="flex gap-3">
            {["4 inch", "7 inch", "10 inch", "13 inch"].map((size) => (
              <label
                key={size}
                className="cursor-pointer border px-3 py-2 rounded hover:bg-orange-50"
              >
                <input type="radio" name="size" className="hidden" />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded">
            <button className="px-3 py-1 text-xl">-</button>
            <input
              type="number"
              className="w-12 text-center border-l border-r"
              value={1}
              readOnly
            />
            <button className="px-3 py-1 text-xl">+</button>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}