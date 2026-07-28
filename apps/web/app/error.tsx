"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Navbar } from "./navbar";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="w-full flex justify-center">
        <div className="max-w-3xl w-full px-4 py-4 flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Something went wrong</h1>
          <p className="text-black/70">
            An unexpected error occurred while rendering this page.
          </p>
          <div className="flex gap-6 text-black/70">
            <button
              type="button"
              onClick={reset}
              className="underline hover:text-black"
            >
              Try again
            </button>
            <Link href="/" className="underline hover:text-black">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
