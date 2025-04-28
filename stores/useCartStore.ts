// using Zustand for State Management 

// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { CartStore } from '@/lib/types/types'



// export const useCartStore = create<CartStore>()(
//   devtools(
//     persist(  //using persist middleware will save the cart
//       (set, get) => ({
//         cart: [], //initially empty
//         isSheetOpen: false,
//         addToCart: (product) =>
//           set(
//             produce((state: CartStore) => {
//               const existingItem = state.cart.find((item) => item.product.id === product.id);
//               if (existingItem) {
//                 existingItem.quantity += 1;
//                 state.isSheetOpen = true;
//               } else {
//                 state.cart.push({ product, quantity: 1 });
//                 state.isSheetOpen = true;
//               }
//             })
//           ),
//         removeFromCart: (productId) => set(produce((state: CartStore) => { state.cart = state.cart.filter((item) => item.product.id !== productId); })),
//         clearCart: () => set(produce((state: CartStore) => { state.cart = []; })),
//         updateQuantity: (productId, quantity) =>
//           set(
//             produce((state: CartStore) => {
//               const item = state.cart.find((item) => item.product.id === productId);
//               if (item && quantity > 0) {
//                 item.quantity = quantity;
//               } else if (item && quantity === 0) {
//                 state.cart = state.cart.filter((item) => item.product.id !== productId);
//               }
//             })
//           ),
//           setIsSheetOpen: (open) => {
//             console.log("Before:", useCartStore.getState().isSheetOpen); // Debug log
//             set(produce((state: CartStore) => { state.isSheetOpen = open; }));
//             console.log("After:", useCartStore.getState().isSheetOpen); // Debug log
//           },
//         getTotalPrice: () => {
//           const state = get();
//           return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
//         },
//       }),
//       {
//         name: 'cart-storage',
//         storage: createJSONStorage(() => localStorage),
//       }
//     ),
//     { name: 'CartStore' }
//   )
// );

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
        addToCart: (product) =>
          set(
            // Using Immer's produce for immutable updates
            produce((state: CartStore) => {
              // Check if product already exists in cart
              const existingItem = state.cart.find(
                (item) => item.product.id === product.id
              );
              
              if (existingItem) {
                // If exists, increment quantity
                existingItem.quantity += 1;
                // Open cart sidebar
                state.isSheetOpen = true;
              } else {
                // If new, add to cart with quantity 1
                state.cart.push({ product, quantity: 1 });
                // Open cart sidebar
                state.isSheetOpen = true;
              }
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
          // Get current state
          const state = get();
          // Sum all items (price * quantity)
          return state.cart.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
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