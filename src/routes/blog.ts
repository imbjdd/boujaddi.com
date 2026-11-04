import { createFileRoute } from '@tanstack/react-router'

// The old site's /blog page now lives on the home page.
export const Route = createFileRoute('/blog')({
  server: {
    handlers: {
      GET: () =>
        new Response(null, { status: 302, headers: { Location: '/#wrote' } }),
    },
  },
})
