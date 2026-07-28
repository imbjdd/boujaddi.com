import { siteDescription, siteName, siteTitle, siteUrl } from "./site";

/**
 * Stable @ids so the entities can reference each other instead of being
 * repeated. An article's author is then the *same* Person the home page
 * describes, rather than a second one that happens to share a name.
 */
const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteName,
  url: siteUrl,
  jobTitle: "Product Engineer",
  description: siteDescription,
  // Same links as the footer. These are how Google ties the site to the
  // accounts, so they have to stay in step with what's rendered there.
  sameAs: [
    "https://x.com/salimboujaddi",
    "https://www.linkedin.com/in/salim-boujaddi/",
    "https://github.com/imbjdd",
  ],
};

/**
 * WebSite is what Google reads to pick the site name shown above a result.
 * It only counts on the home page — the docs are explicit that it is not
 * supported at subdirectory level.
 */
const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: siteName,
  alternateName: siteTitle,
  url: siteUrl,
  description: siteDescription,
  publisher: { "@id": PERSON_ID },
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [website, person],
};

export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteUrl}/about`,
  mainEntity: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
  // The Person is only referenced by @id above, so it has to travel with this
  // page too — a crawler reading /about alone would otherwise find a dangling
  // reference.
  about: person,
};

export function articleSchema(article: {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
}) {
  const url = `${siteUrl}/article/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    image: `${url}/opengraph-image`,
    author: person,
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
