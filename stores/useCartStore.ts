// using Zustand for State Management 

// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { produce } from 'immer';
// import { CartStore } from '@/lib/types/types'
import { Product, ProductVariant, CartStore } from '@/lib/types/types';


export const useCartStore = create<CartStore>()(
  // Wrap the store with devtools for Redux DevTools integration
  devtools(
    // Add persistence middleware to save cart state
    persist(
      // Store definition with state and actions
      (set, get) => ({
        // Initial state: empty cart array and closed sheet
        cart: [], // Array to hold cart items
        isSheetOpen: false, // Controls cart sidebar visibility

        // Action: Add product to cart
        addToCart: (product, variant) =>
            set(
              produce((state: CartStore) => {
                 // Find existing item with same product AND same variant (if any)
                const existingItem = state.cart.find(
                  (item) =>
                    item.product.id === product.id &&
                    (variant ? item.variant?.id === variant.id : !item.variant)
                );

                if (existingItem) {
                  existingItem.quantity += 1;
                } else {
                  state.cart.push({ product, variant, quantity: 1 });
                }

                state.isSheetOpen = true;
              })
            ),

        // Action: Remove product from cart
        removeFromCart: (productId) =>
          set(
            produce((state: CartStore) => {
              // Filter out the item with matching productId
              state.cart = state.cart.filter(
                (item) => item.product.id !== productId
              );
            })
          ),

        // Action: Empty the cart completely
        clearCart: () =>
          set(
            produce((state: CartStore) => {
              // Reset cart to empty array
              state.cart = [];
            })
          ),

        // Action: Update product quantity
        updateQuantity: (productId, quantity) =>
          set(
            produce((state: CartStore) => {
              // Find the item in cart
              const item = state.cart.find(
                (item) => item.product.id === productId
              );
              
              if (item && quantity > 0) {
                // Update quantity if valid
                item.quantity = quantity;
              } else if (item && quantity === 0) {
                // Remove if quantity set to 0
                state.cart = state.cart.filter(
                  (item) => item.product.id !== productId
                );
              }
            })
          ),

        // Action: Control cart sidebar visibility
        setIsSheetOpen: (open) => {
          // Debug logs to track state changes
          console.log("Before:", useCartStore.getState().isSheetOpen);
          set(
            produce((state: CartStore) => {
              // Update sheet open state
              state.isSheetOpen = open;
            })
          );
          console.log("After:", useCartStore.getState().isSheetOpen);
        },

        // Getter: Calculate total cart price
       getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          const price = item.variant?.price ?? item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
      }),
      {
        // Persistence config
        name: 'cart-storage', // LocalStorage key
        storage: createJSONStorage(() => localStorage), // Storage medium
      }
    ),
    // DevTools config
    { name: 'CartStore' } // Display name in Redux DevTools
  )
);