"use client";

import { useEffect, useState } from "react";

type SpotifyData = {
  nowPlaying: {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    url?: string;
  } | null;
  recent: {
    title: string;
    artist: string;
    url: string;
  } | null;
};

export function SpotifyStatus({ initial }: { initial: SpotifyData }) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) setData(await res.json());
      } catch {}
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const { nowPlaying, recent } = data;

  if (nowPlaying?.isPlaying) {
    return (
      <>
        Listening to{" "}
        <a
          href={nowPlaying.url}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black/70"
        >
          {nowPlaying.title} – {nowPlaying.artist}
        </a>
      </>
    );
  }

  if (recent) {
    return (
      <>
        Last played{" "}
        <a
          href={recent.url}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-black/70"
        >
          {recent.title} – {recent.artist}
        </a>
      </>
    );
  }

  return <>Listening to Spotify</>;
}
