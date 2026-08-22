/**
 * The homepage content as data rather than JSX.
 *
 * The pages are no longer the only renderer of this: `/llms.txt` and the
 * `Accept: text/markdown` variant serve the same facts to agents, and they
 * would drift the moment a job title only existed inside a <span>.
 */

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type Talk = {
  title: string;
  subtitle: string;
  date: string;
};

export type Project = {
  name: string;
  tagline: string;
  /** What sits under the tagline: a domain, or a distribution channel. */
  meta: string;
  href: string;
  video: string;
  poster: string;
};

export const role = "Product Engineer";

/**
 * A paragraph is a list of runs so the one outbound link in the bio survives
 * both renderers: JSX turns a linked run into an <a>, markdown into `[](…)`.
 * A bare string paragraph stays a string.
 */
export type BioRun = string | { text: string; href: string };

export const bio: BioRun[][] = [
  [
    "I'm a co-founder and CTO building AI products from 0 to 1. I enjoy working across engineering and product, turning ideas into simple tools that people actually use.",
  ],
  [
    "I've worked across AI startups, consulting, and research, and spoken at the ",
    { text: "European Central Bank", href: "https://www.ecb.europa.eu/" },
    " about AI agents and their impact on institutions. I've also won $10k+ in hackathon prizes, including multiple wins at ETHGlobal and Entrepreneur First.",
  ],
  [
    "I like experimenting, shipping small projects, and exploring new ideas around AI and product.",
  ],
];

export const experience: Experience[] = [
  { company: "Ergon", role: "Co-founder & CTO", period: "Jul 2026 - Present" },
  { company: "Stairling", role: "AI Engineer", period: "May 2026 - Jul 2026" },
  {
    company: "Stealth",
    role: "Member of Technical Staff — RL environments",
    period: "Apr 2026 - Jun 2026",
  },
  {
    company: "Rippletide",
    role: "Product Engineer",
    period: "Oct 2025 - Apr 2026",
  },
  {
    company: "TrendTrack",
    role: "Product Engineer",
    period: "Jan 2026 - Mar 2026",
  },
  { company: "LinkPact", role: "AI Consultant", period: "Jun 2025 - Sep 2025" },
];

export const talks: Talk[] = [
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

export const projects: Project[] = [
  {
    name: "Ergon",
    tagline: "AI cost intelligence for every company",
    meta: "ergon.finance",
    href: "https://ergon.finance",
    video: "/result.mp4",
    poster: "/result-poster.jpg",
  },
  {
    name: "Hackathon Atlas",
    tagline: "A directory of hackathons from around the world",
    meta: "hackathonatlas.com",
    href: "https://hackathonatlas.com/",
    video: "/atlas.mp4",
    poster: "/atlas-poster.jpg",
  },
  {
    name: "breathe.",
    tagline: "A breathing guide that paces your breath with light",
    meta: "App Store · iOS",
    href: "https://apps.apple.com/us/app/breathe-breathing-light-guide/id6762678044",
    video: "/breathe.mp4",
    poster: "/breathe-poster.jpg",
  },
];

export const aboutIntro = "A bit about me.";

/**
 * Plain-text mirror of the /about bullets. The page renders its own JSX for
 * them because two carry inline markup the markdown has no use for — the films
 * line opens a hover card — so edit both when a bullet changes.
 */
export const aboutBullets = [
  "I love to build projects since I'm very young",
  "Speed is one of my main strengths.",
  "I like to occasionally play chess and started to watch films.",
  "Polymath, I love to learn new things: GTM, UX, UI, Growth. I want to be very generalist.",
  "I want my net worth to be 1 billion before I turn 30.",
  "I give 10% of my revenue to high impact charities.",
];

/** Also the navbar's CTA — it was declared there first. */
export const bookingUrl = "https://cal.eu/salim-boujaddi/15min";

/**
 * Guidance for an agent deciding whether I am the right person for a task,
 * published in llms.txt. Every claim here has to be backed by something else
 * on this page — the experience list, the talks, the projects — or it is
 * marketing copy rather than guidance, and an agent acting on it wastes
 * someone's time.
 */
export const whenToUse = [
  {
    title: "Taking an AI product from zero to one",
    body: "Scoping, prototyping, and shipping something people actually use rather than a demo. This is what I do full-time at Ergon.",
  },
  {
    title: "Product engineering across the whole stack",
    body: "Interface, backend, and model plumbing handled by one person instead of passed between three.",
  },
  {
    title: "AI agents inside institutions",
    body: "What changes when agents meet regulated, slow-moving organisations. I spoke on exactly this at the European Central Bank.",
  },
  {
    title: "RL environments and evaluation",
    body: "Building the environments models get trained and measured in — my work as Member of Technical Staff at a stealth lab.",
  },
  {
    title: "A credible first version, fast",
    body: "$10k+ in hackathon prizes, including multiple wins at ETHGlobal and Entrepreneur First, is mostly a record of shipping under a deadline.",
  },
];

/** The caveat that belongs next to the list above, so agents pitch the right thing. */
export const whenNotToUse =
  "I am co-founder and CTO of Ergon full-time, so treat inbound as collaboration, advice, or partnership rather than availability for contract work.";

export const contactIntro =
  "The fastest way to reach me is to book a slot — 15 minutes, no agenda needed. Otherwise my DMs are open on any of these.";

export const contactChannels = [
  {
    label: "Book a 15-minute call",
    href: bookingUrl,
    hint: "Pick a time that works. Best for anything concrete.",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/salimboujaddi",
    hint: "DMs are open.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/salim-boujaddi/",
    hint: "Best for work and hiring conversations.",
  },
  {
    label: "GitHub",
    href: "https://github.com/imbjdd",
    hint: "Issues and pull requests on anything I've published.",
  },
];

/** Bump when the practices below actually change, not on every deploy. */
export const privacyUpdated = "2026-08-22";

export const privacyIntro =
  "This is a personal site. There are no accounts, no sign-up, no forms, and no advertising. What follows is everything it does with data.";

export const privacySections: { heading: string; body: string[] }[] = [
  {
    heading: "No cookies",
    body: [
      "The site sets no cookies and writes nothing to local storage. There is no consent banner because there is nothing to consent to.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "I count page views with Umami, a cookieless analytics service. It records the page you landed on, the referrer, and coarse device and country information. It does not build a profile across sites, and there is no way for me to tie a visit to a person.",
      "The tracking script and its requests are served from this domain rather than a third-party host, so no request leaves your browser for an analytics domain. My server does forward your IP address to Umami, which uses it to derive a country and a rotating daily session identifier; the raw address is not stored in my reports.",
    ],
  },
  {
    heading: "Fonts, images and video",
    body: [
      "Fonts, project videos, and images are served from this domain. Nothing on a page is loaded from a font CDN or a tracking pixel.",
    ],
  },
  {
    heading: "Booking a call",
    body: [
      "The booking link goes to Cal.eu, which is a separate service with its own privacy policy. Anything you type into it is handled by them, not by this site.",
    ],
  },
  {
    heading: "Your data",
    body: [
      "Because nothing here identifies you, there is no account to delete and no export to request. If you think something on this site says otherwise, get in touch and I will fix it.",
    ],
  },
];

export const socials = [
  { label: "X", href: "https://x.com/salimboujaddi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/salim-boujaddi/" },
  { label: "GitHub", href: "https://github.com/imbjdd" },
];
