import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

/*
 * KV rather than R2 for the ISR cache: R2 isn't enabled on the account, and
 * the site only caches a handful of Sanity/Spotify/Letterboxd fetches anyway.
 * The memory queue revalidates in-isolate through WORKER_SELF_REFERENCE.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: memoryQueue,
});
