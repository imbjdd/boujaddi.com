import { Metadata } from "next";
import { Navbar } from "../navbar";
import { alternatesFor } from "../../lib/site";
import { contactChannels, contactIntro } from "../../lib/profile";

const description =
  "How to reach me: book a call, or find me on X, LinkedIn, or GitHub.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: alternatesFor("/contact"),
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact",
    description,
  },
};

export default function Contact() {
  return (
    <div className="relative flex flex-col pb-10">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-4 py-4 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Contact</h1>
        <p className="text-black/70">{contactIntro}</p>

        <ul className="flex flex-col gap-3">
          {contactChannels.map((channel) => (
            <li key={channel.href}>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-black"
              >
                {channel.label}
              </a>
              <p className="text-black/60">{channel.hint}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
