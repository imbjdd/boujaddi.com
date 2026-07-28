import type { MetadataRoute } from "next";

import { getArticles } from "../lib/articles";
import { siteUrl } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  const staticRoutes = ["", "/about", "/blog", "/changelog"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes];
}
