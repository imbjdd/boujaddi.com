import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "./navbar";

export const metadata: Metadata = {
  title: "Page not found",
  // Without the explicit null this inherits the layout's `canonical: "/"`, and
  // every missing URL then tells crawlers it is really the homepage.
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="w-full flex justify-center">
        <div className="max-w-3xl w-full px-4 py-4 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Page not found</h1>
          <p className="text-black/70">
            This page doesn&apos;t exist — or it doesn&apos;t exist yet.
          </p>
          <Link href="/" className="text-black/70 underline hover:text-black">
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
