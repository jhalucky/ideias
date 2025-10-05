"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function IdeaOpinionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams(); // idea id
  const [idea, setIdea] = useState<any>(null);
  const [opinion, setOpinion] = useState("");
  const [opinionType, setOpinionType] = useState<"support" | "against">("support");

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await fetch(`/api/dashboard/ideas?id=${id}`);
        const data = await res.json();
        setIdea(data[0]); // GET returns array
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdea();
  }, [id]);

  const handleSubmit = async () => {
    if (!opinion.trim()) return alert("Opinion cannot be empty");
    try {
      const res = await fetch("/api/dashboard/opinions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: id, content: opinion, opinionType }),
      });
      if (!res.ok) throw new Error("Failed to submit opinion");
      alert("Opinion submitted!");
      setOpinion("");
      router.push("/ideas"); // back to ideas list
    } catch (err) {
      console.error(err);
      alert("Failed to submit opinion.");
    }
  };

  if (!idea) return <div className="p-10 text-center">Loading idea...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold">{idea.title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{idea.description}</p>
        <p className="mt-1 text-gray-500 text-sm">
          By @{idea.user.username} ({idea.user.name})
        </p>

        <textarea
          className="w-full mt-4 p-2 border rounded dark:bg-gray-600 dark:text-white"
          placeholder="Write your opinion..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        />

        <div className="flex gap-4 mt-2">
          <button
            className={`px-4 py-2 rounded ${
              opinionType === "support" ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setOpinionType("support")}
          >
            Support
          </button>
          <button
            className={`px-4 py-2 rounded ${
              opinionType === "against" ? "bg-red-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setOpinionType("against")}
          >
            Against
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Submit Opinion
        </button>
      </div>
    </div>
  );
}
