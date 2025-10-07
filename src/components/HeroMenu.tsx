"use client";

import { useRouter } from "next/navigation"
import Link from "next/link";
import { Github } from "lucide-react";

export default function HeroMenu() {
  const router = useRouter();
    const socialItem = (
    href: string,
    Icon: React.ComponentType<{ className?: string }>,
    isPlaceholder?: boolean
  ) => (
    <Link
      href={href}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noreferrer"}
      className={`inline-flex items-center justify-center rounded-md border p-2 text-sm ${
        isPlaceholder ? "opacity-70" : "hover:bg-foreground/5"
      }`}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/30 blur-3xl [mask-image:radial-gradient(circle_at_center,white,transparent)]" />
      <div className="relative z-10 p-8">
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">
          Welcome to <span className="text-blue-400">IDEIAAs</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Dump your <span className="text-blue-400 font-semibold">tech ideas</span> and get
          real opinions from the community — support or challenge every idea.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button onClick={() => router.push("/submit-idea")} className="px-6 py-3 rounded-xl bg-gray-950 hover:bg-gray-500 text-white font-semibold shadow-lg transition-all cursor-pointer">
            Post an Idea
          </button>
          <button onClick={() => router.push("/ideas")} className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-lg transition-all cursor-pointer">
            Browse Ideas
          </button>
          <div className="ml-4 bg-gray-600 pr-10 rounded-xl flex items-center gap-4 px-4 py-3 shadow-lg transition-all cursor-pointer hover:bg-gray-500" onClick={() => window.open("https://github.com/jhalucky/ideias", "_blank")}>
          <div className="icons text-gray-300 font-semibold">{socialItem("https://github.com/jhalucky/ideias", Github)}</div>
          <h1 className="font-semibold text-white">Star on GitHub</h1>
        </div>
        </div>
      </div>
    </section>
  )
}