import React from "react";

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
  console.log(links)
  return (
    <div className="project" id={id}>
      <h1>{name}</h1>
      <h2>{date}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>

      {tags?.length > 0 && (
          tags.map((tag, id) => (
              <span dangerouslySetInnerHTML={{ __html: tag }} />
          ))
      )}

      {links?.length > 0 && (
        <ul>
          {links.map((link, id) => (
            <li key={id}>
              <span dangerouslySetInnerHTML={{ __html: link }} />
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
