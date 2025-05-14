import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div>
        <nav className="bg-orange-500 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">MyShop</div>
      <div className="flex space-x-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/collections/all-products" className="hover:underline">Shop</Link>
        <Link href="/account/login" className="hover:underline">Login</Link>
        <Link href="/cart" className="hover:underline">🛒 Cart</Link>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
