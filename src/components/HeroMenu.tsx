export default function HeroMenu() {
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
          <button className="px-6 py-3 rounded-xl bg-gray-950 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all cursor-pointer">
            Post an Idea
          </button>
          <button className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold shadow-lg transition-all cursor-pointer">
            Browse Ideas
          </button>
        </div>
      </div>
    </section>
  )
}