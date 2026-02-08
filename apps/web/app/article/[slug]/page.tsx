import { getArticleBySlug, getArticles } from "../../../lib/articles";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Metadata } from "next";

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
    <div className="flex flex-col py-4 relative">
      <div className="border-y border-gray-200 sticky top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl p-4 h-fit gap-8 w-full flex border-x border-gray-200">
          <Link href="/">
            <p className="">~Start</p>
          </Link>
          <Link href="/blog">
            <p className="font-bold">Blog</p>
          </Link>
        </div>
      </div>

      <div className="border-b border-gray-200 w-screen flex justify-center">
        <div className="max-w-3xl px-8 py-12 w-full border-x border-gray-200">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-black/50 mb-8">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose max-w-none">
            <PortableText value={article.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
