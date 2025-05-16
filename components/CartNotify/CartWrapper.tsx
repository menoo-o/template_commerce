import React from 'react'
import { useCartStore } from '@/stores/useCartStore'

export default function CartWrapper() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  return (
    <>
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
                key={`${item.product.id}-${item.variant?.id ?? 'base'}`}
                className="flex items-center justify-between p-4 bg-neutral-100 rounded-xl shadow hover:shadow-md transition"
              >
        <div>
          <p className="font-semibold text-lg">{item.product.name}</p>
          
          <p className="text-sm text-neutral-500 flex items-center gap-1">
            ${item.variant?.price.toFixed(2) ?? item.product.price.toFixed(2)}
            <span className="ml-2 text-xs text-gray-500">
              {item.variant?.size}
            </span>
          </p>
        </div>


                <div className="flex items-center space-x-2">
                 <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.product,
                        item.variant, // could be undefined if no variant
                        parseInt(e.target.value) || 1
                      )
                    }
                      min="1"
                      tabIndex={-1}
                      className="w-16 p-2 border border-neutral-300 rounded-md text-center focus:ring-2 focus:ring-orange-400"
                />

           <button
             onClick={() => removeFromCart(item.product, item.variant)}
             className="text-red-500 hover:text-red-600 text-sm font-semibold"
           >
          Remove
        </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}