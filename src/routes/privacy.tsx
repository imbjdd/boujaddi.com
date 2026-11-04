import { createFileRoute } from '@tanstack/react-router'

import { InkTrail } from '#/components/InkTrail'
import { Nav } from '#/components/Nav'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'privacy · salim boujaddi' },
      {
        name: 'description',
        content: 'Everything this site does with data.',
      },
    ],
  }),
  component: Privacy,
})

function Privacy() {
  return (
    <div className="page">
      <InkTrail />
      <div className="band">
        <main className="frame article">
          <Nav />
          <article className="article__column">
            <a className="hand article__back" href="/" data-sound="backward">
              ← back home
            </a>
            <h1 className="display article__title">privacy</h1>
            <p className="caption">last updated november 4, 2026</p>
            <div className="article__body">
              <p>
                This is a personal site. There are no accounts, no sign-up, no
                forms, and no advertising. What follows is everything it does
                with data.
              </p>
              <h2>No cookies</h2>
              <p>
                The site sets no cookies. If you turn the interface sounds off,
                that choice is saved in local storage so it sticks between
                visits; nothing else is written there. Your scroll position is
                kept in session storage for the current tab and never leaves
                your browser. There is no consent banner because there is
                nothing to consent to.
              </p>
              <h2>Analytics</h2>
              <p>
                I count page views with Umami, a cookieless analytics service.
                It records the page you landed on, the referrer, and coarse
                device and country information. It does not build a profile
                across sites, and there is no way for me to tie a visit to a
                person.
              </p>
              <p>
                The tracking script and its requests are served from this domain
                rather than a third-party host, so no request leaves your browser
                for an analytics domain. My server does forward your IP address
                to Umami, which uses it to derive a country and a rotating daily
                session identifier; the raw address is not stored in my reports.
              </p>
              <h2>Fonts, images and video</h2>
              <p>
                Fonts, project videos, and images are served from this domain.
                Nothing on a page is loaded from a font CDN or a tracking pixel.
              </p>
              <h2>Your data</h2>
              <p>
                Because nothing here identifies you, there is no account to
                delete and no export to request. If you think something on this
                site says otherwise, get in touch and I will fix it.
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}
