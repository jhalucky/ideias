"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function DashboardClient() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Hello {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not logged in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}

