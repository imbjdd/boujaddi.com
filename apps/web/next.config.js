/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Letterboxd serves the film posters shown on /about.
      { protocol: "https", hostname: "a.ltrbxd.com" },
    ],
  },
  async headers() {
    return [
      {
        /*
         * Every page answers both text/html and text/markdown (see
         * proxy.ts), so the response genuinely varies by Accept and a
         * shared cache must key on it — otherwise whichever variant lands in
         * the cache first is served to everyone.
         *
         * This covers the route handlers (/md/*, llms.txt, feed.xml). App
         * *pages* can't be covered from userland on Next 16: the generated
         * page entry does a bare `res.setHeader('Vary', …)` after both this
         * and proxy.ts have run, so their HTML always answers with just the
         * RSC negotiation headers.
         */
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept" }],
      },
    ];
  },
};

export default nextConfig;
