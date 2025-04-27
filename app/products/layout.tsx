import { Suspense } from 'react';
import Loading from './loading';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}