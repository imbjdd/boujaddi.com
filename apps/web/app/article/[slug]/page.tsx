import { getArticleBySlug, getArticles, toExcerpt } from "../../../lib/articles";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { Navbar } from "../../navbar";
import { portableTextComponents } from "../../../components/portable-text";
import { alternatesFor, siteHandle, siteUrl } from "../../../lib/site";
import { formatDate } from "../../../lib/utils";
import { JsonLd } from "../../../components/json-ld";
import { articleSchema } from "../../../lib/structured-data";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
      alternates: { canonical: null },
      robots: { index: false },
    };
  }

  const description = toExcerpt(article.content) || article.title;
  const url = `${siteUrl}/article/${article.slug}`;

  return {
    title: article.title,
    description,
    alternates: alternatesFor(url),
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description,
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      creator: siteHandle,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col relative">
      <JsonLd
        data={articleSchema({
          slug: article.slug,
          title: article.title,
          date: article.date,
          updated: article.updated,
          excerpt: toExcerpt(article.content) || article.title,
        })}
      />
      <Navbar />

      <main className="w-full flex justify-center">
        <article className="max-w-3xl px-4 md:px-8 py-12 w-full">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-black/60 mb-8">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </p>
          <div className="prose prose-zinc max-w-none">
            <PortableText
              value={article.content}
              components={portableTextComponents}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
