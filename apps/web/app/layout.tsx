import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import {
  alternatesFor,
  siteDescription,
  siteHandle,
  siteName,
  siteTitle,
  siteUrl,
} from "../lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
         */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="270cf818-e1ea-4a13-a087-149fd7db7425"
          data-performance="true"
          data-domains="boujaddi.com"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
