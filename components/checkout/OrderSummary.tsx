// components/checkout/OrderSummary.tsx
'use client';

import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";

interface OrderSummaryProps {
  shipping: number;
}

export const OrderSummary = ({ shipping }: OrderSummaryProps) => {
  const { cart } = useCartStore();
  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.variant?.price ?? item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold text-black">Your Order</h2>

      <div className="space-y-4 border-b pb-4">
        {cart.map((item, index) => (
          <div
            key={`£{item.product.id}-${item.variant?.id ?? "base"}-${index}`}
            className="flex justify-between text-sm text-gray-700"
          >
            <span>
              {item.product.name}
              {item.variant?.size && ` (£{item.variant.size})`} x{item.quantity}
            </span>
            <span>£{((item.variant?.price ?? item.product.price) * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="text-right text-sm">
          <Link href="/cart" className="text-orange-500 hover:underline">
            Change
          </Link>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>£{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-black">
          <span>Total</span>
          <span>£{(subtotal + shipping).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};