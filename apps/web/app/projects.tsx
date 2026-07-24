import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Film grain over each tile. Without it the gradients read as a flat blur —
 * this is what the @paper-design shaders gave the old banner via grainOverlay.
 */
function Grain({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen opacity-[0.085]"
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

const firedog: CSSProperties = {
  backgroundColor: "#0B0402",
  backgroundImage:
    "radial-gradient(82% 92% at 15% 16%, rgba(255,110,22,0.95) 0%, rgba(255,110,22,0) 55%), radial-gradient(66% 78% at 74% 74%, rgba(178,30,16,0.72) 0%, rgba(178,30,16,0) 54%), linear-gradient(180deg, rgba(0,0,0,0) 26%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)",
};

const atlas: CSSProperties = {
  backgroundColor: "#061C02",
  backgroundImage:
    "radial-gradient(100% 78% at 12% 12%, rgba(142,140,21,0.92) 0%, rgba(142,140,21,0) 52%), radial-gradient(60% 56% at 87% 7%, rgba(190,183,158,0.52) 0%, rgba(190,183,158,0) 46%), linear-gradient(180deg, rgba(0,0,0,0) 26%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.88) 100%)",
};

const breathe: CSSProperties = {
  backgroundColor: "#060A18",
  backgroundImage:
    "radial-gradient(95% 88% at 14% 10%, rgba(43,108,246,0.95) 0%, rgba(43,108,246,0) 56%), radial-gradient(78% 74% at 88% 92%, rgba(255,122,47,0.85) 0%, rgba(255,122,47,0) 52%), radial-gradient(60% 55% at 84% 12%, rgba(140,180,255,0.4) 0%, rgba(140,180,255,0) 46%), linear-gradient(180deg, rgba(0,0,0,0) 32%, rgba(0,0,0,0.35) 72%, rgba(0,0,0,0.6) 100%)",
};

export function Projects() {
  return (
    <div className="max-w-3xl h-fit w-full px-4 flex flex-col gap-6">
      <Link
        href="https://firedog.finance"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col gap-3"
      >
        <div
          style={firedog}
          className="relative w-full h-[300px] rounded-lg overflow-hidden flex items-center justify-center"
        >
          <Grain id="grain-firedog" />
          <p className="relative text-[30px] font-bold text-white">Firedog</p>
        </div>
        <div>
          <p className="font-semibold text-black/80">
            AI cost intelligence for every company
          </p>
          <p className="text-sm text-black/50">firedog.finance</p>
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="https://hackathonatlas.com/"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col gap-3"
        >
          <div
            style={atlas}
            className="relative w-full h-[240px] rounded-lg overflow-hidden flex items-center justify-center"
          >
            <Grain id="grain-atlas" />
            <p className="relative text-[22px] font-bold text-white">
              Hackathon Atlas
            </p>
          </div>
          <div>
            <p className="font-semibold text-black/80">
              A directory of hackathons from around the world
            </p>
            <p className="text-sm text-black/50">hackathonatlas.com</p>
          </div>
        </Link>

        <Link
          href="https://apps.apple.com/us/app/breathe-breathing-light-guide/id6762678044"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col gap-3"
        >
          <div
            style={breathe}
            className="relative w-full h-[240px] rounded-lg overflow-hidden flex items-center justify-center"
          >
            <Grain id="grain-breathe" />
            <p className="relative text-[22px] font-light tracking-wide text-white">
              breathe.
            </p>
          </div>
          <div>
            <p className="font-semibold text-black/80">
              A breathing guide that paces your breath with light
            </p>
            <p className="text-sm text-black/50">App Store · iOS</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
