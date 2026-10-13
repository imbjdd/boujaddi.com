// Bundled by wrangler, not tsc (excluded in tsconfig): .open-next/ only exists
// after `opennextjs-cloudflare build`.
import { default as handler } from "./.open-next/worker.js";

type Env = { ASSETS: { fetch(input: URL | Request): Promise<Response> } };

/*
 * The Sanity Studio is a static SPA in the assets (built by `sanity build`),
 * not a Next route: bundled into the server it blew through the Workers CPU
 * limit on every cold start. Real files under /studio are served by the assets
 * layer before this runs; anything else there is a client-side Studio route.
 */
export default {
  fetch(request: Request, env: Env, ctx: unknown) {
    const url = new URL(request.url);

    if (url.pathname === "/studio" || url.pathname.startsWith("/studio/")) {
      return env.ASSETS.fetch(new URL("/studio/", url));
    }

    return handler.fetch(request, env, ctx);
  },
};
