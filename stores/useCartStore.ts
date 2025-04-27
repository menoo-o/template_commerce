// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { produce } from 'immer';

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  isSheetOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setIsSheetOpen: (open: boolean) => void;
  getTotalPrice: () => number; // New computed property
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        isSheetOpen: false,
        addToCart: (product) =>
          set(
            produce((state: CartStore) => {
              const existingItem = state.cart.find((item) => item.product.id === product.id);
              if (existingItem) {
                existingItem.quantity += 1;
                state.isSheetOpen = true;
              } else {
                state.cart.push({ product, quantity: 1 });
                state.isSheetOpen = true;
              }
            })
          ),
        removeFromCart: (productId) => set(produce((state: CartStore) => { state.cart = state.cart.filter((item) => item.product.id !== productId); })),
        clearCart: () => set(produce((state: CartStore) => { state.cart = []; })),
        updateQuantity: (productId, quantity) =>
          set(
            produce((state: CartStore) => {
              const item = state.cart.find((item) => item.product.id === productId);
              if (item && quantity > 0) {
                item.quantity = quantity;
              } else if (item && quantity === 0) {
                state.cart = state.cart.filter((item) => item.product.id !== productId);
              }
            })
          ),
          setIsSheetOpen: (open) => {
            console.log("Before:", useCartStore.getState().isSheetOpen); // Debug log
            set(produce((state: CartStore) => { state.isSheetOpen = open; }));
            console.log("After:", useCartStore.getState().isSheetOpen); // Debug log
          },
        getTotalPrice: () => {
          const state = get();
          return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        },
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'CartStore' }
  )
);