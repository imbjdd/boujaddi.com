import { FadeIn } from "./fade-in";
import { ProjectVideo } from "./project-video";
import { StaggerChildren } from "./stagger-children";
import { projects, type Project } from "../lib/profile";

const [featured, ...rest] = projects;

/*
 * The name is an <h3> under the section's <h2>, not a styled <p>: it is the
 * heading of the block it sits on, and agents reading the page without
 * JavaScript have nothing but the outline to tell them where a project starts.
 */
function ProjectCard({
  project,
  titleClassName,
}: {
  project: Project;
  titleClassName: string;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col gap-3"
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
        <ProjectVideo
          src={project.video}
          poster={project.poster}
          label={`${project.name} product demo`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <h3
          className={`relative font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] ${titleClassName}`}
        >
          {project.name}
        </h3>
      </div>
      <div>
        <p className="font-semibold text-black/80">{project.tagline}</p>
        <p className="text-sm text-black/60">{project.meta}</p>
      </div>
    </a>
  );
}

/*
 * The container is deliberately wider than the 3xl the prose keeps: the videos
 * are the only colour on the page, so they are what should claim the margins on
 * a big screen. The ramp starts at xl — breaking out any earlier would push them
 * edge-to-edge on a laptop instead of giving them room.
 */
export function Projects() {
  return (
    <div className="mx-auto w-full max-w-3xl xl:max-w-5xl 2xl:max-w-6xl px-4 flex flex-col gap-6">
      {featured && (
        <FadeIn whileInView>
          <ProjectCard project={featured} titleClassName="text-[30px]" />
        </FadeIn>
      )}

      <StaggerChildren
        className="flex flex-col sm:flex-row gap-4"
        childClassName="flex-1"
        whileInView
        delay={0.12}
        staggerDelay={0.1}
      >
        {rest.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            titleClassName="text-[22px]"
          />
        ))}
      </StaggerChildren>
    </div>
  );
}
