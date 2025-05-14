// components/AddToCartButton.tsx
import { useCartStore } from '@/stores/useCartStore';
import { ProductVariant, Product } from '@/lib/types/types';

type AddToCartButtonProps = {
  product: Product;
  variant?: ProductVariant;
};

export function AddToCartButton({ product, variant }: AddToCartButtonProps) {
  const { addToCart } = useCartStore();

  return (
    <button
      onClick={() => addToCart(product, variant)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
}