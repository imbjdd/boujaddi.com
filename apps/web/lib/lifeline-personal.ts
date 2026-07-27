import { defineLifeline } from "@/lib/lifeline-data"

/**
 * Salim's lifeline — a life, year by year.
 *
 * Years without a milestone still render as a tick on the rail, so the
 * empty years carry the shape of the life too. `endYear` is omitted.
 */
export const personalLifeline = defineLifeline({
  slug: "salim",
  name: "Salim Boujaddi",
  birthYear: 2006,
  description: "A timeline of my life and work.",
  milestones: {
    2006: {
      id: "born",
      events: ["I was born."],
    },
    2014: {
      id: "chess",
      events: ["Won 1st place at the departmental chess tournament."],
    },
    2016: {
      id: "html",
      events: ["Started learning HTML."],
    },
    2022: {
      id: "bac",
      events: [
        "Graduated high school (baccalauréat) at 16.",
        "Won a prize at the French Academic Math Olympiad.",
      ],
    },
    2023: {
      id: "new-path",
      events: [
        "Left Louis-le-Grand preparatory school for university.",
        "Won my first hackathon.",
      ],
    },
    2024: {
      id: "hackathons",
      events: ["Won some hackathons."],
    },
    2025: {
      id: "milestones",
      events: [
        "Dropped out of university.",
        "Got my first internship.",
        "Got my first job.",
        "Left my first job.",
        [
          { type: "text", value: "Joined an awesome team " },
          {
            type: "link",
            value: "Rippletide",
            href: "https://rippletide.com/",
          },
          { type: "text", value: "." },
        ],
        [
          { type: "text", value: "Made my first talk at ECB with " },
          {
            type: "link",
            value: "EuroTech Federation",
            href: "https://eurotech-federation.com/",
          },
          { type: "text", value: "." },
        ],
        "Gave 10 % of my salary to high‑impact charities.",
        [
          { type: "text", value: "Organized 3 hackathons: 2 with " },
          {
            type: "link",
            value: "Rippletide",
            href: "https://rippletide.com/",
          },
          {
            type: "text",
            value: " (SF, virtual), 1 with Hack the Fork in Paris.",
          },
        ],
        "Launched this website.",
        {
          text: [
            { type: "text", value: "Launched " },
            {
              type: "link",
              value: "Rippletide CLI",
              href: "https://www.producthunt.com/products/rippletide-eval-cli",
            },
            { type: "text", value: " on Product Hunt." },
          ],
        },
      ],
      photos: [
        {
          src: "/lifeline/ecb-talk.jpg",
          alt: "In a suit at the ECB",
          x: 0.45,
          y: -80,
          rotate: -3,
          width: 240,
        },
      ],
    },
    2026: {
      id: "today",
      events: [
        "Joined TrendTrack as a product engineer.",
        "Joined a stealth startup, building RL environments.",
        "Joined Stairling as an AI engineer.",
        [
          { type: "text", value: "Co-founded " },
          {
            type: "link",
            value: "Firedog",
            href: "https://firedog.finance",
          },
          {
            type: "text",
            value: " — AI cost intelligence for every company.",
          },
        ],
        "Got an awesome girlfriend.",
      ],
    },
  },
})
