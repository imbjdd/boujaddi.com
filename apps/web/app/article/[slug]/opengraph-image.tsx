import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getArticleBySlug } from "../../../lib/articles";
import { siteName } from "../../../lib/site";

export const alt = "Article on boujaddi.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static instances of Geist: Satori renders a variable font at its default
 * axis only, so `fontWeight: 700` on GeistVF would silently come out regular.
 */
const loadFont = (file: string) =>
  readFile(join(process.cwd(), "app/fonts", file));

export default async function ArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, regular, bold] = await Promise.all([
    getArticleBySlug(slug),
    loadFont("geist-400.ttf"),
    loadFont("geist-700.ttf"),
  ]);

  // Long titles would otherwise overflow the card rather than wrap out of it.
  const title = article?.title ?? "Article";
  const fontSize = title.length > 55 ? 60 : title.length > 32 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 80,
          fontFamily: "Geist",
        }}
      >
        <div style={{ fontSize: 32, color: "rgba(0,0,0,0.5)" }}>{siteName}</div>
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            color: "#000000",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 32, color: "rgba(0,0,0,0.5)" }}>
          boujaddi.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
