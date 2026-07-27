import Link from "next/link";

export function Projects() {
  return (
    <div className="max-w-3xl h-fit w-full px-4 flex flex-col gap-6">
      <Link
        href="https://firedog.finance"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col gap-3"
      >
        <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
          <video
            src="/result.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="relative text-[30px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Firedog
          </p>
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
          <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
            <video
              src="/atlas.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="relative text-[22px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
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
          <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black">
            <video
              src="/breathe.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="relative text-[22px] font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
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
