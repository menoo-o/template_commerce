'use client'
// app/products/page.tsx
import { AddToCartButton } from '@/components/ADC/AddToCartButton';

export default function ProductsPage() {
  // Mock product list (replace with API/database)
  const products = [
    { id: '1', name: 'Shirt', price: 19.99 },
    { id: '2', name: 'Pants', price: 39.99 },
  ];

  return (
  <>

    <div className="min-h-screen bg-white text-black flex flex-col">
    
      {/* Products Section */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li key={product.id} className="border border-neutral-300 rounded-lg p-6 flex flex-col items-center bg-neutral-50 hover:shadow-lg transition">
              <span className="text-lg font-semibold mb-2">{product.name}</span>
              <span className="text-orange-500 font-bold mb-4">${product.price}</span>
              <AddToCartButton product={product} />
            </li>
          ))}
        </ul>
      </main>
  
      {/* Cart Sidebar or Sheet */}
   
    </div>
 
  </>
);
}