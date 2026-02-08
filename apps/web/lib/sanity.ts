import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to true in production for better performance
});

export interface SanityArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: any[]; // Portable Text content
}
