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
