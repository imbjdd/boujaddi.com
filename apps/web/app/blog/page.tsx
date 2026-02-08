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
    <div className="flex flex-col py-4 relative">
      <div className="border-y border-gray-200 sticky top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl p-4 h-fit gap-8 w-full flex border-x border-gray-200">
          <Link href="/">
            <p className="">~Start</p>
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

      <div className="border-b border-gray-200 w-screen flex justify-center">
        <div className="max-w-3xl h-fit w-full flex flex-col justify-between border-x border-gray-200">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="not-last:border-b border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
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
