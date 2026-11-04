import type { ReactNode } from 'react'

export type Article = {
  slug: string
  title: string
  /** Date as shown on the page. */
  meta: string
  /** ISO date, for the page and the feed. */
  published: string
  /** Short text for the feed and for link previews. */
  summary: string
  body: ReactNode
}

function Out({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export const articles: Article[] = [
  {
    slug: '2025-wrapper',
    title: '2025 wrapper',
    meta: 'february 4, 2026',
    published: '2026-02-04T14:46:00.000Z',
    summary:
      '19 years old wrapper: got my first job. left my first job. won some hackathons. dropped out of university. got an awesome girlfriend. got a lot of rejections,…',
    body: (
      <>
        <p>19 years old wrapper:</p>
        <ul>
          <li>got my first job.</li>
          <li>left my first job.</li>
          <li>won some hackathons.</li>
          <li>dropped out of university.</li>
          <li>got an awesome girlfriend.</li>
          <li>got a lot of rejections, failed a lot.</li>
          <li>
            joined an awesome team at{' '}
            <Out href="https://rippletide.com/">Rippletide</Out>.
          </li>
          <li>gave 10 % of my salary to high‑impact charities.</li>
          <li>
            made my first talk at ECB with{' '}
            <Out href="https://eurotech-federation.com/">Eurotech Federation</Out>
            .
          </li>
          <li>
            organized 3 hackathons: 2 with Rippletide (SF, virtual), 1 with{' '}
            <Out href="https://hackthefork.com/">Hack the Fork</Out> in Paris.
          </li>
        </ul>
      </>
    ),
  },
  {
    slug: 'i-co-organized-a-plant-based-focus-hackathon',
    title: 'i co-organized a plant-based focus hackathon',
    meta: 'december 17, 2025',
    published: '2025-12-17T14:35:00.000Z',
    summary:
      'Most hackathons are AI focused. Some of them are crypto focused. But they are mostly tech focused. They often do not have a particular vision or objective.…',
    body: (
      <>
        <p>
          Most hackathons are AI focused. Some of them are crypto focused. But
          they are mostly tech focused. They often do not have a particular
          vision or objective. With{' '}
          <Out href="https://www.linkedin.com/in/simon-nordmann-389453108/">
            Simon
          </Out>{' '}
          and{' '}
          <Out href="https://www.linkedin.com/in/alice-pjie-7b94a1236/">
            Alice
          </Out>
          , we tried to do it differently. What if projects made during
          hackathons could be really impactful?
        </p>
        <p>
          Hack the Fork was organized in this context. Around 100 hackers from
          the best European schools participated. The theme of the hackathon
          was:{' '}
          <Out href="https://hackthefork.notion.site/25fe1f404b2180a5ba54e6aa1cbe80c4?v=25fe1f404b21809b9e1a000c62f05774">
            How can we improve foodtech using AI?
          </Out>
        </p>
        <h2>Projects winning</h2>
        <h3>First prize: Ardoise</h3>
        <p>
          Team: Evann Hislers Mohamed El Habib Benouis Nora Todeschini Sarkis
          Shadarevian
        </p>
        <h3>Second prize: ReaKt</h3>
        <p>
          Team: Paul Chevalier Elias Moussouni Malik Hassane Gabriel Guiet Dupre
          Andrea de la Cruz
        </p>
        <h3>Third prize: BlendIn</h3>
        <p>Team: Gregoire Bruneau Myriam Duval Christophe Leroy Franck Li</p>
        <h2>What could have been better</h2>
        <ul>
          <li>Better estimation of the number of hackers</li>
          <li>More time allocated to judging</li>
          <li>
            More diversified judges: most of them were foodtech-focused, and not
            AI/tech
          </li>
        </ul>
      </>
    ),
  },
]
