type ProjectProps = {
  id: string;
  name: string;
  date: string;
  description: string;
  links: string[];
  tags: string[];
};

export default function Project({
  id,
  name,
  date,
  description,
  links,
  tags,
}: ProjectProps) {
  return (
    <div className="project" id={id}>
      <h1>{name}</h1>
      <h2>{date}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>

      {links?.length > 0 && (
        <ul>
          {links.map((link, idx) => (
            <li key={idx}>
              <span dangerouslySetInnerHTML={{ __html: link }} />
            </li>
          ))}
        </ul>
      )}

      {tags?.length > 0 && (
        <ul>
          {tags.map((tag, idx) => (
            <li key={idx}>
              <span dangerouslySetInnerHTML={{ __html: tag }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
