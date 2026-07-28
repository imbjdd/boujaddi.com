import { client } from "./sanity";

export type PortableTextBlock = {
  _type: string;
  children?: { _type: string; text?: string }[];
};

export interface Article {
  slug: string;
  title: string;
  date: string;
}

export interface ArticleWithContent extends Article {
  content: PortableTextBlock[];
}

const EXCERPT_MAX_LENGTH = 160;

/** Flattens the leading text blocks into a plain-text meta description. */
export function toExcerpt(content: PortableTextBlock[] | undefined): string {
  if (!content) return "";

  const text = content
    .filter((block) => block._type === "block")
    // Join within a block, then between blocks — otherwise adjacent paragraphs
    // run together as "first job.left my first job".
    .map((block) =>
      (block.children ?? []).map((child) => child.text ?? "").join("")
    )
    .filter((blockText) => blockText.trim().length > 0)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= EXCERPT_MAX_LENGTH) return text;

  const truncated = text.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : undefined)}…`;
}

export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt
  }`;

  try {
    return await client.fetch<Article[]>(
      query,
      {},
      { next: { revalidate: 60 } }
    );
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
    const article = await client.fetch<ArticleWithContent>(
      query,
      { slug },
      { next: { revalidate: 60 } }
    );
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
