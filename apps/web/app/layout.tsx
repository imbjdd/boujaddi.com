import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { FigmaCursor } from "./figma-cursor";
import {
  alternatesFor,
  siteDescription,
  siteHandle,
  siteName,
  siteTitle,
  siteUrl,
} from "../lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s - ${siteName}`,
  },
  description: siteDescription,
  alternates: alternatesFor("/"),
  openGraph: {
    type: "website",
    siteName,
    url: "/",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: siteHandle,
  },
};

/**
 * Discord tints the accent bar of a link embed with theme-color, so this is
 * what makes the card read as white rather than borderless. It also tints the
 * browser chrome on mobile, which matches the page background anyway.
 */
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {/*
         * Umami is cookieless, so this needs no consent banner. `data-domains`
         * is what keeps local and preview builds out of the numbers — it gates
         * on window.location.hostname, so it holds even for a production build
         * run on localhost, which an env check would not.
         *
         * Both the script and the beacon are served from our own origin so ad
         * blockers don't drop them. `data-host-url` is not optional here: the
         * cloud tracker hardcodes gateway.umami.is as its default and does not
         * infer the endpoint from where it was loaded, so without it the
         * script would be first-party but its beacon still third-party.
         */}
        <Script
          src="/px/s.js"
          data-website-id="270cf818-e1ea-4a13-a087-149fd7db7425"
          data-host-url="/px"
          data-performance="true"
          data-domains="boujaddi.com"
          strategy="afterInteractive"
        />
      </head>
      <body className={geistSans.variable}>
        <FigmaCursor />
        {children}
      </body>
    </html>
  );
}
