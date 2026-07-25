import { useHeroScrollProgress } from 'hero-video-anim'

const PHASES = [
  {
    start: 0,
    end: 0.22,
    title: 'Held breath',
    tagline: 'Before the first surge.',
  },
  {
    start: 0.22,
    end: 0.4,
    title: 'Built to rise',
    tagline: 'Every pump. Every nozzle. Made here.',
  },
  {
    start: 0.4,
    end: 0.58,
    title: 'It breaks free',
    tagline: 'Water climbs — light catches every arc.',
  },
  {
    start: 0.58,
    end: 0.74,
    title: 'Spectacle',
    tagline: 'Laser. Music. Water. In sync.',
  },
  {
    start: 0.74,
    end: 0.88,
    title: 'Their faces',
    tagline: 'That pause. That gasp. That wow.',
  },
  {
    start: 0.88,
    end: 1.001,
    title: 'Since 1989',
    tagline: 'Design. Build. Manufacture.',
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
              <h1 className="home-hero__title">{phase.title}</h1>
              <p className="home-hero__tagline">{phase.tagline}</p>
            </div>
          )
        })}
      </div>
      <div className="home-hero__progress" aria-hidden="true">
        {PHASES.map((phase) => (
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
