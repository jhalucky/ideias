"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitOpinionPage() {
  const [ideaId, setIdeaId] = useState("");
  const [opinionType, setOpinionType] = useState("support");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/opinion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ideaId, content, opinionType }),
    });

    setLoading(false);
    if (res.ok) {
      alert("✅ Opinion submitted!");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(`❌ ${data.error || "Failed to submit opinion"}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Share Your Opinion 💬</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Idea ID"
          value={ideaId}
          onChange={(e) => setIdeaId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={opinionType}
          onChange={(e) => setOpinionType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="support">Support</option>
          <option value="against">Against</option>
        </select>
        <textarea
          placeholder="Write your opinion..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded min-h-[120px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit Opinion"}
        </button>
      </form>
    </div>
  );
}
