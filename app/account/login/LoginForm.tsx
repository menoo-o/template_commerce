'use client';

import { useActionState, useEffect } from 'react';
import { login, getUserRoleAndRedirect } from './actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {
    error: null,
    success: false,
  });
  const router = useRouter();

  // Redirect on successful login
  useEffect(() => {
    if (state.success) {
      // Call redirect function (server action, but we handle it client-side)
      getUserRoleAndRedirect().catch((err) => {
        console.error('Redirect failed:', err);
        router.push('/dashboard/user'); // Fallback
      });
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="p-4">
      <h1 className="text-2xl">Login</h1>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border p-2 w-full"
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border p-2 w-full"
          disabled={isPending}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-2 rounded"
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}