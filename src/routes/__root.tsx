import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import serifItalic from '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2?url'
import serif from '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2?url'
import hand from '@fontsource/reenie-beanie/files/reenie-beanie-latin-400-normal.woff2?url'

import { SoundToggle } from '#/components/SoundToggle'

import appCss from '../styles.css?url'

const title = 'salim boujaddi'
const description =
  'Product engineer building and shipping AI products from 0 to 1.'

const ogImage = 'https://boujaddi.com/og.jpg'
const ogImageAlt = 'i make ai things people actually use, beside photos of Salim'

// All three are on screen on load, so fetch them before the CSS asks for them.
const preloadedFonts = [serif, serifItalic, hand].map((href) => ({
  rel: 'preload',
  href,
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous' as const,
}))

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { name: 'theme-color', content: '#EDE9E1' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: ogImageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: ogImageAlt },
      { name: 'twitter:creator', content: '@salimboujaddi' },
    ],
    links: [
      ...preloadedFonts,
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* data-domains keeps local and preview builds out of the numbers. */}
        <script
          defer
          src="/px/s.js"
          data-website-id="270cf818-e1ea-4a13-a087-149fd7db7425"
          data-host-url="/px"
          data-performance="true"
          data-domains="boujaddi.com"
        />
      </head>
      <body>
        {children}
        <SoundToggle />

        <Scripts />
      </body>
    </html>
  )
}
