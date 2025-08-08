// import GitHubIcon from '../assets/svg/github.svg';
// import SteamIcon from '../assets/svg/steam.svg';
// import DownloadIcon from '../assets/svg/download.svg';
// import NexusIcon from '../assets/svg/nexus.svg';
import { Link } from "react-router-dom";
import type { Project } from "../lib/github";
import { formatDate } from "../lib/utils";



export default function Project(props: Project) {
  return (
    <div className="project">
      <h1 className="project-name">{props.name}</h1>
      <h2 className="project-created-at">{formatDate(props.createdAt)}</h2>
      <p className="project-stargazer-count">{props.stargazerCount}</p>
      <p className="project-desc">{props.description}</p>
      <Link to={`/projects/${props.name}`} className="read-more-button">
        View
      </Link>
    </div>
  );
}
