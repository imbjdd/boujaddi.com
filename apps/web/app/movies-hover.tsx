"use client";

import { useRef, useState } from "react";
import type { LetterboxdFilm } from "../lib/letterboxd";

export function MoviesHover({ films }: { films: LetterboxdFilm[] }) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setShow(false), 100);
  }

  return (
    <span className="relative inline-block">
      <a
        href="https://letterboxd.com/grandefourchett/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        movies
      </a>
      {show && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-0 pb-2 flex gap-3 z-20 w-max"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <span className="flex gap-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            {films.map((film) => (
              <a
                key={film.link}
                href={film.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {film.posterUrl && (
                  <img
                    src={film.posterUrl}
                    alt={film.title}
                    className="w-24 h-36 rounded object-cover hover:scale-105 transition-transform"
                  />
                )}
              </a>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}
