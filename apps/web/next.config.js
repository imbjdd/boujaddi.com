/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Letterboxd serves the film posters shown on /about.
      { protocol: "https", hostname: "a.ltrbxd.com" },
    ],
  },
  async rewrites() {
    return [
      // Serve the analytics tracker first-party, so EasyPrivacy's
      // `||umami.is^$third-party` rule doesn't block it. A plain rewrite is
      // safe for the script itself -- it's a static GET carrying no visitor
      // identity. The beacon can't be a rewrite for that exact reason and
      // goes through app/px/api/send/route.ts instead.
      //
      // The path deliberately avoids the words "umami", "analytics" and
      // "stats": Umami's own docs suggest /stats, which makes it the first
      // first-party path a blocklist would learn.
      { source: "/px/s.js", destination: "https://cloud.umami.is/script.js" },
    ];
  },
};

export default nextConfig;
