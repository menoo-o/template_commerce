'use client';

import { useCartStore } from '@/stores/useCartStore';
import Link from 'next/link';
import CartWrapper from '@/components/CartNotify/CartWrapper';

//app/cart/page.tsx
function Cartpage() {
  const { clearCart, getTotalPrice } = useCartStore();

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">🛒 Your Shopping Cart</h1>

      <CartWrapper />

          {/* Total + Actions */}
          <div className="mt-12 border-t pt-8">
            <div className="flex justify-between text-2xl font-bold text-black mb-6">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="/checkout"
                className="bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clearCart}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition"
              >
                Clear Cart
              </button>

              <Link
                href='/collections/all-products'
                className="text-center text-orange-500 hover:text-orange-600 font-semibold transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
     

        </div>
  );
}

export default Cartpage;
