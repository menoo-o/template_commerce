'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/useCartStore';
import CartWrapper from './CartWrapper';

// When a item is added to cart in, this sheet pops displaying details! 
// export default function CartSheet() {
//   const { cart, isSheetOpen, setIsSheetOpen, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCartStore();

//   return (
//     <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//       <SheetContent className="bg-white text-black p-6 flex flex-col">
//         <SheetHeader>
//           <SheetTitle className="text-3xl font-bold text-orange-500">🛒 Your Cart</SheetTitle>
//             <SheetDescription className="text-neutral-500">
//               Manage items you have added to your cart.
//             </SheetDescription>
//         </SheetHeader>

//         <div className="mt-6 flex flex-col h-full">
//             <CartWrapper />

//               {/* Total + Actions */}
//               <div className="mt-6 border-t pt-6">
//                 <div className="flex justify-between text-xl font-bold text-neutral-800">
//                   <span>Total:</span>
//                   <span>${getTotalPrice().toFixed(2)}</span>
//                 </div>


//                 {/* View Cart */}
//                 <div className="mt-6 flex flex-col space-y-4">
//                   <Link
//                     href="/cart"
//                     onClick={() => setIsSheetOpen(false)}
//                     className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
//                   >
//                     View Cart
//                   </Link>

//                   <button
//                     onClick={clearCart}
//                     className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-neutral-800 transition"
//                   >
//                     Clear Cart
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

export default function CartSheet() {
  const {
    isSheetOpen,
    setIsSheetOpen,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="bg-white text-black p-6 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold text-orange-500">
            🛒 Your Cart
          </SheetTitle>
          <SheetDescription className="text-neutral-500">
            Manage items you have added to your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-full">
          <CartWrapper />

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
        </div>
      </SheetContent>
    </Sheet>
  );
}