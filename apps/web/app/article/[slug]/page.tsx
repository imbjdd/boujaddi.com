import { getArticleBySlug, getArticles, toExcerpt } from "../../../lib/articles";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { Navbar } from "../../navbar";
import { portableTextComponents } from "../../../components/portable-text";
import { siteUrl } from "../../../lib/site";

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
    };
  }

  const description = toExcerpt(article.content) || article.title;
  const url = `${siteUrl}/article/${article.slug}`;

  return {
    title: article.title,
    description,
    alternates: { canonical: url },
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
      <Navbar />

      <main className="w-full flex justify-center">
        <article className="max-w-3xl px-4 md:px-8 py-12 w-full">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-black/60 mb-8">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
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
