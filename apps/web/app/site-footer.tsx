import Link from "next/link";
import { FadeIn } from "./fade-in";
import { socials } from "../lib/profile";

/*
 * The navbar can't carry Contact and Privacy — there is a comment there about
 * the row already being 8px from overflowing a 320px phone — so the footer is
 * where the rest of the site becomes reachable, for people and for the crawlers
 * that judge a site partly on whether those pages exist at all.
 *
 * One flat row rather than labelled groups: the grouping cost three headings
 * and six wrappers of markup to organise twelve short links, and most of this
 * document is already markup.
 *
 * External and non-page hrefs use plain <a>: next/link buys prefetching and
 * client-side navigation, neither of which applies to another origin or to a
 * route handler, and each one costs an entry in the RSC payload.
 */
const internal = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

const external = [
  ...socials,
  { label: "RSS", href: "/feed.xml" },
  { label: "llms.txt", href: "/llms.txt" },
];

const linkClass = "transition-colors hover:text-black";

export function SiteFooter() {
  return (
    <FadeIn whileInView>
      <footer className="mx-auto w-full max-w-3xl px-4 pb-8 flex flex-col gap-3 text-sm text-black/70">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1">
          {internal.map((page) => (
            <Link key={page.href} href={page.href} className={linkClass}>
              {page.label}
            </Link>
          ))}
          {external.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className={linkClass}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="text-black/60">
          Every page here is also available as markdown — request it with an{" "}
          <code>Accept: text/markdown</code> header, or read the whole site at
          once in llms.txt. No cookies and no cross-site tracking.
        </p>
      </footer>
    </FadeIn>
  );
}
