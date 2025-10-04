"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // redirect to sign-in page
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (status !== "authenticated") return null;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <p className="text-2xl font-semibold">
        Welcome, {session.user?.name || session.user?.email}
      </p>
      <button
        onClick={() => router.push("/profile/setup")}
        className="mt-6 px-6 py-3 bg-gray-800 rounded hover:bg-gray-700 transition"
      >
        Claim your Profile
      </button>
    </div>
  );
}
