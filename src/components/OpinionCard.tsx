export default function OpinionCard({ opinion }: { opinion: any }) {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <p>{opinion.content}</p>
      <small>
        On Idea: {opinion.idea.title} | Created at:{" "}
        {new Date(opinion.createdAt).toLocaleString()}
      </small>
    </div>
  );
}
