import { createFileRoute } from '@tanstack/react-router'

// The old site's /contact page now lives on the home page.
export const Route = createFileRoute('/contact')({
  server: {
    handlers: {
      GET: () =>
        new Response(null, { status: 302, headers: { Location: '/#say-hi' } }),
    },
  },
})
