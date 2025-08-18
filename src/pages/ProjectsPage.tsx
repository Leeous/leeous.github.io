import { useEffect, useLayoutEffect, useState } from "react"
// import Project from "../components/Project";
// import projects from "../assets/data/project_data.json";
import { fetchProjects, fetchReadme } from "../lib/github";
import type { Project } from "../lib/github";
import Spinner from "../components/Spinner";
import ProjectComp from "../components/Project";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { Helmet } from "react-helmet";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState<string>()
  const [projects, setProjects] = useState<Project[]>([])

  // Ensure user is scrolled to the top of screen if using <Link> to get to projects
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    fetchProjects().then(setProjects).then(() => {
      setLoading(false);
    });
  }, [])

  if (loading) return <Spinner/>;

  return(
    <main className='projects-page page'>
      <Helmet>
        <title>Projects | Leeous</title>
      </Helmet>
      {/* going to map projects here <Project> component */}
      {projects.map((project) => {
        return(
          <ProjectComp {...project} />
        )
      })}
    </main>
  )
}