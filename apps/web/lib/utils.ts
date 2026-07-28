import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Pinned to UTC on purpose. These dates are rendered on the server at build
 * time and rehydrated in the visitor's zone, so a timestamp near midnight
 * formats to two different days and React reports a hydration mismatch.
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
