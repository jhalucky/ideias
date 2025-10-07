

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github } from "lucide-react";

export default function HeroMenu() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-blue-600/30 blur-3xl [mask-image:radial-gradient(circle_at_center,white,transparent)]" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">
          Welcome to <span className="text-blue-400">IDEIAAs</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Dump your <span className="text-blue-400 font-semibold">tech ideas</span> and get
          real opinions from the community — support or challenge every idea.
        </p>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* First Row (Post + Browse) */}
          <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => router.push("/submit-idea")}
              className="px-6 py-3 rounded-xl bg-gray-950 hover:bg-gray-500 text-white font-semibold shadow-lg transition-all cursor-pointer"
            >
              Post an Idea
            </button>

            <button
              onClick={() => router.push("/ideas")}
              className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-lg transition-all cursor-pointer"
            >
              Browse Ideas
            </button>
          </div>

          {/* Second Row (GitHub link) */}
          <Link
            href="https://github.com/jhalucky/ideias"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-xl shadow-lg hover:bg-gray-500 transition-all cursor-pointer text-gray-300 font-semibold"
          >
            <Github className="h-4 w-4" />
            <span>Star on GitHub</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
