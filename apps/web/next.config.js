/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Letterboxd serves the film posters shown on /about.
      { protocol: "https", hostname: "a.ltrbxd.com" },
    ],
  },
};

export default nextConfig;
