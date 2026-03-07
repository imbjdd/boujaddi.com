import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { getArticles } from "../lib/articles";
import { getRecentFilms } from "../lib/letterboxd";
import { MoviesHover } from "./movies-hover";
import { FadeIn } from "./fade-in";
import { AnimatedList } from "./animated-list";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salim Boujaddi - Product Engineer",
  description:
    "Product Engineer building fast. I love hackathons, speed, and shipping products.",
};

export default async function Home() {
  const articles = await getArticles();
  const films = await getRecentFilms("grandefourchett", 3);

  const talks = [
    {
      id: 1,
      organization: "European Central Bank",
      title: "AI Agents: Transforming Central Banking for the Digital Age",
      date: "October 8, 2025",
    },
    {
      id: 2,
      organization: "Hack the Fork",
      title: "Workshop: Idea brainstorming with several mentors",
      date: "December 13, 2025",
    },
  ];

  return (
    <div className="relative flex flex-col pb-10">
      <div className="-sticky top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl py-4 h-fit gap-8 w-full px-4 flex ">
          <p className="font-bold">Work</p>
          <Link href="/blog">
            <p className="">Blog</p>
          </Link>
          <Link href="/changelog">
            <p className="">Changelog</p>
          </Link>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-8 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn delay={0.15} className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 flex items-end justify-between gap-8">
          <div className="flex grow flex-col gap-1">
            <p className="text-black/50 text-xs">Listening to Sam Sauvage</p>
            <p className="font-bold text-2xl">Salim Boujaddi</p>
            <p className="text-black/70">Product Engineer</p>
          </div>
          <div className="flex items-center h-fit w-fit justify-center">
            <img
              className="h-40 w-40 aspect-square rounded-lg transition-transform duration-300 hover:-rotate-4 hover:scale-102"
              src="unnamed.jpg"
            />
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
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
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">
                Product Engineer
              </span>
              <span className="text-black/70">, Rippletide</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Oct 2025 - <span className="blur">Jan 2042</span>
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">AI Consultant</span>
              <span className="text-black/70">, LinkPact</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              June 2025 - September 2025
            </p>
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>

      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col justify-between ">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="py-3 transition-colors cursor-pointer"
            >
              <p className="">{article.title}</p>
              <p className="text-black/50">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>

      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col justify-between ">
          {talks.map((talk) => (
            <div key={talk.id} className="py-3">
              <p className="text-black/50">{talk.organization}</p>
              <div className="flex justify-between">
                <p className="">{talk.title}</p>
                <p className="text-black/50">{talk.date}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 pb-2 flex gap-6 text-sm text-black/70">
          <Link
            href="https://x.com/salimboujaddi"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-black"
          >
            X
          </Link>
          <Link
            href="https://www.linkedin.com/in/salim-boujaddi/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-black"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/imbjdd"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-black"
          >
            GitHub
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
