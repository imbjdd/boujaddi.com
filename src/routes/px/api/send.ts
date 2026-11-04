import { createFileRoute } from '@tanstack/react-router'

function clientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    undefined
  )
}

export const Route = createFileRoute('/px/api/send')({
  server: {
    handlers: {
      /**
       * Forwards page views to Umami from this domain. Without an explicit
       * `payload.ip`, Umami would see the Worker's address, so every visitor
       * would share one location and collapse into fewer sessions. Without the
       * visitor's user agent, Umami discards the hit as a bot. Cookies are not
       * forwarded.
       */
      POST: async ({ request }) => {
        let body: { payload?: Record<string, unknown> } | null
        try {
          body = await request.json()
        } catch {
          return new Response('Bad Request', { status: 400 })
        }
        if (!body?.payload || typeof body.payload !== 'object') {
          return new Response('Bad Request', { status: 400 })
        }

        const ip = clientIp(request)
        const userAgent = request.headers.get('user-agent') ?? ''
        const cacheToken = request.headers.get('x-umami-cache')

        const upstream = await fetch('https://gateway.umami.is/api/send', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            ...(userAgent && { 'user-agent': userAgent }),
            ...(cacheToken && { 'x-umami-cache': cacheToken }),
          },
          // Spread last, so a client can't forge its own address.
          body: JSON.stringify({
            ...body,
            payload: {
              ...body.payload,
              ...(ip && { ip }),
              ...(userAgent && { userAgent }),
            },
          }),
        })

        return new Response(await upstream.text(), {
          status: upstream.status,
          headers: {
            'content-type':
              upstream.headers.get('content-type') ?? 'application/json',
            'cache-control': 'no-store',
          },
        })
      },
    },
  },
})
