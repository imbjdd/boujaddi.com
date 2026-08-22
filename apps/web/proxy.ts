import { NextResponse, type NextRequest } from "next/server";

/**
 * True only for an explicit, non-refused `text/markdown` entry.
 *
 * A wildcard range does not count: browsers send one on every navigation, and
 * matching it would serve them the markdown instead of the page. Neither does
 * `text/markdown;q=0`, which is a client saying it specifically does not want
 * markdown.
 */
function wantsMarkdown(accept: string): boolean {
  return accept.split(",").some((entry) => {
    const [type, ...params] = entry
      .split(";")
      .map((part) => part.trim().toLowerCase());

    if (type !== "text/markdown") return false;

    const quality = params.find((param) => param.startsWith("q="));
    return quality === undefined || Number(quality.slice(2)) > 0;
  });
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const response = wantsMarkdown(request.headers.get("accept") ?? "")
    ? NextResponse.rewrite(
        // `/` would rewrite to `/md/`, which the trailing-slash normaliser then
        // redirects — losing the rewrite. The optional catch-all answers `/md`.
        new URL(
          `${pathname === "/" ? "/md" : `/md${pathname}`}${search}`,
          request.url,
        ),
      )
    : NextResponse.next();

  // Without this a CDN can hand an agent asking for markdown whichever variant
  // happened to be cached first. Appended, not set: Next puts its own RSC
  // negotiation headers in Vary and both have to survive.
  response.headers.append("Vary", "Accept");

  return response;
}

export const config = {
  matcher: [
    /*
     * Page routes only. Everything with a dot in it (feed.xml, llms.txt,
     * sitemap.xml, the videos) already serves its own content type, and the
     * studio and API routes have nothing to negotiate.
     */
    "/((?!_next/static|_next/image|api/|px/|studio|md/|.*\\.).*)",
  ],
};
