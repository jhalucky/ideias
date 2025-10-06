"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ReplyForm from "@/components/ReplyForm";
import Navbar from "@/components/Navbar";

export default function IdeaDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [opinionType, setOpinionType] = useState<"support" | "against">("support");
  const [submitting, setSubmitting] = useState(false);

  const fetchIdea = async () => {
    try {
      const res = await fetch(`/api/dashboard/ideas/${id}`);
      const data = await res.json();
      setIdea(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchIdea();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    if (!session?.user?.id) {
      alert("You must be logged in to post an opinion.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/dashboard/opinions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: id, content, opinionType }),
      });

      if (!res.ok) throw new Error("Failed to submit opinion");

      // Clear form and refresh opinions
      setContent("");
      setShowForm(false);
      fetchIdea();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-gray-400">Loading idea...</div>;
  if (!idea) return <div className="p-10 text-red-500">Idea not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
      <div className="mx-auto mb-5 p-6"> 
      <Navbar />
      </div>
      <div className="max-w-3xl mx-auto px-5">
          <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Opinions</h1>
      
      
        <button
          className="mb-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Opinion"}
        </button>
        </div>

        {/* Add Opinion Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-3">
            <div className="flex gap-3">
              <label>
                <input
                  type="radio"
                  value="support"
                  checked={opinionType === "support"}
                  onChange={() => setOpinionType("support")}
                />{" "}
                Support
              </label>
              <label>
                <input
                  type="radio"
                  value="against"
                  checked={opinionType === "against"}
                  onChange={() => setOpinionType("against")}
                />{" "}
                Against
              </label>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your opinion..."
              className="w-full p-3 rounded bg-gray-800 text-white"
              rows={4}
            />

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              {submitting ? "Submitting..." : "Post Opinion"}
            </button>
          </form>
        )}

        {/* Opinions Section */}
        <div>
          {idea.opinions?.length > 0 ? (
            <ul className="space-y-4">
              {idea.opinions.map((opinion: any) => (
                <li key={opinion.id} className="border p-4 rounded-lg bg-gray-800">
                  <p>
                    <strong>{opinion.opinionType.toUpperCase()}:</strong> {opinion.content}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    by {opinion.user?.name || "Anonymous"}
                  </p>

                  {/* Replies */}
                  {opinion.replies?.length > 0 && (
                    <div className="ml-4 mt-3 border-l pl-3 space-y-2">
                      {opinion.replies.map((reply: any) => (
                        <div key={reply.id} className="text-gray-300 text-sm">
                          <p>{reply.content}</p>
                          <p className="text-xs text-gray-500">
                            ↳ {reply.user?.name || "You"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {session?.user?.id && <ReplyForm opinionId={opinion.id} />}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No opinions yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}
