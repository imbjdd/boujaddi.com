import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Published content only, served from the edge — reads here are all
  // ISR-revalidated, so there's nothing to gain from hitting the origin API.
  useCdn: true,
});
