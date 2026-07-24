import { Button } from "@repo/ui/button";
import { getArticles } from "../lib/articles";
import { getNowPlaying, getRecentlyPlayed } from "../lib/spotify";
import { FadeIn } from "./fade-in";
import Link from "next/link";
import { Metadata } from "next";
import { HackathonAtlasBanner } from "./hackathon-atlas-banner";
import { Navbar } from "./navbar";
import { SpotifyStatus } from "./spotify-status";

export const metadata: Metadata = {
  title: "Salim Boujaddi - Product Engineer",
  description:
    "Product Engineer building fast. I love hackathons, speed, and shipping products.",
};

export default async function Home() {
  const articles = await getArticles();
  const nowPlaying = await getNowPlaying();
  const recent = nowPlaying?.isPlaying ? null : await getRecentlyPlayed();

  const talks = [
    {
      title: "AI Agents: Transforming Central Banking",
      subtitle: "European Central Bank",
      date: "2025-10-08",
    },
    {
      title: "Workshop: Idea brainstorming with several mentors",
      subtitle: "Hack the Fork",
      date: "2025-12-13",
    },
  ];

  const allItems = [
    ...articles.map((a) => ({ title: a.title, subtitle: null, date: a.date, href: `/article/${a.slug}` })),
    ...talks.map((t) => ({ title: t.title, subtitle: t.subtitle, date: t.date, href: null })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-8 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn delay={0.15} className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 flex items-end justify-between gap-8">
          <div className="flex grow flex-col gap-1">
            <p className="text-black/50 text-xs">
              <SpotifyStatus initial={{ nowPlaying, recent }} />
            </p>
            <p className="font-bold text-2xl">Salim Boujaddi</p>
            <p className="text-black/70">Product Engineer</p>
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col gap-4 text-black/70">
          <p>I'm a product engineer focused on building and shipping AI products from 0 to 1. I enjoy working across engineering and product, turning ideas into simple tools that people actually use.</p>
          <p>I've worked on AI projects as both a builder and consultant, and spoke at the <a href="https://www.ecb.europa.eu/" target="_blank" rel="noreferrer" className="underline hover:text-black">European Central Bank</a> about AI agents and their impact on institutions.</p>
          <p>Outside of that, I like experimenting, shipping small projects, and exploring new ideas around AI and product.</p>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center" whileInView>
        <Link href="https://hackathonatlas.com/" target="_blank" rel="noreferrer" className="max-w-3xl h-fit w-full px-4 flex flex-col gap-3">
          <HackathonAtlasBanner />
          <div>
            <p className="font-semibold text-black/80">A comprehensive directory of hackathons from around the world</p>
            <p className="text-sm text-black/50">2026</p>
          </div>
        </Link>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Firedog</span>
              <span className="text-black/70">, Co-founder & CTO</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Jul 2026 - Present
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Stairling</span>
              <span className="text-black/70">, AI Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              May 2026 - Jul 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Stealth</span>
              <span className="text-black/70">
                , Member of Technical Staff — RL environments
              </span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Apr 2026 - Jun 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Rippletide</span>
              <span className="text-black/70">, Product Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Oct 2025 - Apr 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">TrendTrack</span>
              <span className="text-black/70">, Product Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Jan 2026 - Mar 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">LinkPact</span>
              <span className="text-black/70">, AI Consultant</span>
            </p>
            <p className="shrink-0 text-sm text-black/50">
              Jun 2025 - Sep 2025
            </p>
          </div>
        </div>
      </FadeIn>
      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>

      <FadeIn className="w-screen flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
          {allItems.map((item) => {
            const date = new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const content = (
              <div className="py-3 flex justify-between">
                <p className="pr-4">
                  {item.subtitle && <span className="text-black/50">{item.subtitle}, </span>}
                  {item.title}
                </p>
                <p className="shrink-0 text-black/50">{date}</p>
              </div>
            );
            return item.href ? (
              <Link key={item.title} href={item.href} className="transition-colors cursor-pointer">
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
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
