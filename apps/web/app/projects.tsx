"use client";

import { useRef } from "react";
import CircularCarousel, {
  type CircularCarouselItem,
} from "./circular-carousel";
import { projects } from "../lib/profile";

/*
 * Three cards make a sparse, lopsided ring, so the projects go round it three
 * times. Each card remembers which project it stands for.
 */
const LAPS = 3;

const items: (CircularCarouselItem & { href: string })[] = Array.from(
  { length: LAPS },
  () =>
    projects.map((project) => ({
      src: project.poster,
      video: project.video,
      alt: `${project.name} preview`,
      title: project.name,
      subtitle: project.tagline,
      href: project.href,
    })),
).flat();

export function Projects() {
  const activeRef = useRef(0);

  return (
    <>
      {/* The carousel is a canvas of transformed images with no links in it,
          so the outline and the links an agent or screen reader needs live
          here instead. */}
      <ul className="sr-only">
        {projects.map((project) => (
          <li key={project.name}>
            <h3>
              <a href={project.href}>{project.name}</a>
            </h3>
            <p>{project.tagline}</p>
          </li>
        ))}
      </ul>

      <div className="h-[460px] w-full">
        <CircularCarousel
          items={items}
          cardWidth={320}
          aspectRatio={4 / 3}
          // Flat cards, so the front card's video plane lies exactly on it.
          curve={0}
          fadeColor="#ffffff"
          captions
          distinct={projects.length}
          onChange={(index) => {
            activeRef.current = index;
          }}
          onItemClick={(item, index) => {
            // The first click on a side card brings it to the front; only the
            // card already facing the reader opens the project.
            if (index !== activeRef.current) return;
            window.open(
              (item as (typeof items)[number]).href,
              "_blank",
              "noreferrer",
            );
          }}
        />
      </div>
    </>
  );
}
