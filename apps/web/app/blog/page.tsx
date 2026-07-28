import Link from "next/link";
import { getArticles } from "../../lib/articles";
import { Metadata } from "next";
import { Navbar } from "../navbar";

const description = "Thoughts on building, learning, and shipping fast.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog",
    description,
  },
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col pb-4 relative">
      <Navbar />

      <div className="w-screen flex justify-center">
        <div className="max-w-3xl w-full px-4 py-4">
          <p className="text-black/50">Thoughts on building, learning, and shipping fast.</p>
        </div>
      </div>

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
