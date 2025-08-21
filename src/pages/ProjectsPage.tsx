import { useEffect, useLayoutEffect, useMemo, useState } from "react"
// import Project from "../components/Project";
// import projects from "../assets/data/project_data.json";
import { fetchProjects } from "../lib/github";
import type { Project } from "../lib/github";
import Spinner from "../components/Spinner";
import ProjectComp from "../components/Project";
import { Helmet } from "react-helmet";

type SortField = "stars" | "lastCommit" | "totalCommits";
type SortDirection = "asc" | "desc";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>("lastCommit");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [projects, setProjects] = useState<Project[]>([])

  // Ensure user is scrolled to the top of screen if using <Link> to get to projects
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

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

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      let comparison = 0;

      switch(sortBy) {
        case "stars":
          comparison = b.stargazerCount - a.stargazerCount;
          break;

        case "lastCommit": {
          const dateA = a.defaultBranchRef?.target.committedDate ? new Date(a.defaultBranchRef.target.committedDate).getTime() : 0;
          const dateB = b.defaultBranchRef?.target.committedDate ? new Date(b.defaultBranchRef.target.committedDate).getTime() : 0;
          comparison = dateB - dateA;
          break;
        }

        case "totalCommits":
          comparison = (b.defaultBranchRef?.target.history.totalCount ?? 0) -  (a.defaultBranchRef?.target.history.totalCount ?? 0);
          break;

        default:
          return 0;
      }

      return sortDirection === "asc" ? comparison * -1 : comparison;
    })
  }, [projects, sortBy, sortDirection]);

  if (loading) return <Spinner/>;

  return(
    <main className='projects-page page'>
      <Helmet>
        <title>Projects | Leeous</title>
      </Helmet>
      <label>
        Sort by:{" "}
        <select onChange={handleSortChange} value={`${sortBy}:${sortDirection}`}>
          <option value="stars:desc">Stars ↓</option>
          <option value="stars:asc">Stars ↑</option>
          <option value="lastCommit:desc">Last Commit ↓</option>
          <option value="lastCommit:asc">Last Commit ↑</option>
          <option value="totalCommits:desc">Commits ↓</option>
          <option value="totalCommits:asc">Commits ↑</option>
        </select>
      </label>
      {/* going to map projects here <Project> component */}
      {sortedProjects.map((project) => {
        return(
          <ProjectComp  key={project.id} {...project} />
        )
      })}
    </main>
  )
}