"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

const BOOKING_URL = "https://cal.eu/salim-boujaddi/15min";

export function Navbar() {
  const pathname = usePathname();

  return (
    // `sticky` travels within its parent, so it only works where the nav is a
    // direct child of the tall page wrapper. On the home page the nav sits in a
    // <FadeIn> that is exactly nav-height, which would leave it no room — that
    // wrapper carries the sticky classes itself instead.
    //
    // z-40 clears page content (up to z-20, incl. the /about hover card) while
    // staying under the lifeline overlays on /changelog: the hover image sits
    // at z-[60], the fireworks at z-[70] and the lightbox at z-[999].
    //
    // The tint is what the blur reads against; without it backdrop-blur has
    // nothing to tint and the bar looks like plain smeared text. The lower
    // opacity only applies where backdrop-filter actually works, so browsers
    // without it fall back to a bar solid enough to stay legible.
    <nav
      aria-label="Main"
      className="sticky top-0 z-40 w-full flex justify-center bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
    >
      {/* gap-2 on mobile: the four labels alone total ~194px, so once the CTA
          is in the row gap-8 overflows and gives the whole page a horizontal
          scrollbar. gap-2 is what still clears a 320px viewport, the narrowest
          phone worth supporting; gap-3 was 8px short there. */}
      {/* overflow-x-auto is a containment net, not a layout choice: below ~360px
          the row genuinely cannot fit, and this keeps the overflow inside the
          nav instead of giving the whole page a horizontal scrollbar. It sits
          on the child, not the sticky <nav>, so it does not break sticking. */}
      <div className="max-w-3xl py-4 h-fit gap-2 sm:gap-8 w-full px-4 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "font-bold" : "hover:text-black/70"}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Outside `links` on purpose: it is external, so it must never take the
            active state. `ml-auto` pushes it to the right edge of the same
            max-w-3xl column the page content lines up with.

            Styled as underlined text, not a filled button: every other element
            on this site is plain type, so a solid block was the one thing that
            read as pasted on. The underline is the same treatment the bio uses
            for outbound links, which is what makes it belong here. */}
        <Link
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto whitespace-nowrap underline decoration-1 underline-offset-4 transition-colors hover:text-black/70"
        >
          Book a call
        </Link>
      </div>
    </nav>
  );
}
