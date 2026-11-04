import { createFileRoute } from '@tanstack/react-router'

import { InkTrail } from '#/components/InkTrail'
import { Nav } from '#/components/Nav'
import { Print } from '#/components/Print'
import { links, projects } from '#/content'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page">
      <InkTrail />
      <Hero />
      <main>
        <Projects />
      </main>
    </div>
  )
}

function Hero() {
  return (
    <header className="band">
      <div className="frame hero">
        <Nav />

        <h1 className="display hero__title">
          i make ai things people{' '}
          <em className="mark mark--title">actually</em> use.
        </h1>

        <div className="hero__intro">
          <p className="hand">
            product engineer. $10k+ in hackathon prizes. once talked ai agents
            at the european central bank.
          </p>
          <a className="button" href={links.x}>
            follow me on x <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="wall">
          <Print
            cutout
            eager
            entrance={0}
            src="/photos/cutout-headphones.webp"
            alt="Salim wearing big white headphones, cut out on a cobalt background"
            x={660}
            y={130}
            w={170}
            ratio={240 / 340}
            tilt={-4}
          />
          <Print
            eager
            tape
            entrance={1}
            src="/photos/stairs.webp"
            alt="Salim in a concrete stairwell, glancing to the side"
            x={850}
            y={110}
            w={290}
            ratio={406 / 290}
            tilt={4}
          >
            <figcaption className="caption">me, before the demo</figcaption>
          </Print>
          <Print
            eager
            entrance={2}
            src="/photos/reading.webp"
            alt="Salim in a hotel armchair, absorbed in a large menu"
            x={700}
            y={400}
            w={290}
            ratio={406 / 280}
            tilt={-5}
          >
            <figcaption className="caption">me, reading the docs</figcaption>
          </Print>
          <Print
            eager
            tape
            entrance={3}
            src="/photos/smile.webp"
            alt="Salim smiling in a hotel armchair"
            x={1020}
            y={400}
            w={250}
            ratio={346 / 300}
            tilt={3}
          >
            <figcaption className="caption">me, after the demo</figcaption>
          </Print>
        </div>
      </div>
    </header>
  )
}

const projectLayout = [
  { x: 120, y: 190, w: 440, ratio: 676 / 380, tilt: -2 },
  { x: 610, y: 110, w: 340, ratio: 536 / 300, tilt: 3 },
  { x: 985, y: 300, w: 335, ratio: 556 / 310, tilt: -2.5, tape: true },
]

function Projects() {
  return (
    <section className="band" id="made">
      <div className="frame projects">
        <h2 className="display projects__title">
          stuff <em>i made.</em>
        </h2>

        {projects.map((project, index) => (
          <Print
            key={project.name}
            {...projectLayout[index]}
            draggable={false}
            src={project.image}
            video={project.video}
            alt={project.alt}
          >
            <figcaption className="project-caption">
              <a className="project-caption__name" href={project.href}>
                {project.name}
              </a>
              <span className="caption">{project.description}</span>
            </figcaption>
          </Print>
        ))}

        <p className="hand projects__note">
          + small projects along the way, because i like experimenting and
          exploring new ideas.
        </p>
      </div>
    </section>
  )
}
