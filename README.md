# boujaddi.com

Personal site of Salim Boujaddi — work, writing, and a scrollable life timeline.

## Layout

```
apps/web              Next.js 16 app (App Router) + embedded Sanity Studio at /studio
packages/ui           Shared React components
packages/eslint-config
packages/typescript-config
```

## Running it

```bash
bun install
bun run dev          # web app on http://localhost:3005
```

Other tasks, all via Turborepo:

```bash
bun run build
bun run lint         # fails on any warning
bun run check-types
```

`build` and `check-types` both write to `apps/web/.next/types`, so run them one at a
time rather than in the same `turbo run` invocation.

## Deploying

The site runs on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare)
(worker `boujaddi-com`, zone route `boujaddi.com/*`):

```bash
cd apps/web
bun run deploy       # opennextjs-cloudflare build + sanity build, then wrangler deploy
bun run preview      # same build, served locally by workerd
```

- The Sanity Studio is not a Next route: `sanity build` writes it as a static SPA
  into the Worker's assets under `/studio`, and `worker.ts` falls back to its
  `index.html` for client-side Studio routes. Bundled into the server it pushed
  cold starts past the Workers CPU limit.
- The ISR/data cache lives in the `boujaddi-com-next-cache` KV namespace.
- Spotify credentials are Worker secrets (`wrangler secret put …`); the
  `NEXT_PUBLIC_*` values are in `wrangler.jsonc` and `.env` (inlined at build).

## Environment

`apps/web/.env`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project the blog reads from |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (`production`) |
| `SPOTIFY_CLIENT_ID` | Now-playing line on the home page |
| `SPOTIFY_CLIENT_SECRET` | ditto |
| `SPOTIFY_REFRESH_TOKEN` | ditto |

The Spotify status degrades to nothing when those are unset — the rest of the
site works fine without them. See `apps/web/SANITY_SETUP.md` for Sanity setup.

## Content

- **Articles** live in Sanity (`post` type) and are edited at `/studio`.
- **The timeline** on `/changelog` is code, in `apps/web/lib/lifeline-personal.ts`.
- **Experience and talks** on the home page are hardcoded in `apps/web/app/page.tsx`.
