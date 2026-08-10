import { Suspense } from "react";
import { getArticles } from "../lib/articles";
import { getNowPlaying, getRecentlyPlayed } from "../lib/spotify";
import { FadeIn } from "./fade-in";
import Link from "next/link";
import { Navbar } from "./navbar";
import { Projects } from "./projects";
import { SectionLabel } from "./section-label";
import { SpotifyStatus } from "./spotify-status";
import { StaggerChildren } from "./stagger-children";
import { formatDate } from "../lib/utils";
import { JsonLd } from "../components/json-ld";
import { homeSchema } from "../lib/structured-data";

/**
 * Streamed separately so the page shell doesn't wait on Spotify's API before
 * flushing its first byte.
 */
async function SpotifyStatusSlot() {
  const nowPlaying = await getNowPlaying();
  const recent = nowPlaying?.isPlaying ? null : await getRecentlyPlayed();

  return <SpotifyStatus initial={{ nowPlaying, recent }} />;
}

type ListItem = {
  title: string;
  subtitle: string | null;
  date: string;
  href: string | null;
};

const byDateDesc = (a: ListItem, b: ListItem) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

function ItemList({ items }: { items: ListItem[] }) {
  return (
    <>
      {items.map((item) => {
        const date = formatDate(item.date);
        const content = (
          <div className="py-3 flex justify-between">
            <p className="pr-4">
              {item.subtitle && (
                <span className="text-black/60">{item.subtitle}, </span>
              )}
              {item.title}
            </p>
            <p className="shrink-0 text-black/60">{date}</p>
          </div>
        );
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className="transition-colors cursor-pointer"
          >
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </>
  );
}

export default async function Home() {
  const articles = await getArticles();

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

  const articleItems: ListItem[] = articles
    .map((a) => ({
      title: a.title,
      subtitle: null,
      date: a.date,
      href: `/article/${a.slug}`,
    }))
    .sort(byDateDesc);

  const talkItems: ListItem[] = talks
    .map((t) => ({
      title: t.title,
      subtitle: t.subtitle,
      date: t.date,
      href: null,
    }))
    .sort(byDateDesc);

  return (
    <div className="relative flex flex-col pb-10">
      <JsonLd data={homeSchema} />
      <FadeIn y={-8}>
        <Navbar />
      </FadeIn>
      <main className="flex flex-col">
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-8 gap-12 w-full px-4 flex "></div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 flex items-end justify-between gap-8">
          <StaggerChildren
            className="flex grow flex-col gap-1"
            delay={0.14}
            staggerDelay={0.08}
          >
            <p className="text-black/60 text-xs min-h-4">
              <Suspense fallback={null}>
                <SpotifyStatusSlot />
              </Suspense>
            </p>
            <h1 className="font-bold text-2xl">Salim Boujaddi</h1>
            <p className="text-black/70">Product Engineer</p>
          </StaggerChildren>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn delay={0.42} className="w-full flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col gap-4 text-black/70">
          <p>I&apos;m a co-founder and CTO building AI products from 0 to 1. I enjoy working across engineering and product, turning ideas into simple tools that people actually use.</p>
          <p>I&apos;ve worked across AI startups, consulting, and research, and spoken at the <a href="https://www.ecb.europa.eu/" target="_blank" rel="noreferrer" className="underline hover:text-black">European Central Bank</a> about AI agents and their impact on institutions. I&apos;ve also won $10k+ in hackathon prizes, including multiple wins at ETHGlobal and Entrepreneur First.</p>
          <p>I like experimenting, shipping small projects, and exploring new ideas around AI and product.</p>
        </div>
      </FadeIn>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <div className="w-full flex justify-center">
        <Projects />
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      <FadeIn className="w-full flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
          <SectionLabel>EXPERIENCE</SectionLabel>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Firedog</span>
              <span className="text-black/70">, Co-founder & CTO</span>
            </p>
            <p className="shrink-0 text-sm text-black/60">
              Jul 2026 - Present
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Stairling</span>
              <span className="text-black/70">, AI Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/60">
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
            <p className="shrink-0 text-sm text-black/60">
              Apr 2026 - Jun 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">Rippletide</span>
              <span className="text-black/70">, Product Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/60">
              Oct 2025 - Apr 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">TrendTrack</span>
              <span className="text-black/70">, Product Engineer</span>
            </p>
            <p className="shrink-0 text-sm text-black/60">
              Jan 2026 - Mar 2026
            </p>
          </div>
          <div className="flex w-full items-start justify-between gap-4 py-3">
            <p className="pr-4">
              <span className="font-semibold text-black/80">LinkPact</span>
              <span className="text-black/70">, AI Consultant</span>
            </p>
            <p className="shrink-0 text-sm text-black/60">
              Jun 2025 - Sep 2025
            </p>
          </div>
        </div>
      </FadeIn>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>

      {articleItems.length > 0 && (
        <>
          <FadeIn className="w-full flex justify-center" whileInView>
            <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
              <SectionLabel>ARTICLES</SectionLabel>
              <ItemList items={articleItems} />
            </div>
          </FadeIn>
          <div className="w-full flex justify-center">
            <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
          </div>
        </>
      )}
      <FadeIn className="w-full flex justify-center" whileInView>
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col">
          <SectionLabel>TALKS</SectionLabel>
          <ItemList items={talkItems} />
        </div>
      </FadeIn>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl h-10 gap-12 w-full px-4 flex "></div>
      </div>
      </main>
      <FadeIn className="w-full flex justify-center" whileInView>
        <footer className="max-w-3xl h-fit w-full px-4 pb-2 flex gap-6 text-sm text-black/70">
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
          <a
            href="/feed.xml"
            className="transition-colors hover:text-black"
          >
            RSS
          </a>
        </footer>
      </FadeIn>
    </div>
  );
}
