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

      <main className="flex flex-col">
        {/* The page deliberately shows no title, but it still needs one. */}
        <h1 className="sr-only">Blog</h1>

        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full px-4 py-4">
            <p className="text-black/60">{description}</p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-3xl h-fit w-full px-4 flex flex-col justify-between ">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="py-2 transition-colors cursor-pointer"
                >
                  <p className="">{article.title}</p>
                  <p className="text-black/60">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-black/60">
                No articles yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
