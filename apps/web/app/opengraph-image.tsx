import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Salim Boujaddi - Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static instances of Geist: Satori renders a variable font at its default
 * axis only, so `fontWeight: 700` on GeistVF would silently come out regular.
 */
const loadFont = (file: string) =>
  readFile(join(process.cwd(), "app/fonts", file));

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([
    loadFont("geist-400.ttf"),
    loadFont("geist-700.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#ffffff",
          padding: 80,
          fontFamily: "Geist",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: "#000000" }}>
          Salim Boujaddi
        </div>
        <div style={{ fontSize: 44, color: "rgba(0,0,0,0.7)", marginTop: 12 }}>
          Product Engineer
        </div>
        <div style={{ fontSize: 32, color: "rgba(0,0,0,0.5)", marginTop: 40 }}>
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
