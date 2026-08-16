import Link from "next/link";
import { FadeIn } from "./fade-in";
import { ProjectVideo } from "./project-video";
import { StaggerChildren } from "./stagger-children";

/*
 * The container is deliberately wider than the 3xl the prose keeps: the videos
 * are the only colour on the page, so they are what should claim the margins on
 * a big screen. The ramp starts at xl — breaking out any earlier would push them
 * edge-to-edge on a laptop instead of giving them room.
 */
export function Projects() {
  return (
    <div className="max-w-3xl xl:max-w-5xl 2xl:max-w-6xl h-fit w-full px-4 flex flex-col gap-6">
      <FadeIn whileInView>
        <Link
          href="https://ergon.finance"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-3"
        >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
          <ProjectVideo
            src="/result.mp4"
            poster="/result-poster.jpg"
            label="Ergon product demo"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="relative text-[30px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Ergon
          </p>
        </div>
          <div>
            <p className="font-semibold text-black/80">
              AI cost intelligence for every company
            </p>
            <p className="text-sm text-black/60">ergon.finance</p>
          </div>
        </Link>
      </FadeIn>

      <StaggerChildren
        className="flex flex-col sm:flex-row gap-4"
        childClassName="flex-1"
        whileInView
        delay={0.12}
        staggerDelay={0.1}
      >
        <Link
          href="https://hackathonatlas.com/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-3"
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
            <ProjectVideo
              src="/atlas.mp4"
              poster="/atlas-poster.jpg"
              label="Hackathon Atlas product demo"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="relative text-[22px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              Hackathon Atlas
            </p>
          </div>
          <div>
            <p className="font-semibold text-black/80">
              A directory of hackathons from around the world
            </p>
            <p className="text-sm text-black/60">hackathonatlas.com</p>
          </div>
        </Link>

        <Link
          href="https://apps.apple.com/us/app/breathe-breathing-light-guide/id6762678044"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-3"
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
            <ProjectVideo
              src="/breathe.mp4"
              poster="/breathe-poster.jpg"
              label="breathe. app demo"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="relative text-[22px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
              breathe.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black/80">
              A breathing guide that paces your breath with light
            </p>
            <p className="text-sm text-black/60">App Store · iOS</p>
          </div>
        </Link>
      </StaggerChildren>
    </div>
  );
}
