// using Zustand for State Management 

// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { produce } from 'immer';
// import { CartStore } from '@/lib/types/types'
import { CartStore } from '@/lib/types/types';


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
       removeFromCart: (product, variant) =>
  set(
    produce((state: CartStore) => {
      state.cart = state.cart.filter((item) => {
        // If a variant is specified, match both product and variant
        if (variant) {
          return !(item.product.id === product.id && item.variant?.id === variant.id);
        }
        // If no variant, ensure it's not the base product (no variant)
        return !(item.product.id === product.id && !item.variant);
      });
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
       updateQuantity: (product, variant, quantity) =>
        set(
          produce((state: CartStore) => {
            const item = state.cart.find(
              (item) =>
                item.product.id === product.id &&
                (variant ? item.variant?.id === variant.id : !item.variant)
            );

            if (item && quantity > 0) {
              item.quantity = quantity;
            } else if (item && quantity === 0) {
              state.cart = state.cart.filter(
                (item) =>
                  !(item.product.id === product.id &&
                    (variant ? item.variant?.id === variant.id : !item.variant))
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