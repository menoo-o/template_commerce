import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-red-600">Authentication Failed</h2>
        <p className="text-gray-700">
          Something went wrong during the sign-in process. Please try again.
        </p>

        <Link
          href="/account/login"
          className="inline-block w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
