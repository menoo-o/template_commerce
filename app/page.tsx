'use client'

import Link from 'next/link';
import { supabaseApiCall } from '@/utils/SupabaseApiCall';
import { useState, useTransition } from 'react';
import { start } from 'repl';


export default function Home() {
  const [value, setValue] = useState<{ project: string }[] | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      const data = await supabaseApiCall()
      setValue(data);
    }
  )}

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to the Home Page</h2>
        <p className="text-gray-600">Implementing Auth & OAuth with Supabase</p>

        <div className="space-y-3">
          <Link
            href="/account/login"
            className="inline-block w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
          >
            Go to the Login Page
          </Link>

          <Link
            // go to the shopping page
            href="/products"
            className="inline-block w-full text-orange-500 border border-orange-500 py-2 px-4 rounded-md hover:bg-orange-50 transition"
          >
            Login Later? Lets do some shopping          
          </Link>

          <button
            disabled={isPending}
            className="inline-block w-full text-orange-500 border border-orange-500 py-2 px-4 rounded-md hover:bg-orange-50 transition disabled:opacity-50"
            onClick={handleClick}
           >
           {isPending ? "Processing..." : "Press ME"} 
          </button>
           <pre>{JSON.stringify(value, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
