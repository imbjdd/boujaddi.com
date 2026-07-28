import { getRecentFilms } from "../../lib/letterboxd";
import { MoviesHover } from "../movies-hover";
import { AnimatedList } from "../animated-list";
import { Metadata } from "next";
import { Navbar } from "../navbar";
import { alternatesFor } from "../../lib/site";

const description = "A bit about me.";

export const metadata: Metadata = {
  title: "About",
  description: "About Salim Boujaddi - Product Engineer",
  alternates: alternatesFor("/about"),
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About",
    description: "About Salim Boujaddi - Product Engineer",
  },
};

export default async function About() {
  const films = await getRecentFilms("grandefourchett", 3);

  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="flex flex-col">
        {/* The page deliberately shows no title, but it still needs one. */}
        <h1 className="sr-only">About</h1>

        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full px-4 py-4">
            <p className="text-black/60">{description}</p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-3xl h-fit gap-12 w-full px-4 flex ">
            <AnimatedList className="list-disc px-4 text-black/70 flex flex-col gap-3 py-3">
              <span>I love to build projects since I&apos;m very young</span>
              <span>Speed is one of my main strengths.</span>
              <span>
                I like to occasionally play chess and started to watch{" "}
                <MoviesHover films={films} />
              </span>
              <span>
                Polymath, I love to learn new things: GTM, UX, UI, Growth. I
                want to be <span className="italic">very</span> generalist.
              </span>
              <span>I want my net worth to be 1 billion before I turn 30.</span>
              <span>I give 10% of my revenue to high impact charities.</span>
            </AnimatedList>
          </div>
        </div>
      </main>
    </div>
  );
}
