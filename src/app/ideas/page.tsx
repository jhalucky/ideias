"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("/api/dashboard/ideas"); // fetch all ideas
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

  if (loading) return <div className="p-10 text-center">Loading ideas...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <button
                className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={() => router.push(`/ideas/${idea.id}`)}
              >
                Add Opinion
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
