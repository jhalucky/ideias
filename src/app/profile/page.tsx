"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (status === "unauthenticated") {
        router.push("/auth");
        return;
      }

      if (status === "authenticated" && session?.user?.email) {
        try {
          // check if user exists in DB
          const res = await fetch(`/api/profile/check?email=${session.user.email}`);
          const data = await res.json();

          if (data.exists) {
            router.push("/dashboard"); // redirect to dashboard if user already has profile
          } else {
            setChecking(false); // show "Claim your profile" button
          }
        } catch (error) {
          console.error("Error checking user:", error);
          setChecking(false);
        }
      }
    }

    checkUser();
  }, [status, session, router]);

  if (status === "loading" || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (status !== "authenticated") return null;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
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
