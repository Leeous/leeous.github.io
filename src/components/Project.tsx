import GitHubIcon from "./icons/GithubIcon";
import SteamIcon from "./icons/SteamIcon";
import DownloadIcon from "./icons/DownloadIcon";

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
        <ul style={{listStyle: "none", paddingLeft: "0", display: "flex", justifyContent: "center", maxWidth: "75%", margin: "auto", flexWrap: "wrap"}}>
          {status.map((status) => (
            <li>
              <span className={`project-tag ${status}`}>{
                status === "finished" 
                ? "Finished"
                : status === "wip"
                ? "WIP"
                : status ==="abandoned"
                ? "Abandoned"
                : status}
                </span>
            </li>
          ))}
        </ul>
      )}

      {links?.length > 0 && (
        <ul className="links">
          {links.map((link, id) => (
            <li key={id} className="link">
              <a href={link.url} target="_blank" className={link.label} rel="noopener noreferrer">
                {/* {link.label.charAt(0).toUpperCase() + link.label.slice(1)} */}

                {
                link.label === "github" 
                ? <GitHubIcon />
                : link.label === "steam"
                ? <SteamIcon />
                : link.label === "download"
                ? <DownloadIcon />
                : link.label === "nexus"
                ? <DownloadIcon />
                : link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
