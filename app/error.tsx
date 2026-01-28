"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-6">
      <h2>Something went wrong</h2>
      <p>Please try again in a moment.</p>

      <button onClick={reset}>Retry</button>
    </div>
  )
}
