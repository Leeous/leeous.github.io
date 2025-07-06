import React from "react";

type Link = {
  label: string;
  url: string;
}

type ProjectProps = {
  id: string;
  name: string;
  date: string;
  description: string;
  links: Link[];
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

      {tags?.length > 0 && (
          tags.map((tag, id) => (
              <span dangerouslySetInnerHTML={{ __html: tag }} />
          ))
      )}

      {links?.length > 0 && (
        <ul className="links">
          {links.map((link, id) => (
            <li key={id}>
              <a href={link.url} target="_blank" className={link.label + " link"} rel="noopener noreferrer">
                {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
