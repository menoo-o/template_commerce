'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/useCartStore';

export default function CartSheet() {
  const { cart, isSheetOpen, setIsSheetOpen, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="bg-white text-black p-6 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold text-orange-500">🛒 Your Cart</SheetTitle>
          <SheetDescription className="text-neutral-500">
            Manage items you have added to your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-neutral-400 text-lg">
              Your cart is empty.
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ul className="space-y-4 flex-1 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center justify-between p-4 bg-neutral-100 rounded-xl shadow hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-lg">{item.product.name}</p>
                      <p className="text-sm text-neutral-500">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
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
                        className="text-red-500 hover:text-red-600 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total + Actions */}
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between text-xl font-bold text-neutral-800">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="mt-6 flex flex-col space-y-4">
                  <Link
                    href="/cart"
                    onClick={() => setIsSheetOpen(false)}
                    className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
                  >
                    View Cart
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-neutral-800 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
