export default function ScholarshipItem({ data }) {
  const { description, post_at, link } = data;
  return (
    <li className="flex flex-col gap-2 p-5 border-2">
      <p className="line-clamp-5">{description}</p>
      <p className="text-blue-500">Post at : {post_at}</p>
      <a
        href={`${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        More Detial
      </a>
    </li>
  );
}
