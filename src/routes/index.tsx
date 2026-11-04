import { createFileRoute } from '@tanstack/react-router'

import { InkTrail } from '#/components/InkTrail'
import { Nav } from '#/components/Nav'
import { Print } from '#/components/Print'
import { links, projects } from '#/content'
import { useLanding } from '#/useLanding'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page">
      <InkTrail />
      <Hero />
      <main>
        <Projects />
        <About />
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

function About() {
  const doodle = useLanding<HTMLDivElement>()

  return (
    <section className="band band--cobalt" id="about">
      <div className="frame about">
        <div ref={doodle} className="about__doodle" aria-hidden="true">
          <svg viewBox="0 0 260 320" fill="none">
            <path
              className="about__crown"
              d="M88 75 C86 61 84 47 82 34 C92 42 100 50 108 56 C115 46 123 36 130 26 C136 36 144 46 151 56 C160 49 168 41 178 33 C176 47 174 61 171 74 C144 70 116 70 88 75 Z"
            />
            <path d="M84 118 C82 92 104 76 132 76 C160 76 178 94 177 120 C176 148 156 168 130 168 C104 168 86 146 84 118 Z" />
            <path d="M85 112 C96 108 100 96 104 90 C108 100 114 104 120 104 C124 98 126 92 129 88 C133 98 140 104 148 104 C152 98 154 94 156 90 C160 100 168 108 176 112" />
            <path d="M113 121 L113 124 M148 121 L148 124" />
            <path d="M115 142 C124 151 138 151 147 141" />
            <path d="M130 168 C129 196 131 224 130 252" />
            <path d="M130 192 C110 182 90 166 72 140" />
            <path d="M130 192 C150 202 170 214 190 228" />
            <path d="M130 252 C120 276 110 296 98 314 M130 252 C140 276 152 296 166 314" />
            <path
              className="about__crown"
              d="M52 132 L42 124 M50 112 L38 104 M66 110 L60 96"
            />
          </svg>
        </div>

        <h2 className="display about__title">
          hi, it's <em>me.</em>
        </h2>

        <div className="about__bio">
          <p>
            i enjoy working across engineering and product, turning ideas into
            simple tools that people actually use.
          </p>
          <p>
            i've worked across ai startups, consulting and research, and spoken
            at the european central bank about ai agents and their impact on
            institutions.
          </p>
        </div>

        <aside className="note">
          <strong className="note__figure">$10k+</strong>
          <span className="hand">
            in hackathon prizes, with multiple wins at ethglobal and
            entrepreneur first
          </span>
        </aside>

        <Print
          src="/photos/eiffel.webp"
          alt="Salim in a suit at night, looking away from the lit-up Eiffel Tower"
          x={900}
          y={420}
          w={240}
          ratio={280 / 220}
          tilt={4}
        >
          <figcaption className="caption">me, updating my p(doom)</figcaption>
        </Print>
      </div>
    </section>
  )
}
