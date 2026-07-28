# web

The boujaddi.com Next.js app. Run it from the repo root (`bun run dev`) so
Turborepo wires up the workspace packages; see the [root README](../../README.md)
for environment variables and content locations.

## Notable pieces

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home — intro, projects, experience, talks |
| `app/changelog/` | The scrollable lifeline, built from `lib/lifeline-personal.ts` |
| `app/studio/` | Embedded Sanity Studio |
| `app/feed.xml/` | RSS feed for the blog |
| `app/opengraph-image.tsx` | Social card, rendered with `next/og` |
| `components/lifeline/` | The timeline widget (desktop + vertical mobile variants) |

## Fonts

`app/fonts/GeistVF.woff` is the variable font the site renders with.
`geist-400.ttf` / `geist-700.ttf` are static instances of it, used *only* by
`opengraph-image.tsx`: Satori renders a variable font at its default axis, so
asking for `fontWeight: 700` on the variable file silently yields regular. They
are read at build time and never shipped to the browser. Regenerate with:

```bash
python3 -c "
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
for w in (400, 700):
    f = instancer.instantiateVariableFont(TTFont('app/fonts/GeistVF.woff'), {'wght': w})
    f.flavor = None
    f.save(f'app/fonts/geist-{w}.ttf')
"
```
