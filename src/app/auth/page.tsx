"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function AuthPage() {
  const handleSignIn = async (provider: string) => {
    // This will redirect to /profile/setup on successful sign-in/sign-up
    await signIn(provider, { callbackUrl: "/profile/setup" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
      <div className="p-8 max-w-md w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl text-center">
        
        <div className="flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold ml-4">Welcome to IDEIAs</h1>
        </div>

        <p className="text-gray-400 mb-6">
          Sign in or create an account to start sharing your ideas.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => handleSignIn("google")}
            className="w-full flex items-center justify-center gap-3 p-3 text-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width={24} height={24} />
            Continue with Google
          </button>

         
        </div>

        <p className="mt-6 text-sm text-gray-500">
          By continuing, you agree to our <Link href="#" className="text-blue-400 hover:underline">Terms of Service</Link>.
        </p>
      </div>
    </div>
  );
}
