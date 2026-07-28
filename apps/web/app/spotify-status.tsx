"use client";

import { useEffect, useState } from "react";
import type { NowPlaying, RecentTrack } from "../lib/spotify";

export type SpotifyData = {
  nowPlaying: NowPlaying | null;
  recent: RecentTrack | null;
};

const POLL_INTERVAL_MS = 30_000;

export function SpotifyStatus({ initial }: { initial: SpotifyData }) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const poll = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok && !cancelled) setData(await res.json());
      } catch {
        // Offline or a transient failure — keep showing the last known track.
      }
    };

    // Only poll while the tab is visible — a backgrounded tab burning a Spotify
    // API call every 30s is pure waste.
    const start = () => {
      if (interval) return;
      interval = setInterval(poll, POLL_INTERVAL_MS);
    };

    const stop = () => {
      if (!interval) return;
      clearInterval(interval);
      interval = undefined;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        poll();
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
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

  return null;
}
