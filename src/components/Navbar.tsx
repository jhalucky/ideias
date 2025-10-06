// "use client";
// import Link from "next/link";

// export default function Navbar(){
//   return (
//     <nav className="w-full px-6 flex items-center justify-between">
//       <Link href="/" className="text-lg font-bold gradient-text text-white">IDEIAAs</Link>
//       <div>
//         <Link href="/ideas" className="mr-4 text-white">Ideas</Link>
//         <Link href="/auth" className="px-4 py-2 border rounded-full text-white">Sign In</Link>
//       </div>
//     </nav>
//   )
// }

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 flex items-center justify-between shadow-md">
      <Link href="/" className="text-lg font-bold gradient-text text-white">
        IDEIAAs
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/ideas" className="text-white hover:underline">
          Ideas
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-2">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full"
                height={32}
                width={32}
              />
            )}
            <span className="text-white">{session.user.name}</span>
            {/* <button
              onClick={() => signOut()}
              className="px-4 py-2 border rounded-full text-white hover:bg-white hover:text-gray-900 transition"
            >
              Logout
            </button> */}
          </div>
        ) : (
          <Link
            href="/auth"
            className="px-4 py-2 border rounded-full text-white hover:bg-white hover:text-gray-900 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
