"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Idea = {
  id: string;
  title: string;
  description: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
};

export default function IdeasPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // Track which idea's opinion form is open
  const [activeIdeaId, setActiveIdeaId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [opinionType, setOpinionType] = useState<"support" | "against">("support");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("/api/dashboard/ideas");
        const data = await res.json();
        setIdeas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const handleSubmit = async (e: React.FormEvent, ideaId: string) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("You must be logged in to submit an opinion.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/dashboard/opinions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId, content, opinionType }),
      });

      if (!res.ok) throw new Error("Failed to submit opinion");

      // Clear form for this idea
      setContent("");
      setActiveIdeaId(null);

      // Refresh ideas to reflect new opinion (or you can optimistically update the state)
      const updatedIdeas = await (await fetch("/api/dashboard/ideas")).json();
      setIdeas(updatedIdeas);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading ideas...</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black via-blue-950 to-black/45">
      <div className="mx-auto mb-8">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto space-y-6 mt-5">
        <h1 className="text-white text-center text-2xl">All Ideas</h1>
        {ideas.length === 0 ? (
          <p className="text-center text-gray-500">No ideas found.</p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="p-4 rounded-lg bg-white dark:bg-gray-700 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{idea.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{idea.description}</p>
              <p className="mt-1 text-gray-500 text-sm">
                By @{idea.user.username} ({idea.user.name})
              </p>

              <div className="flex gap-4 mt-3">
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  onClick={() => router.push(`/ideas/${idea.id}`)}
                >
                  Check Opinions
                </button>

                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  onClick={() =>
                    setActiveIdeaId(activeIdeaId === idea.id ? null : idea.id)
                  }
                >
                  {activeIdeaId === idea.id ? "Cancel" : "Add Opinion"}
                </button>
              </div>

              {/* Only show form for the active idea */}
              {activeIdeaId === idea.id && (
                <form
                  onSubmit={(e) => handleSubmit(e, idea.id)}
                  className="mb-6 mt-3 space-y-3"
                >
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
