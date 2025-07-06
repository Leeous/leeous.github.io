import { useEffect } from "react"
import Project from "../components/Project";
import projects from "../assets/data/project_data.json";

export default function Projects() {
  return(
    <main className='projects-page page'>
      {projects.map((project) => {
        return(
        <Project key={project.id} id={project.id} name={project.name} date={project.date} description={project.desc} links={project.links} tags={project.tags} />
        );
      })}
    </main>
  )
}