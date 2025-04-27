'use client';

import { useCartStore } from '@/stores/useCartStore';
import Link from 'next/link';

function Cartpage() {
  const { cart, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-neutral-500">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link
            href="/shop"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between p-5 bg-neutral-100 rounded-xl shadow hover:shadow-lg transition"
              >
                <div>
                  <p className="text-lg font-semibold text-black">{item.product.name}</p>
                  <p className="text-sm text-neutral-500">${item.product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                    min="1"
                    tabIndex={-1}
                    className="w-16 p-2 border border-neutral-300 rounded-md text-center focus:ring-2 focus:ring-orange-400"
                  />
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

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
                href='/products'
                className="text-center text-orange-500 hover:text-orange-600 font-semibold transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cartpage;
