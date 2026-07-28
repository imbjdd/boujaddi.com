import type { Metadata } from "next";

export const siteUrl = "https://boujaddi.com";

export const siteName = "Salim Boujaddi";

export const siteTitle = "Salim Boujaddi - Product Engineer";

export const siteDescription =
  "Product Engineer building and shipping AI products from 0 to 1.";

export const siteHandle = "@salimboujaddi";

/**
 * Next merges metadata one level deep, so a page that sets `alternates` at all
 * replaces the layout's whole block — including the RSS autodiscovery link.
 * Build both halves together so the feed stays discoverable everywhere.
 */
export function alternatesFor(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  };
}
