import { client, SanityArticle } from "./sanity";

export interface Article {
  slug: string;
  title: string;
  date: string;
}

export interface ArticleWithContent extends Article {
  content: any[]; // Portable Text blocks
}

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt
  }`;

  try {
    const articles = await client.fetch<Article[]>(query);
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithContent | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    "date": publishedAt,
    "content": body
  }`;

  try {
    const article = await client.fetch<ArticleWithContent>(query, { slug });
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
