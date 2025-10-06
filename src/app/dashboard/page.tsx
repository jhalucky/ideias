"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ideas" | "opinions">("ideas");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [opinions, setOpinions] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
  }, [status, router]);

useEffect(() => {
  if (!session?.user?.id) return;

  const fetchData = async () => {
    try {
      const [ideasRes, opinionsRes] = await Promise.all([
        fetch(`/api/dashboard/ideas?userId=${session.user.id}`),
        fetch(`/api/dashboard/opinions?userId=${session.user.id}`),
      ]);

      let ideasData: any[] = [];
      let opinionsData: any[] = [];

      if (ideasRes.ok) {
        try {
          ideasData = await ideasRes.json();
        } catch (err) {
          console.error("Failed to parse ideas JSON:", err);
        }
      } else {
        console.error("Ideas fetch failed with status:", ideasRes.status);
      }

      if (opinionsRes.ok) {
        try {
          opinionsData = await opinionsRes.json();
        } catch (err) {
          console.error("Failed to parse opinions JSON:", err);
        }
      } else {
        console.error("Opinions fetch failed with status:", opinionsRes.status);
      }

      setIdeas(ideasData);
      setOpinions(opinionsData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  fetchData();
}, [session]);


  if (status === "loading") return <div className="p-10 text-center">Loading...</div>;

  const dataToShow = activeTab === "ideas" ? ideas : opinions;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 p-6">
      <Navbar />
      <div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-6 transition-all">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="profile"
              width={100}
                height={100}
              className="w-30 h-30 rounded-full"
            />
            <div>
              <h2 className="text-3xl font-semibold text-white text-center">
                {session?.user?.name || "User"}
              </h2>
              <p className="text-gray-500 text-xl text-center">
                @{session?.user?.username || "username"}
              </p>
            </div>
            <p className="text-gray-400 text-center">
              {session?.user?.bio || "No bio available."}
            </p>
          </div>

         <div className="flex md:flex-row flex-col justify-between items-center w-full mt-10">
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => router.push("/submit-idea")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Add Idea
            </button>
            <button
              onClick={() => router.push("/submit-opinion")}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Add Opinion
            </button>
          </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="flex bg-gray-200 dark:bg-gray-700 p-1 rounded-full shadow-inner">
            <button
              onClick={() => setActiveTab("ideas")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "ideas"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Ideas
            </button>
            <button
              onClick={() => setActiveTab("opinions")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "opinions"
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Opinions
            </button>
          </div>
        </div>
        </div>
        </div>

        {/* Content */}
        <div>
          {dataToShow.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No {activeTab} found.
            </p>
          ) : (
            <ul className="space-y-4">
              {dataToShow.map((item) => (
                <li
                  key={item.id}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:scale-[1.01] transition-transform"
                >
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
