import { getRecentFilms } from "../../lib/letterboxd";
import { MoviesHover } from "../movies-hover";
import { FadeIn } from "../fade-in";
import { AnimatedList } from "../animated-list";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "../navbar";

export const metadata: Metadata = {
  title: "About - Salim Boujaddi",
  description: "About Salim Boujaddi - Product Engineer",
};

export default async function About() {
  const films = await getRecentFilms("grandefourchett", 3);

  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <div className="w-screen flex justify-center">
        <div className="max-w-3xl w-full px-4 py-4">
          <p className="text-black/50">A bit about me.</p>
        </div>
      </div>

      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit gap-12 w-full px-4 flex ">
          <AnimatedList className="list-disc px-4 text-black/70 flex flex-col gap-3 py-3">
            <span>I love to build projects since I'm very young</span>
            <span>Speed is one of my main strenghts.</span>
            <span>
              I like to occasionaly play chess and started to watch{" "}
              <MoviesHover films={films} />
            </span>
            <span>
              Polymath, I love to learn new things: GTM, UX, UI, Growth. I want
              to be <span className="italic">very</span> generalist.
            </span>
            <span>I want my net worth to be 1 billion before I turn 30.</span>
            <span>I give 10% of my revenue to high impact charities.</span>
          </AnimatedList>
        </div>
      </div>
    </div>
  );
}
