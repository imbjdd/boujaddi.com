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
    <div className="flex flex-col pb-4 relative">
      <div className="-sticky top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl py-4 h-fit gap-8 w-full flex ">
          <p className="font-bold">Work</p>
          <Link href="/blog">
            <p className="">Blog</p>
          </Link>
          <Link href="/changelog">
            <p className="">Changelog</p>
          </Link>
        </div>
      </div>
      <FadeIn y={0} className="w-screen flex justify-center">
        <div className="max-w-3xl rounded-lg h-52 gap-12 w-full flex  relative overflow-hidden">
          <img
            src="bg.png"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-6 gap-12 w-full flex "></div>
      </div>
      <FadeIn delay={0.15} className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full flex ">
          <div className="flex items-center h-fit w-fit justify-center">
            <img
              className="h-32 w-32 aspect-square rounded-lg transition-transform duration-300 hover:-rotate-4 hover:scale-102"
              src="moi.jpeg"
            />
          </div>
          <div className="flex flex-col-reverse  grow">
            <div className="px-4 py-1 w-full">
              <p>Product Engineer</p>
            </div>
            <div className="px-4 w-full">
              <p className="font-bold text-2xl">Salim Boujaddi</p>
            </div>
            <div className="px-4 w-full">
              <p className="text-black/50 text-xs mb-1">
                Listening to Sam Sauvage
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-6 gap-12 w-full flex "></div>
      </div>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit gap-12 w-full flex ">
          <AnimatedList className="list-disc px-4 text-black/70 flex flex-col gap-2 py-2">
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
            <span>I have an awesome girlfriend.</span>
            <span>I want my net worth to be 1 billion before I turn 30.</span>
            <span>I give 10% of my revenue to high impact charities.</span>
          </AnimatedList>
        </div>
      </div>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-6 gap-12 w-full flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full flex flex-col ">
          <div className="h-fit w-full flex">
            <img
              className="ml-4 mr-8 my-4 w-16 h-16 transition-transform duration-300 hover:-rotate-20 hover:scale-102"
              src="/rippletide.png"
            />
            <div className="flex flex-col w-full justify-center gap-2">
              <div className="flex justify-between w-full">
                <p>
                  <span className="font-semibold text-black/80">
                    Product Engineer
                  </span>
                  <span className="text-black/70">, Rippletide</span>
                </p>
                <p>
                  Oct 2025 - <span className="blur">Jan 2042</span>
                </p>
              </div>
              <p className="text-black/70">
                I develop Rippletide's product, deliver solutions for clients,
                organize hackathons, and deploy systems to production.
              </p>
            </div>
          </div>
          <div className="max-w-3xl h-fit w-full flex">
            <img
              className="ml-4 mr-8 my-4 w-16 h-16 transition-transform duration-300 hover:-rotate-8 hover:scale-102"
              src="/linkpact.jpeg"
            />
            <div className="flex flex-col w-full justify-center gap-2">
              <div className="flex justify-between w-full">
                <p>
                  <span className="font-semibold text-black/80">
                    AI Consultant
                  </span>
                  <span className="text-black/70">, LinkPact</span>
                </p>
                <p>June 2025 - September 2025</p>
              </div>
              <p className="text-black/70">
                <span className="text-black/50 mr-2">
                  Internship and then full-time
                </span>
                I scoped projects, built AI agents with LoRA, and designed
                benchmarks to evaluate their performance.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-6 gap-12 w-full flex "></div>
      </div>

      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full flex flex-col justify-between ">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="py-2 transition-colors cursor-pointer"
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
        <div className="max-w-3xl h-6 gap-12 w-full flex "></div>
      </div>

      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full flex flex-col justify-between ">
          {talks.map((talk) => (
            <div key={talk.id} className="py-2">
              <p className="text-black/50">{talk.organization}</p>
              <div className="flex justify-between">
                <p className="">{talk.title}</p>
                <p className="text-black/50">{talk.date}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
