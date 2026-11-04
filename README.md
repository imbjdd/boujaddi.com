# boujaddi.com

Salim Boujaddi's portfolio, built with TanStack Start and plain CSS.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## Where things live

- `src/content.ts`: links, projects, experience and talks.
- `src/articles.tsx`: articles. They feed the `/article/$slug` pages and `/feed.xml`.
- `src/routes/px/`: first-party proxy for Umami analytics, described on `/privacy`.
- `src/routes/index.tsx`: page sections, photo placement and captions.
- `src/components/Print.tsx`: the tilted photo, including mouse dragging.
- `src/sound.ts`: interface sounds, synthesised with Web Audio. Clicks pick a cue from the element (`data-sound` overrides it, `none` silences it); `SoundToggle` mutes them.
- `public/photos/`: photos of Salim. `cutout-headphones.webp` has a transparent background.
- `src/styles.css`: all styles. `--u` is one pixel of the 1440px design, so the desktop layout scales as a whole.

## Deploying

The site runs on Cloudflare Workers (worker `boujaddi-com`, zone route `boujaddi.com/*`).

```bash
pnpm build
npx wrangler versions upload --preview-alias new-site   # preview URL, no traffic
npx wrangler deploy                                     # goes live on boujaddi.com
npx wrangler rollback                                   # back to the previous version
```
