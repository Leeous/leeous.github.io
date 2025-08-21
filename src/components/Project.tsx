// import GitHubIcon from '../assets/svg/github.svg';
// import SteamIcon from '../assets/svg/steam.svg';
// import DownloadIcon from '../assets/svg/download.svg';
// import NexusIcon from '../assets/svg/nexus.svg';
import { Link } from "react-router-dom";
import type { Project } from "../lib/github";
import { formatDate } from "../lib/utils";
import dayjs from "dayjs";
import commitIcon from "../assets/svg/commit.svg";

export default function Project(props: Project) {
  return (
    <div className="project">
      <h1 className="project-name">{props.name}</h1>
      <h2 className="project-created-at">{formatDate(props.createdAt)}</h2>
      <p className="project-desc">{props.description}</p>
      <p className="project-last-commit">{props.defaultBranchRef?.target.message} - <a target="_blank" href={props.defaultBranchRef?.target.url}>{dayjs(props.defaultBranchRef?.target.committedDate).fromNow()}</a></p>
      <div className="project-stats">
          {props.primaryLanguage?.name && 
            <p style={props.primaryLanguage.name === "Lua" ? {color: "#0070ff"} : {color: props.primaryLanguage.color} } className="project-language">{props.primaryLanguage.name}</p>
          }
          <p className="project-stargazer-count">{props.stargazerCount} ⭐</p>
          <p className="project-stargazer-count" style={{display: "flex", alignItems: "center"}}>{props.defaultBranchRef?.target.history.totalCount} <img width="24px" style={{margin: "0 10px", display: "inline-block"}} src={commitIcon} alt="Commit Icon" /></p>
      </div>
      <Link to={`/projects/${props.name}`} className="read-more-button">
        View README
      </Link>
    </div>
  );
}
