"use client";
import { useState } from "react";

interface ReplyFormProps {
  opinionId: string;
  onReplySubmitted?: () => void; // callback to refresh parent
}

export default function ReplyForm({ opinionId, onReplySubmitted }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/dashboard/opinions/${opinionId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to submit reply");

      setContent("");
      if (onReplySubmitted) onReplySubmitted(); // refresh opinions
    } catch (err) {
      console.error("Failed to submit reply", err);
      alert("Failed to submit reply");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
        className="w-full p-2 rounded bg-gray-700 text-white"
        rows={2}
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
      >
        {submitting ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
