import Link from "next/link";

export default function IdeaCard({ idea }: { idea: any }) {
  return (
    <>
      <article className="card mb-4">
        <Link href={`/ideas/${idea.id}`}>
          <h3 className="text-xl font-semibold">{idea.title}</h3>
        </Link>
        <p className="text-gray-300 mt-2">{idea.description}</p>
      </article>
    </>
  );
}
