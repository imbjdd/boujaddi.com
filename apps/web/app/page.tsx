import { Suspense } from "react";
import { getArticles } from "../lib/articles";
import { getNowPlaying, getRecentlyPlayed } from "../lib/spotify";
import { FadeIn } from "./fade-in";
import Link from "next/link";
import { Navbar } from "./navbar";
import { Projects } from "./projects";
import { SectionLabel } from "./section-label";
import { SiteFooter } from "./site-footer";
import { SpotifyStatus } from "./spotify-status";
import { StaggerChildren } from "./stagger-children";
import { formatDate } from "../lib/utils";
import { JsonLd } from "../components/json-ld";
import { homeSchema } from "../lib/structured-data";
import {
  bio,
  experience,
  role,
  talks,
  whenNotToUse,
  whenToUse,
} from "../lib/profile";

/**
 * Streamed separately so the page shell doesn't wait on Spotify's API before
 * flushing its first byte.
 */
async function SpotifyStatusSlot() {
  const nowPlaying = await getNowPlaying();
  const recent = nowPlaying?.isPlaying ? null : await getRecentlyPlayed();

  return <SpotifyStatus initial={{ nowPlaying, recent }} />;
}

/*
 * The prose column, as one element rather than a centring wrapper around a
 * width-capped child. `mx-auto` does what the flex parent used to, which halves
 * the wrapper depth of every section on the page — most of this document is
 * markup, and the RSC payload pays for each level a second time.
 */
const COLUMN = "mx-auto w-full max-w-3xl px-4";

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
            {/* h3 under the section's h2: without it an agent reading the raw
                HTML sees one flat run of <p> where the outline should be. */}
            <h3 className="pr-4 font-normal">
              {item.subtitle && (
                <span className="text-black/60">{item.subtitle}, </span>
              )}
              {item.title}
            </h3>
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
    <div className="relative flex flex-col">
      <JsonLd data={homeSchema} />
      {/* The sticky lives here, not on the nav: this wrapper is exactly
          nav-height, so a sticky nav inside it would have nowhere to travel. */}
      <FadeIn y={-8} className="sticky top-0 z-40">
        <Navbar />
      </FadeIn>

      {/* The gap replaces the run of empty spacer divs this page used to carry
          between every section — they cost markup in the HTML and again in the
          RSC payload, for nothing a parent gap doesn't do. */}
      <main className="flex flex-col gap-10 pt-8 pb-10">
        <StaggerChildren
          className={`${COLUMN} flex flex-col gap-1`}
          delay={0.14}
          staggerDelay={0.08}
        >
          <p className="text-black/60 text-xs min-h-4">
            <Suspense fallback={null}>
              <SpotifyStatusSlot />
            </Suspense>
          </p>
          <h1 className="font-bold text-2xl">Salim Boujaddi</h1>
          <p className="text-black/70">{role}</p>
        </StaggerChildren>

        <FadeIn
          delay={0.42}
          className={`${COLUMN} flex flex-col gap-4 text-black/70`}
        >
          {bio.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((run, runIndex) =>
                typeof run === "string" ? (
                  run
                ) : (
                  <a
                    key={runIndex}
                    href={run.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-black"
                  >
                    {run.text}
                  </a>
                ),
              )}
            </p>
          ))}
        </FadeIn>

        {/* The same guidance llms.txt gives agents, on the page for people.
            It lives in lib/profile so the two can't drift apart. */}
        <FadeIn className={`${COLUMN} flex flex-col`} whileInView>
          <SectionLabel>WHAT I CAN HELP WITH</SectionLabel>
          {whenToUse.map((entry) => (
            <div key={entry.title} className="py-3">
              <h3 className="font-semibold text-black/80">{entry.title}</h3>
              <p className="text-black/70">{entry.body}</p>
            </div>
          ))}
          <p className="pt-1 text-black/60">{whenNotToUse}</p>
        </FadeIn>

        <div className="flex flex-col gap-3">
          {/* The label keeps to the prose column while <Projects> deliberately
              breaks out of it, so it can't live inside that component. */}
          <FadeIn className={COLUMN} whileInView>
            <SectionLabel>PROJECTS</SectionLabel>
          </FadeIn>
          <Projects />
        </div>

        <FadeIn className={`${COLUMN} flex flex-col`} whileInView>
          <SectionLabel>EXPERIENCE</SectionLabel>
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="flex w-full items-start justify-between gap-4 py-3"
            >
              <h3 className="pr-4 font-normal">
                <span className="font-semibold text-black/80">
                  {job.company}
                </span>
                <span className="text-black/70">, {job.role}</span>
              </h3>
              <p className="shrink-0 text-sm text-black/60">{job.period}</p>
            </div>
          ))}
        </FadeIn>

        {articleItems.length > 0 && (
          <FadeIn className={`${COLUMN} flex flex-col`} whileInView>
            <SectionLabel>ARTICLES</SectionLabel>
            <ItemList items={articleItems} />
          </FadeIn>
        )}

        <FadeIn className={`${COLUMN} flex flex-col`} whileInView>
          <SectionLabel>TALKS</SectionLabel>
          <ItemList items={talkItems} />
        </FadeIn>
      </main>

      <SiteFooter />
    </div>
  );
}
