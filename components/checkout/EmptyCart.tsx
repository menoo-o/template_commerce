'use client';

import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-center">
      {/* Optional: Empty cart icon */}
      <svg
        className="mx-auto h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.4 2.4M17 13l2.4 2.4M9 18h6"
        />
      </svg>
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Your Cart is Empty</h1>
      <p className="text-gray-600 mb-6">
        Looks like you haven’t added any items to your cart yet.
      </p>
      <Link
        href="collections/all-products"
        className="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Shop More
      </Link>
    </div>
  );
}