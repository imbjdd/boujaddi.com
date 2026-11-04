import { createFileRoute } from '@tanstack/react-router'

import { articles } from '#/articles'
import { site } from '#/content'

const escapeXml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

function feed() {
  const items = articles
    .map((article) => {
      const url = `${site}/article/${article.slug}`
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      <pubDate>${new Date(article.published).toUTCString()}</pubDate>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>salim boujaddi</title>
    <link>${site}</link>
    <description>Product engineer building and shipping AI products from 0 to 1.</description>
    <language>en</language>
    <lastBuildDate>${new Date(articles[0].published).toUTCString()}</lastBuildDate>
    <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

export const Route = createFileRoute('/feed.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(feed(), {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
        }),
    },
  },
})
