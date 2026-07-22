import { useHeroScrollProgress } from 'hero-video-anim'

const PHASES = [
  {
    start: 0,
    end: 0.2,
    eyebrow: 'Sculpting Water',
    title: 'Stillness before the surge',
    tagline:
      'Every fountain begins in quiet — water gathering, waiting for the moment it breaks free.',
  },
  {
    start: 0.2,
    end: 0.38,
    eyebrow: 'Built in-house',
    title: 'Pressure builds',
    tagline:
      'Custom pumps, precision nozzles, and decades of engineering — all manufactured under one roof.',
  },
  {
    start: 0.38,
    end: 0.58,
    eyebrow: 'The eruption',
    title: 'Watch it rise',
    tagline:
      'Arcs of water climb into the air — a living sculpture catching light with every beat.',
  },
  {
    start: 0.58,
    end: 0.76,
    eyebrow: 'Multimedia shows',
    title: 'Pure spectacle',
    tagline:
      'Laser, light, music, and water in perfect sync — designed to hold crowds spellbound.',
  },
  {
    start: 0.76,
    end: 0.9,
    eyebrow: 'The reaction',
    title: 'That wow moment',
    tagline:
      'When fountains light up faces and families pause in wonder — that is what we build for.',
  },
  {
    start: 0.9,
    end: 1.001,
    eyebrow: 'Ripples Engineering',
    title: 'Since 1989',
    tagline:
      'Among the few companies worldwide that design, build, and manufacture every component in-house.',
  },
]

const FADE_EDGE = 0.12

function phaseOpacity(progress, phase, index, total) {
  const span = phase.end - phase.start
  if (span <= 0) return 0

  const local = (progress - phase.start) / span
  if (local < 0 || local > 1) return 0

  const isFirst = index === 0
  const isLast = index === total - 1

  if (!isFirst && local < FADE_EDGE) return local / FADE_EDGE
  if (!isLast && local > 1 - FADE_EDGE) return (1 - local) / FADE_EDGE
  return 1
}

export default function HeroCopy() {
  const progress = useHeroScrollProgress()

  return (
    <div className="home-hero">
      <div className="home-hero__backdrop" aria-hidden="true" />
      <div className="home-hero__stack">
        {PHASES.map((phase, index) => {
          const opacity = phaseOpacity(progress, phase, index, PHASES.length)
          const isActive = opacity > 0.5

          return (
            <div
              key={phase.title}
              className="home-hero__slide"
              style={{ opacity }}
              aria-hidden={!isActive}
            >
              <p className="home-hero__eyebrow">{phase.eyebrow}</p>
              <h1 className="home-hero__title">{phase.title}</h1>
              <p className="home-hero__tagline">{phase.tagline}</p>
            </div>
          )
        })}
      </div>
      <div className="home-hero__progress" aria-hidden="true">
        {PHASES.map((phase, index) => (
          <span
            key={phase.title}
            className={`home-hero__dot${
              progress >= phase.start && progress < phase.end ? ' is-active' : ''
            }${progress >= phase.end ? ' is-past' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
