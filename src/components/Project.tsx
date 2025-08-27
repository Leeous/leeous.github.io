// import GitHubIcon from '../assets/svg/github.svg';
// import SteamIcon from '../assets/svg/steam.svg';
// import DownloadIcon from '../assets/svg/download.svg';
// import NexusIcon from '../assets/svg/nexus.svg';
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import dayjs from "dayjs";
import commitIcon from "../assets/svg/commit.svg";
import type { SimplifiedRepo } from "../lib/github/types";

export default function Project(props: SimplifiedRepo) {
  return (
    <div className="project">
      <h1 className="project-name">{props.name}</h1>
      <h2 className="project-created-at">{formatDate(props.createdAt)}</h2>
      <p className="project-desc">{props.description}</p>
      {props.topics.length !== 0 &&
        <ul className="project-topic-list">
          {props.topics.map(topic => {
            return (<li className="project-topic">{topic}</li>)
          })}
        </ul>
      }
      <p className="project-last-commit">{props.latestCommit?.message} - <a target="_blank" href={props.latestCommit?.url}>{dayjs(props.latestCommit?.date).fromNow()}</a></p>
      <div className="project-stats">
        {props.language?.name &&
          <p style={props.language.name === "Lua" ? { color: "#0070ff" } : { color: props.language.color }} className="project-language">{props.language.name}</p>
        }
        <p className="project-stargazer-count">⭐ {props.stars}</p>
        <p className="project-stargazer-count" style={{ display: "flex", alignItems: "center" }}><img width="24px" style={{ margin: "0 10px", display: "inline-block" }} src={commitIcon} alt="Commit Icon" /> {props.commitCount}</p>
      </div>

      <Link to={`/projects/${props.name}`} className="read-more-button">
        Open README &#129034;
      </Link>
    </div>
  );
}
