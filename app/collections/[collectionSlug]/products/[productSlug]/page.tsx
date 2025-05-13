"use client";

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


import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { SinglePageData } from "./loader";
import { useParams } from "next/navigation";

import Image from "next/image";

interface PageProps {
  params: {
    collectionSlug: string;
    productSlug: string;
  };
}

export default function SingleProductPage() {
  const params = useParams<{collectionSlug:string, productSlug: string}>()

  const [product, setProduct] = useState<SingleDisplayCard | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SinglePageData(params.productSlug)
      .then(({ product }) => {
        if (!product) return notFound();
        setProduct(product);
      })
      .finally(() => setLoading(false));
  }, [params.productSlug]);

  if (loading || !product) return <div>Loading...</div>;

  const variants = product.product_variants || [];

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
          Home / {params.collectionSlug.replace(/-/g, " ")} / {product.name}
        </div>

        <h1 className="text-3xl font-bold text-orange-600 mb-2">{product.name}</h1>

        {/* Price */}
        <p className="text-lg text-gray-700 mb-4">
          From{" "}
          <span className="font-semibold text-black">
            {selectedPrice !== null ? selectedPrice : product.price} PKR
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

        {/* Size Options (if variants exist) */}
        {variants.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Select Size</h4>
            <div className="flex gap-3">
              {variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`cursor-pointer border px-3 py-2 rounded hover:bg-orange-50 ${
                    selectedSize === variant.size ? "bg-orange-100 border-orange-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    className="hidden"
                    value={variant.size}
                    onChange={() => {
                      setSelectedSize(variant.size);
                      setSelectedPrice(variant.price);
                    }}
                  />
                  {variant.size} – {variant.price} PKR
                </label>
              ))}
            </div>
          </div>
        )}

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
