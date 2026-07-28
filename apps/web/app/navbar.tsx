"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    // Not sticky: on the home page the <FadeIn> wrapper is exactly nav-height,
    // which would leave `sticky` no room to travel. Kept static on purpose.
    <nav aria-label="Main" className="bg-white w-full flex justify-center">
      <div className="max-w-3xl py-4 h-fit gap-8 w-full px-4 flex">
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
      </div>
    </nav>
  );
}
