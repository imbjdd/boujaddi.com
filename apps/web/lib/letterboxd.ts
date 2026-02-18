export type LetterboxdFilm = {
  title: string;
  year: string;
  rating: string;
  posterUrl: string;
  link: string;
  watchedDate: string;
};

export async function getRecentFilms(
  username: string,
  count = 3
): Promise<LetterboxdFilm[]> {
  const res = await fetch(`https://letterboxd.com/${username}/rss/`, {
    next: { revalidate: 3600 },
  });
  const xml = await res.text();

  const films: LetterboxdFilm[] = [];
  const items = xml.split("<item>").slice(1);

  for (const item of items.slice(0, count)) {
    const title = item.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const link =
      item.match(/<link\/>(.*?)<guid/s)?.[1]?.trim() ??
      item.match(/<link>(.*?)<\/link>/)?.[1] ??
      "";
    const watchedDate =
      item.match(/<letterboxd:watchedDate>(.*?)<\/letterboxd:watchedDate>/)?.[1] ?? "";
    const posterUrl =
      item.match(/<img src="(.*?)"/)?.[1] ?? "";

    // Title format: "Movie Name, 2024 - ★★★★"
    const titleMatch = title.match(/^(.+),\s*(\d{4})\s*-?\s*(.*)$/);
    const filmName = titleMatch?.[1] ?? title;
    const year = titleMatch?.[2] ?? "";
    const rating = titleMatch?.[3] ?? "";

    films.push({
      title: filmName,
      year,
      rating,
      posterUrl,
      link,
      watchedDate,
    });
  }

  return films;
}
