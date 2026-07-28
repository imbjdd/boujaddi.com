import type { MetadataRoute } from "next";
import { siteDescription, siteName, siteTitle } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    // Only the size we actually have. The source icon is 300x300, so
    // declaring the usual 512x512 would mean shipping an upscaled, blurry
    // icon and claiming a fidelity this doesn't have.
    icons: [{ src: "/icon.png", sizes: "300x300", type: "image/png" }],
  };
}
