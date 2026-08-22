import { markdownForPath, notFoundMarkdown } from "../../../lib/markdown-pages";

/**
 * The `Accept: text/markdown` representation of every page. Not meant to be
 * linked: middleware rewrites here, so the agent's URL stays the canonical one.
 * robots.txt disallows it so the same content isn't indexed under two paths.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const pathname = `/${(slug ?? []).join("/")}`;

  const markdown = await markdownForPath(pathname);

  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
  };

  if (markdown === null) {
    return new Response(notFoundMarkdown(pathname), { status: 404, headers });
  }

  return new Response(markdown, {
    headers: {
      ...headers,
      // Same 60s window the Sanity queries revalidate on, so the markdown and
      // the HTML can't drift by more than one revalidation.
      "Cache-Control":
        "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
