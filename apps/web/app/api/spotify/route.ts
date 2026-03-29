import { getNowPlaying, getRecentlyPlayed } from "../../../lib/spotify";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const nowPlaying = await getNowPlaying();
  const recent = nowPlaying?.isPlaying ? null : await getRecentlyPlayed();

  return NextResponse.json({ nowPlaying, recent });
}
