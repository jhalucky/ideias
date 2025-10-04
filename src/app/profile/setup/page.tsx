"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter

export default function ProfileSetupPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 2. Initialize useRouter

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile/setup");
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "");
          setBio(data.bio || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio }),
      });
      if (res.ok) {
        // --- Success Handling (Replaced alert with toast + redirect) ---
        
        // 1. Show Toast Notification (Simulation)
        console.log("SUCCESS: Profile saved! Redirecting..."); 
        
        // 2. Refresh session data (Crucial step that would happen here with a real library like NextAuth update())
        // For now, we simulate success and redirect immediately
        
        // 3. Redirect to /dashboard
        router.push("/dashboard"); 
      } else {
        // Handle API errors like username taken (409)
        const errorData = await res.json();
        
        // Display user-friendly error (simulating a toast/modal)
        console.error(`ERROR: ${errorData.error}`);
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Setup Your Profile</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-3 rounded bg-gray-800 w-full max-w-md"
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="mb-4 p-3 rounded bg-gray-800 w-full max-w-md h-32"
      />
      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-500 transition"
      >
        Save Profile
      </button>
    </div>
  );
}