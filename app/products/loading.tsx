// app/products/loading.tsx
import { Loader2 } from "lucide-react"; // shadcn/ui icon or use your preferred spinner

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <p className="text-lg text-gray-500">Loading products...</p>
      </div>
    </div>
  );
}