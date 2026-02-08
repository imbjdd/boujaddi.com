import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Changelog - Salim Boujaddi",
  description: "A timeline of my life and work.",
};

export default function Changelog() {
  const changes = [
    {
      date: "February 9, 2026",
      title: "Website launch",
      items: [
        "launched this website.",
        <>launched <a href="https://www.producthunt.com/products/rippletide-eval-cli" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rippletide CLI</a> on Product Hunt.</>,
      ],
    },
    {
      date: "January 1, 2026",
      title: "2025 review",
      items: [
        "got my first job.",
        "left my first job.",
        <>joined an awesome team <a href="https://rippletide.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rippletide</a>.</>,
        <>made my first talk at ECB with <a href="https://eurotech-federation.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EuroTech Federation</a>.</>,
        "gave 10 % of my salary to high‑impact charities.",
        <>organized 3 hackathons: 2 with <a href="https://rippletide.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rippletide</a> (SF, virtual), 1 with Hack the Fork in Paris.</>,
      ],
    },
    {
      date: "June 1, 2025",
      title: "Life milestones",
      items: [
        "won some hackathons.",
        "dropped out of university.",
        "got an awesome girlfriend.",
        "got my first internship.",
      ],
    },
    {
      date: "July 5, 2023",
      title: "New path",
      items: [
        "left Louis-le-Grand preparatory school for university.",
        "won my first hackathon.",
      ],
    },
    {
      date: "June 10, 2022",
      title: "Academic achievements",
      items: [
        "graduated high school (baccalauréat) at 16.",
        "won a prize at the French Academic Math Olympiad.",
      ],
    },
    {
      date: "January 10, 2016",
      title: "First steps in coding",
      items: [
        "started learning HTML.",
      ],
    },
    {
      date: "March 2014",
      title: "Chess victory",
      items: [
        "won 1st place at the departmental chess tournament.",
      ],
    },
    {
      date: "January 5, 2006",
      title: "The beginning",
      items: [
        "I was born.",
      ],
    },
  ];

  return (
    <div className="flex flex-col py-4 relative">
      {/* Navigation */}
      <div className="border-y border-gray-200 sticky top-0 z-10 bg-white w-screen flex justify-center">
        <div className="max-w-3xl p-4 h-fit gap-8 w-full flex border-x border-gray-200">
          <Link href="/">
            <p className="">~Start</p>
          </Link>
          <Link href="/blog">
            <p className="">Blog</p>
          </Link>
          <p className="font-bold">Changelog</p>
        </div>
      </div>

      {/* Header */}
      <PageHero
        title="Changelog"
        description="A timeline of my life and work."
      />

      {/* Spacer */}
      <div className="border-gray-200 w-screen flex justify-center">
        <div className="max-w-3xl h-6 gap-12 w-full flex border-x border-gray-200"></div>
      </div>

      {/* Changelog Items */}
      {changes.map((change, index) => (
        <div key={index}>
          <div className="border-y border-gray-200 w-screen flex justify-center">
            <div className="max-w-3xl h-fit w-full flex border-x border-gray-200">
              {/* Left column: Date (Sticky) */}
              <div className="flex flex-col p-4 min-w-[180px] sticky top-[57px] self-start bg-white">
                <span className="text-black/70 text-sm">{change.date}</span>
              </div>

              {/* Right column: Description */}
              <div className="flex-1 p-4">
                {change.title && <h2 className="font-semibold text-lg mb-3">{change.title}</h2>}
                <ul className="list-disc pl-5 text-black/70 flex flex-col gap-2">
                  {change.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Spacer between items */}
          {index < changes.length - 1 && (
            <div className="border-gray-200 w-screen flex justify-center">
              <div className="max-w-3xl h-6 gap-12 w-full flex border-x border-gray-200"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
