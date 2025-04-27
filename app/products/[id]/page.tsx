// 'use client'

// // app/products/[id]/page.tsx
// import { AddToCartButton } from '@/components/ADC/AddToCartButton';
// import CartSheet from '@/components/CartNotify/Sheet'

// export default function ProductPage({ params }: { params: { id: string } }) {
//   // Mock product data (replace with API/database)
//   const product = {
//     id: params.id,
//     name: `Product ${params.id}`,
//     price: 29.99,
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <p className="text-lg">Price: ${product.price}</p>
//       <AddToCartButton product={product} />
//       <CartSheet />
//     </div>
//   );
// }