import { Metadata } from "next";
import { Navbar } from "../navbar";
import { alternatesFor } from "../../lib/site";
import { formatDate } from "../../lib/utils";
import {
  privacyIntro,
  privacySections,
  privacyUpdated,
} from "../../lib/profile";

const description =
  "What this site does with data: no cookies, no accounts, cookieless analytics served from this domain.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: alternatesFor("/privacy"),
  openGraph: {
    type: "website",
    url: "/privacy",
    title: "Privacy",
    description,
  },
};

export default function Privacy() {
  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-4 py-4 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Privacy</h1>
        <p className="text-black/60 text-sm">
          Last updated{" "}
          <time dateTime={privacyUpdated}>{formatDate(privacyUpdated)}</time>
        </p>
        <p className="text-black/70">{privacyIntro}</p>

        {privacySections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-2">
            <h2 className="font-semibold text-black/80">{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="text-black/70">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
