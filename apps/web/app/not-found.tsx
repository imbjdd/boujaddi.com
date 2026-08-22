import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "./navbar";

export const metadata: Metadata = {
  title: "Page not found",
  // Without the explicit null this inherits the layout's `canonical: "/"`, and
  // every missing URL then tells crawlers it is really the homepage.
  alternates: { canonical: null },
  robots: { index: false },
};

/**
 * An agent that lands here can't see a styled empty state, so the page has to
 * say in text where to look instead — the same links the markdown 404 lists.
 * `/llms.txt` and `/sitemap.xml` are plain <a>: they're route handlers, not
 * app routes, and next/link would try to prefetch them as RSC payloads.
 */
const elsewhere = [
  { href: "/", label: "Home", hint: "bio, projects, experience, talks" },
  { href: "/about", label: "About", hint: "what I care about" },
  { href: "/blog", label: "Blog", hint: "every article" },
  {
    href: "/changelog",
    label: "Changelog",
    hint: "a timeline of my life and work",
  },
  { href: "/contact", label: "Contact", hint: "how to reach me" },
];

const files = [
  { href: "/llms.txt", label: "llms.txt", hint: "the whole site, in one file" },
  { href: "/sitemap.xml", label: "sitemap.xml", hint: "every canonical URL" },
  { href: "/feed.xml", label: "feed.xml", hint: "RSS" },
];

export default function NotFound() {
  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="w-full flex justify-center">
        <div className="max-w-3xl w-full px-4 py-4 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Page not found</h1>
          <p className="text-black/70">
            This page doesn&apos;t exist — or it doesn&apos;t exist yet. Here is
            everything that does:
          </p>

          <ul className="flex flex-col gap-2 text-black/70">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline hover:text-black"
                >
                  {item.label}
                </Link>{" "}
                — {item.hint}
              </li>
            ))}
            {files.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="underline hover:text-black">
                  {item.label}
                </a>{" "}
                — {item.hint}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
