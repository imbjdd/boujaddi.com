/**
 * The `text/markdown` representation of every page (acceptmarkdown.com).
 *
 * Agents that fetch this site mostly want the facts, not the layout, and
 * several of them never run JavaScript. Rather than a second copy of the
 * content, these builders read the same `lib/profile` data and the same Sanity
 * documents the pages render, so the two representations cannot disagree.
 */

import { getArticleBySlug, getArticles } from "./articles";
import type { LifelineEvent } from "@/components/lifeline/types";
import { personalLifeline } from "./lifeline-personal";
import { portableTextToMarkdown } from "./portable-markdown";
import {
  aboutBullets,
  aboutIntro,
  bio,
  bookingUrl,
  contactChannels,
  contactIntro,
  experience,
  privacyIntro,
  privacySections,
  privacyUpdated,
  projects,
  socials,
  talks,
  whenNotToUse,
  whenToUse,
  type BioRun,
} from "./profile";
import { siteDescription, siteName, siteUrl } from "./site";
import { formatDate } from "./utils";

function renderBio(paragraph: BioRun[]): string {
  return paragraph
    .map((run) =>
      typeof run === "string" ? run : `[${run.text}](${run.href})`,
    )
    .join("");
}

function renderLifelineEvent(event: LifelineEvent): string {
  if (typeof event === "string") return event;

  if (Array.isArray(event)) {
    return event
      .map((segment) =>
        segment.type === "link"
          ? `[${segment.value}](${segment.href})`
          : segment.value,
      )
      .join("");
  }

  const { text } = event;
  return typeof text === "string" ? text : renderLifelineEvent(text);
}

/** Joins the sections that are present, with exactly one blank line between. */
function join(sections: (string | null)[]): string {
  return `${sections.filter(Boolean).join("\n\n")}\n`;
}

function sourceLine(path: string): string {
  return `---\n\nSource: ${siteUrl}${path}\nAll pages on this site are available as markdown via \`Accept: text/markdown\`.`;
}

async function homeMarkdown(): Promise<string> {
  const articles = await getArticles();

  return join([
    `# ${siteName}`,
    `> ${siteDescription}`,
    ...bio.map(renderBio),
    "## Projects",
    projects
      .map(
        (project) =>
          `- [${project.name}](${project.href}) — ${project.tagline} (${project.meta})`,
      )
      .join("\n"),
    "## Experience",
    experience
      .map((job) => `- **${job.company}** — ${job.role} (${job.period})`)
      .join("\n"),
    "## Talks",
    talks
      .map(
        (talk) =>
          `- ${talk.title} — ${talk.subtitle}, ${formatDate(talk.date)}`,
      )
      .join("\n"),
    articles.length > 0 ? "## Articles" : null,
    articles.length > 0
      ? articles
          .map(
            (article) =>
              `- [${article.title}](${siteUrl}/article/${article.slug}) — ${formatDate(article.date)}`,
          )
          .join("\n")
      : null,
    "## Elsewhere",
    [
      ...socials.map((social) => `- ${social.label}: ${social.href}`),
      `- RSS: ${siteUrl}/feed.xml`,
    ].join("\n"),
    sourceLine("/"),
  ]);
}

function aboutMarkdown(): string {
  return join([
    "# About",
    aboutIntro,
    aboutBullets.map((bullet) => `- ${bullet}`).join("\n"),
    sourceLine("/about"),
  ]);
}

function contactMarkdown(): string {
  return join([
    "# Contact",
    contactIntro,
    contactChannels
      .map(
        (channel) => `- [${channel.label}](${channel.href}) — ${channel.hint}`,
      )
      .join("\n"),
    sourceLine("/contact"),
  ]);
}

function privacyMarkdown(): string {
  return join([
    "# Privacy",
    `*Last updated ${formatDate(privacyUpdated)}*`,
    privacyIntro,
    ...privacySections.flatMap((section) => [
      `## ${section.heading}`,
      ...section.body,
    ]),
    sourceLine("/privacy"),
  ]);
}

async function blogMarkdown(): Promise<string> {
  const articles = await getArticles();

  return join([
    "# Blog",
    "Thoughts on building, learning, and shipping fast.",
    articles.length > 0
      ? articles
          .map(
            (article) =>
              `- [${article.title}](${siteUrl}/article/${article.slug}) — ${formatDate(article.date)}`,
          )
          .join("\n")
      : "No articles yet.",
    sourceLine("/blog"),
  ]);
}

function changelogMarkdown(): string {
  // Years with no milestone still render as a tick on the page; in markdown
  // they would be a run of empty bullets, so only the eventful ones survive.
  const years = personalLifeline.markers
    .filter((marker) => marker.events.length > 0)
    .map(
      (marker) =>
        `## ${marker.year}\n\n${marker.events
          .map((event) => `- ${renderLifelineEvent(event)}`)
          .join("\n")}`,
    );

  return join([
    "# Changelog",
    personalLifeline.description,
    ...years,
    sourceLine("/changelog"),
  ]);
}

async function articleMarkdown(slug: string): Promise<string | null> {
  const article = await getArticleBySlug(slug);
  if (!article) return null;

  return join([
    `# ${article.title}`,
    `*${formatDate(article.date)}*`,
    portableTextToMarkdown(article.content),
    sourceLine(`/article/${article.slug}`),
  ]);
}

/**
 * The body of a 404 for an agent: agents cannot see a styled empty state, so
 * the response has to say where to look instead.
 */
export function notFoundMarkdown(pathname: string): string {
  return join([
    "# 404 — Page not found",
    `There is no page at \`${pathname}\` on ${siteUrl}.`,
    "Try one of these instead:",
    [
      `- [Home](${siteUrl}/) — bio, projects, experience, talks`,
      `- [About](${siteUrl}/about)`,
      `- [Blog](${siteUrl}/blog) — every article`,
      `- [Changelog](${siteUrl}/changelog) — a timeline of my life and work`,
      `- [Contact](${siteUrl}/contact) — how to reach me`,
      `- [llms.txt](${siteUrl}/llms.txt) — the whole site, in one file`,
      `- [sitemap.xml](${siteUrl}/sitemap.xml) — every canonical URL`,
      `- [feed.xml](${siteUrl}/feed.xml) — RSS`,
    ].join("\n"),
  ]);
}

/** null means "no markdown representation" — the caller should 404. */
export async function markdownForPath(
  pathname: string,
): Promise<string | null> {
  // Trailing slashes are equivalent everywhere else on the site, so `/about/`
  // must not fall through to a 404 here.
  const path =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;

  if (path === "/") return homeMarkdown();
  if (path === "/about") return aboutMarkdown();
  if (path === "/blog") return blogMarkdown();
  if (path === "/changelog") return changelogMarkdown();
  if (path === "/contact") return contactMarkdown();
  if (path === "/privacy") return privacyMarkdown();

  const article = path.match(/^\/article\/([^/]+)$/);
  if (article?.[1]) return articleMarkdown(decodeURIComponent(article[1]));

  return null;
}

/**
 * llms.txt — the whole site as one file, so an agent can read it in a single
 * request instead of crawling. Same content as the markdown variants.
 */
export async function llmsTxt(): Promise<string> {
  const articles = await getArticles();

  return join([
    `# ${siteName}`,
    `> ${siteDescription}`,
    ...bio.map(renderBio),
    // First section on purpose: an agent skimming this file should hit the
    // "is this the right person" answer before the site map.
    "## When to use this",
    "Bring me in when the work is one of these:",
    whenToUse.map((entry) => `- **${entry.title}** — ${entry.body}`).join("\n"),
    whenNotToUse,
    `**How to reach me:** book a 15-minute call at ${bookingUrl}, or DM [@salimboujaddi](https://x.com/salimboujaddi) on X. There is no public email address — the booking link is the fastest path. See ${siteUrl}/contact.`,
    "## Pages",
    [
      `- [Home](${siteUrl}/): bio, projects, experience, and talks`,
      `- [About](${siteUrl}/about): what I care about`,
      `- [Blog](${siteUrl}/blog): every article`,
      `- [Changelog](${siteUrl}/changelog): a timeline of my life and work`,
      `- [Contact](${siteUrl}/contact): how to reach me`,
      `- [Privacy](${siteUrl}/privacy): what this site does with data`,
    ].join("\n"),
    articles.length > 0 ? "## Articles" : null,
    articles.length > 0
      ? articles
          .map(
            (article) =>
              `- [${article.title}](${siteUrl}/article/${article.slug}): published ${formatDate(article.date)}`,
          )
          .join("\n")
      : null,
    "## Projects",
    projects
      .map(
        (project) => `- [${project.name}](${project.href}): ${project.tagline}`,
      )
      .join("\n"),
    "## Experience",
    experience
      .map((job) => `- **${job.company}** — ${job.role} (${job.period})`)
      .join("\n"),
    "## Optional",
    [
      `- [RSS feed](${siteUrl}/feed.xml): new articles`,
      `- [Sitemap](${siteUrl}/sitemap.xml): every canonical URL`,
      ...socials.map((social) => `- [${social.label}](${social.href})`),
    ].join("\n"),
    `---\n\nEvery page on this site also answers \`Accept: text/markdown\` with its markdown source.`,
  ]);
}
