import { getArticleBySlug, getArticles } from "../../../lib/articles";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "../../navbar";
import { portableTextComponents } from "../../../components/portable-text";

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
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} - Salim Boujaddi`,
    description: article.title,
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

      <div className="w-screen flex justify-center">
        <div className="max-w-3xl px-4 md:px-8 py-12 w-full ">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-black/50 mb-8">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose prose-zinc max-w-none">
            <PortableText
              value={article.content}
              components={portableTextComponents}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
