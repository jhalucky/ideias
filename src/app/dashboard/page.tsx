"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Lightbulb, MessageSquare } from "lucide-react";

const EmptyState = ({
  message,
  actionText,
  actionIcon,
}: {
  message: string;
  actionText: string;
  actionIcon: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center py-20 bg-gray-900/60 rounded-2xl border border-gray-700/40 text-center shadow-inner shadow-black/20 space-y-6">
    <div className="text-indigo-400 animate-pulse">{actionIcon}</div>
    <p className="text-lg text-gray-400 font-medium">{message}</p>
    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white font-semibold transition-all shadow-md hover:shadow-indigo-500/20">
      {actionText}
    </button>
  </div>
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"ideas" | "opinions">("ideas");

  const ideas: any[] = []; // No ideas yet
  const opinions: any[] = []; // No opinions yet

  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-gray-400 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    redirect("/auth");
    return null;
  }

  const user = session.user;
  const initialLetter = user.name?.[0] || user.username?.[0] || "U";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black/45 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-2xl shadow-xl border border-gray-700/60 backdrop-blur">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold border-4 border-indigo-400 shadow-lg">
                {initialLetter}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {user.name || "New User"}
            </h1>
            <p className="text-indigo-400 text-lg mt-1 font-mono">
              @{user.username || "Set Username"}
            </p>
            <p className="text-gray-400 mt-3 text-base italic max-w-lg leading-relaxed">
              {user.bio || "💡 Share your technical philosophy here."}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-700 mt-10 mb-6">
          {[
            { key: "ideas", label: "My Ideas", icon: <Lightbulb /> },
            { key: "opinions", label: "My Opinions", icon: <MessageSquare /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as "ideas" | "opinions")
              }
              className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-t-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? "text-indigo-400 border-b-2 border-indigo-400 bg-gray-800/60"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State Section */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "ideas" ? (
            <EmptyState
              message="You haven't submitted any startup ideas yet."
              actionText="Submit Your First Idea"
              actionIcon={<Lightbulb className="w-10 h-10" />}
            />
          ) : (
            <EmptyState
              message="You haven't cast any votes or opinions yet."
              actionText="Explore Ideas to Review"
              actionIcon={<MessageSquare className="w-10 h-10" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}
