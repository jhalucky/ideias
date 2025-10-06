"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function IdeaDetailsPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchIdea = async () => {
      try {
        const res = await fetch(`/api/dashboard/ideas/${id}`);
        if (!res.ok) throw new Error("Failed to fetch idea");
        const data = await res.json();
        setIdea(data);
      } catch (err) {
        console.error("Error fetching idea:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  if (loading) return <div className="p-10 text-gray-400">Loading idea...</div>;

  if (!idea)
    return <div className="p-10 text-red-500">Idea not found or deleted.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white">
    <div className="max-w-3xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
      <p className="text-gray-300 mb-6">{idea.description}</p>

      {/* Opinions section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Opinions</h2>
        {idea.opinions?.length > 0 ? (
          <ul className="space-y-4">
            {idea.opinions.map((opinion: any) => (
              <li key={opinion.id} className="border p-4 rounded-lg bg-gray-800">
                <p>{opinion.content}</p>
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
