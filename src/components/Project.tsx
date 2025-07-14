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
  status: string[];
};

export default function Project({
  id,
  name,
  date,
  description,
  links,
  status,
}: ProjectProps) {
  return (
    <div className="project" id={id}>
      <h1>{name}</h1>
      <h2>{date}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>

      {status?.length > 0 && (
          status.map((status) => (
              <span className={`project-status ${status}`}>{
                status === "finished" 
                ? "Finished"
                : status === "wip"
                ? "WIP"
                : status ==="abandoned"
                ? "Abandoned"
                :""}
                </span>
          ))
      )}

      {links?.length > 0 && (
        <ul className="links">
          {links.map((link, id) => (
            <li key={id} className="link">
              <a href={link.url} target="_blank" className={link.label} rel="noopener noreferrer">
                {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
