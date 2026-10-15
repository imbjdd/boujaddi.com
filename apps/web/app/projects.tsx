import { ProjectVideo } from "./project-video";
import { StaggerChildren } from "./stagger-children";
import { projects, type Project } from "../lib/profile";

/*
 * The name is an <h3> under the section's <h2>, not a styled <p>: it is the
 * heading of the block it sits on, and agents reading the page without
 * JavaScript have nothing but the outline to tell them where a project starts.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group relative block w-full aspect-video md:aspect-[4/3] overflow-hidden bg-black"
    >
      <ProjectVideo
        src={project.video}
        poster={project.poster}
        label={`${project.name} product demo`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
        <h3 className="font-bold text-[22px]">{project.name}</h3>
        <p className="text-sm text-white/80">{project.tagline}</p>
      </div>
    </a>
  );
}

/*
 * Edge to edge, no gutters: the videos are the only colour on the page, so on
 * a wide screen they read as one wall rather than three cards in the column.
 */
export function Projects() {
  return (
    <StaggerChildren
      className="grid w-full grid-cols-1 md:grid-cols-3"
      whileInView
      delay={0.12}
      staggerDelay={0.1}
    >
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </StaggerChildren>
  );
}
