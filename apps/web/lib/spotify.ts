const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

export type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
};

export type RecentTrack = {
  title: string;
  artist: string;
  url: string;
};

type SpotifyArtist = { name: string };

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  external_urls: { spotify: string };
};

/**
 * Access tokens live an hour, so keep the last one around instead of paying a
 * token round trip on every call. Refreshed a minute early so a token can't
 * expire between here and the API call that uses it.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (!clientId || !clientSecret || !refreshToken) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    cachedToken = null;
    return null;
  }

  const data = await response.json();
  if (!data.access_token) return null;

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - 60_000,
  };

  return cachedToken.value;
}

const artistNames = (artists: SpotifyArtist[]) =>
  artists.map((artist) => artist.name).join(", ");

export async function getNowPlaying(): Promise<NowPlaying | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 30 },
    }
  );

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const data = await response.json();

  if (!data.is_playing || !data.item) {
    return { isPlaying: false };
  }

  const item = data.item as SpotifyTrack;

  return {
    isPlaying: true,
    title: item.name,
    artist: artistNames(item.artists),
    url: item.external_urls.spotify,
  };
}

export async function getRecentlyPlayed(): Promise<RecentTrack | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  const track = data.items?.[0]?.track as SpotifyTrack | undefined;

  if (!track) return null;

  return {
    title: track.name,
    artist: artistNames(track.artists),
    url: track.external_urls.spotify,
  };
}
