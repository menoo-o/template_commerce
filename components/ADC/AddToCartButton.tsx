// components/AddToCartButton.tsx
import { useCartStore } from '@/stores/useCartStore';

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
  };
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCartStore();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
}