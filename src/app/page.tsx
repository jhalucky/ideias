
import Link from 'next/link';
import Navbar from '../components/Navbar';
import HeroMenu from '../components/HeroMenu';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-b from-black via-blue-950 to-black/45 overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full mt-10">
        <Navbar />
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <HeroMenu />
      </main>
    </div>
  );
}