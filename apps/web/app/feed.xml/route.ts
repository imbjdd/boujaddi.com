import { getFeedArticles } from "../../lib/articles";
import { siteDescription, siteName, siteUrl } from "../../lib/site";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const articles = await getFeedArticles();

  const items = articles
    .map((article) => {
      // Escaped like any other value: a slug containing & would otherwise
      // produce XML that readers refuse to parse.
      const url = escape(`${siteUrl}/article/${article.slug}`);
      return `    <item>
      <title>${escape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(article.excerpt)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  // The newest post rather than "now", so a rebuild that changed no content
  // doesn't keep telling readers the feed is fresh.
  const lastBuildDate = new Date(articles[0]?.date ?? Date.now()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteName)}</title>
    <link>${siteUrl}</link>
    <description>${escape(siteDescription)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
