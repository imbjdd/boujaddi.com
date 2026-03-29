const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
}

export async function getNowPlaying(): Promise<{
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
} | null> {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${access_token}` },
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

  return {
    isPlaying: true,
    title: data.item.name,
    artist: data.item.artists.map((a: any) => a.name).join(", "),
    url: data.item.external_urls.spotify,
  };
}

export async function getRecentlyPlayed(): Promise<{
  title: string;
  artist: string;
  url: string;
} | null> {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  const track = data.items?.[0]?.track;

  if (!track) return null;

  return {
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    url: track.external_urls.spotify,
  };
}
