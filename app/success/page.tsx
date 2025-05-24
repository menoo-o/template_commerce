import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg">Thank you for your £10 payment.</p>
      <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
        Return to Home
      </Link>
    </div>
  );
}