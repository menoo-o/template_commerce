//[productSlug]/layout.tsx

import CartSheet from "@/components/CartNotify/Sheet";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Main Content */}
      <main className="flex-1">{children}</main>
      {/* Cart Sidebar */}
      <CartSheet />
    </div>
  );
}