import { useEffect, useMemo, useState } from "react"
import { fetchProjects } from "../lib/github/api";
import type { SimplifiedRepo } from "../lib/github/types";
import Spinner from "../components/Spinner";
import ProjectComp from "../components/Project";
import { Helmet } from "react-helmet";

type SortField = "stars" | "lastCommit" | "totalCommits";
type SortDirection = "asc" | "desc";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>("lastCommit");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [projects, setProjects] = useState<SimplifiedRepo[]>([])
  const hiddenProjects = ["Leeous", "leeous.github.io"];

  // Load & place repos
  useEffect(() => {
    fetchProjects().then(setProjects).then(() => {
      setLoading(false);
    });
  }, []);

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [field, direction] = e.target.value.split(":") as [SortField, SortDirection];
    setSortBy(field);
    setSortDirection(direction);
  }

  const visibleProjects = useMemo(() => {
    return projects.filter(p => !hiddenProjects.includes(p.name))
  }, [hiddenProjects, projects]);

  const sortedProjects = useMemo(() => {
    return [...visibleProjects].sort((a, b) => {
      let comparison = 0;

      switch(sortBy) {
        case "stars":
          comparison = b.stars - a.stars;
          break;

        case "lastCommit": {
          const dateA = a.latestCommit?.date ? new Date(a.latestCommit.date).getTime() : 0;
          const dateB = b.latestCommit?.date ? new Date(b.latestCommit?.date).getTime() : 0;
          comparison = dateB - dateA;
          break;
        }

        case "totalCommits":
          comparison = (b.commitCount ?? 0) -  (a.commitCount ?? 0);
          break;

        default:
          return 0;
      }

      return sortDirection === "asc" ? comparison * -1 : comparison;
    })
  }, [visibleProjects, sortBy, sortDirection]);

  if (loading) return <Spinner/>;

  return(
    <main className='projects-page page'>
      <Helmet>
        <title>Projects | Leeous</title>
      </Helmet>
      <label>
        Sort by:{" "}
        <select onChange={handleSortChange} value={`${sortBy}:${sortDirection}`}>
          <option value="lastCommit:desc">Last Commit ↓</option>
          <option value="lastCommit:asc">Last Commit ↑</option>
          <option value="stars:desc">Stars ↓</option>
          <option value="stars:asc">Stars ↑</option>
          <option value="totalCommits:desc">Commits ↓</option>
          <option value="totalCommits:asc">Commits ↑</option>
        </select>
      </label>
      {sortedProjects.map((project) => {
        return(
          <ProjectComp  key={project.id} {...project} />
        )
      })}
    </main>
  )
}