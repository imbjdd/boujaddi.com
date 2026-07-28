import { Metadata } from "next";
import { Lifeline } from "@/components/lifeline";
import { personalLifeline } from "@/lib/lifeline-personal";
import { Navbar } from "../navbar";

const description = "A timeline of my life and work.";

export const metadata: Metadata = {
  title: "Changelog",
  description,
  alternates: { canonical: "/changelog" },
  openGraph: {
    type: "website",
    url: "/changelog",
    title: "Changelog",
    description,
  },
};

export default function Changelog() {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar />

      <div className="min-h-0 flex-1 overflow-y-auto md:overflow-hidden">
        <Lifeline
          markers={personalLifeline.markers}
          birthYear={personalLifeline.birthYear}
          mode="embed"
        />
      </div>
    </div>
  );
}
