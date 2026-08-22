import { llmsTxt } from "../../lib/markdown-pages";

/**
 * llms.txt — the whole site in one request, so an agent doesn't have to crawl
 * it page by page. Served as text/plain because that is what the convention
 * asks for, even though the body is markdown.
 */
export async function GET() {
  return new Response(await llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
