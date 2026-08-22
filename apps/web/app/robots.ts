import type { MetadataRoute } from "next";

import { siteUrl } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/md` is the Accept: text/markdown rewrite target for the pages above.
      // Crawlable content, but reachable at its canonical URL already, so it
      // stays out of the index rather than duplicating every page.
      disallow: ["/studio", "/api", "/md"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
