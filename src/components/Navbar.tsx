"use client";
import Link from "next/link";

export default function Navbar(){
  return (
    <nav className="w-full px-6 flex items-center justify-between">
      <Link href="/" className="text-lg font-bold gradient-text text-white">IDEIAs</Link>
      <div>
        <Link href="/ideas" className="mr-4 text-white">Ideas</Link>
        <Link href="/auth" className="px-4 py-2 border rounded-full text-white">Sign In</Link>
      </div>
    </nav>
  )
}