"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitIdeaPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setLoading(false);
    if (res.ok) {
      alert("✅ Idea submitted successfully!");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(`❌ ${data.error || "Failed to submit idea"}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Submit Your Idea 💡</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Describe your idea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded min-h-[120px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
      </form>
    </div>
  );
}
