import { createFileRoute } from '@tanstack/react-router'

const javascript = 'application/javascript; charset=utf-8'

export const Route = createFileRoute('/px/s.js')({
  server: {
    handlers: {
      /**
       * Serves the Umami tracker from this domain. The request is deliberately
       * plain: Umami's Cloudflare zone answers 403 to forwarded cf-* headers.
       * On failure it returns an empty script, so analytics stop but the page
       * doesn't try to execute an error page.
       */
      GET: async () => {
        const upstream = await fetch('https://cloud.umami.is/script.js', {
          headers: { accept: '*/*' },
        })

        if (!upstream.ok) {
          console.error(`Umami tracker fetch failed: ${upstream.status}`)
          return new Response('', {
            headers: {
              'content-type': javascript,
              'cache-control': 'public, max-age=60',
            },
          })
        }

        return new Response(await upstream.text(), {
          headers: {
            'content-type': javascript,
            'cache-control':
              'public, max-age=3600, stale-while-revalidate=86400',
          },
        })
      },
    },
  },
})
