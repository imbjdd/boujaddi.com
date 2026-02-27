import Link from "next/link";
import { getArticles } from "../../lib/articles";
import { Metadata } from "next";
import { PageHero } from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Blog - Salim Boujaddi",
  description: "Thoughts on building, learning, and shipping fast.",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col pb-4 relative">
      <div className="top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl py-4 h-fit gap-8 w-full px-4 flex ">
          <Link href="/">
            <p className="">Work</p>
          </Link>
          <p className="font-bold">Blog</p>
          <Link href="/changelog">
            <p className="">Changelog</p>
          </Link>
        </div>
      </div>

      <PageHero
        title="Blog"
        description="Thoughts on building, learning, and shipping fast."
      />

      <div className="w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full px-4 flex flex-col justify-between ">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="py-2 transition-colors cursor-pointer"
              >
                <p className="">{article.title}</p>
                <p className="text-black/50">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Link>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-black/50">
              No articles yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
