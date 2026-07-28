const TRACKER_URL = "https://cloud.umami.is/script.js";

// The tracker changes rarely, and this is on the critical path of every page
// view, so hold it in the data cache for a day rather than paying a round trip
// to the origin each time.
export const revalidate = 86400;

/**
 * Serving this through a handler rather than a next.config rewrite is
 * deliberate. A rewrite copies every inbound header upstream, which in
 * production means the cf-ray / cf-connecting-ip / cf-ipcountry that our own
 * Cloudflare zone just added. cloud.umami.is is itself behind Cloudflare, and
 * a request arriving with another zone's CF headers gets a 403 -- which the
 * rewrite then passed through as the script body, so the tracker never loaded.
 *
 * It only reproduces in production: on localhost there are no cf-* headers to
 * forward, so the rewrite looked fine there.
 */
export async function GET() {
  const upstream = await fetch(TRACKER_URL, {
    // A deliberately plain request: no visitor headers, nothing that identifies
    // the reader, and nothing that looks like a replayed Cloudflare request.
    headers: { accept: "*/*" },
    next: { revalidate },
  });

  if (!upstream.ok) {
    // Fail as an empty script rather than an error page: the browser would
    // otherwise try to execute Cloudflare's HTML. Analytics silently stops,
    // which is the right trade against breaking the page.
    console.error(`Umami tracker fetch failed: ${upstream.status}`);
    return new Response("", {
      status: 200,
      headers: {
        "content-type": "application/javascript; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  }

  return new Response(await upstream.text(), {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
