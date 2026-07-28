"use client";

import { useEffect, useRef } from "react";

/**
 * The three project clips add up to ~2MB, so none of them are fetched until
 * they're about to be seen: the poster carries the first paint, and the video
 * only starts loading once it scrolls into view. Readers who ask for reduced
 * motion keep the poster and never pay for the video at all.
 */
export function ProjectVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          video.preload = "auto";
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={label}
      loop
      muted
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
