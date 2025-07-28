import { useLayoutEffect } from "react"
import Project from "../components/Project";
import projects from "../assets/data/project_data.json";

export default function Projects() {
  // Ensure user is scrolled to the top of screen if using <Link> to get to projects
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })
  return(
    <main className='projects-page page'>
      {projects.map((project) => {
        return(
          <Project key={project.id} id={project.id} name={project.name} date={project.date} description={project.desc} links={project.links} status={project.status} />
        );
      })}
    </main>
  )
}