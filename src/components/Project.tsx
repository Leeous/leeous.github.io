import GitHubIcon from '../assets/svg/github.svg';
import SteamIcon from '../assets/svg/steam.svg';
import DownloadIcon from '../assets/svg/download.svg';
import NexusIcon from '../assets/svg/nexus.svg';

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
        <ul style={{ listStyle: "none", paddingLeft: "0", display: "flex", justifyContent: "center", maxWidth: "75%", margin: "auto", flexWrap: "wrap" }}>
          {status.map((status) => (
            <li>
              <span className={`project-tag ${status}`}>{
                status === "finished"
                  ? "Finished"
                  : status === "wip"
                    ? "WIP"
                    : status === "abandoned"
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
                {
                  link.label === "github"
                  ? <>Github <img className="icon" style={{ width: "24px" }} src={GitHubIcon} alt="Github Icon" /></>
                  : link.label === "steam"
                  ? <>Steam <img className="icon" style={{ width: "24px" }} src={SteamIcon} alt="Steam Icon" /></>
                  : link.label === "download"
                  ? <>Download <img className="icon" style={{ width: "24px" }} src={DownloadIcon} alt="Download Icon" /></>
                  : link.label === "nexus"
                  ? <>Nexus <img className="icon" style={{ width: "24px" }} src={NexusIcon} alt="Nexus Icon" /></>
                  : link.label
                }
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
