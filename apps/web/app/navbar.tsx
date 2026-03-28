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
    <div className="-sticky top-0 z-10 bg-white w-screen flex justify-center">
      <div className="max-w-3xl py-4 h-fit gap-8 w-full px-4 flex">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return isActive ? (
            <p key={link.href} className="font-bold">
              {link.label}
            </p>
          ) : (
            <Link key={link.href} href={link.href}>
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
