import { createFileRoute } from '@tanstack/react-router'

// The old site's /about page now lives on the home page.
export const Route = createFileRoute('/about')({
  server: {
    handlers: {
      GET: () =>
        new Response(null, { status: 302, headers: { Location: '/#about' } }),
    },
  },
})
