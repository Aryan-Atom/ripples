import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useHeroScrollSubscribe } from 'hero-video-anim'

const PHASES = [
  {
    start: 0,
    end: 0.22,
    line: 'Engineering that creates',
    highlight: 'wonder.',
    description:
      'Every show begins in quiet precision — pressure, light, and timing tuned long before the first surge arrives.',
  },
  {
    start: 0.22,
    end: 0.4,
    line: 'Built before water',
    highlight: 'moves.',
    description:
      'Pumps, nozzles, and control systems — designed in-house so every arc lands exactly where it should.',
  },
  {
    start: 0.4,
    end: 0.58,
    line: 'Teaching water to',
    highlight: 'dance.',
    description:
      'Flows and light move in choreography that looks effortless — complex mechanics beneath the surface.',
  },
  {
    start: 0.58,
    end: 0.74,
    line: 'When water becomes a',
    highlight: 'performance.',
    description:
      'Laser, music, and water sync into one immersive show — every effect calibrated to build drama.',
  },
  {
    start: 0.74,
    end: 0.88,
    line: 'Moments that leave people',
    highlight: 'speechless.',
    description:
      'That pause. That gasp. We engineer those moments — every plume, beam, and note arriving together.',
  },
  {
    start: 0.88,
    end: 1.001,
    line: 'Since 1989, sculpting',
    highlight: 'water.',
    description:
      'We design, build, and manufacture the systems behind iconic fountains worldwide.',
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
  const slideRefs = useRef([])
  const contentRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.2 },
      )
    })
    return () => ctx.revert()
  }, [])

  const updateSlides = useCallback((progress) => {
    PHASES.forEach((phase, index) => {
      const slide = slideRefs.current[index]
      if (!slide) return
      const opacity = phaseOpacity(progress, phase, index, PHASES.length)
      slide.style.opacity = String(opacity)
      slide.setAttribute('aria-hidden', opacity <= 0.5 ? 'true' : 'false')
    })
  }, [])

  useHeroScrollSubscribe(updateSlides)

  return (
    <div className="home-hero">
      <div className="home-hero__backdrop" aria-hidden="true" />

      <div ref={contentRef} className="home-hero__content">
        <div className="home-hero__stack">
          {PHASES.map((phase, index) => (
            <div
              key={`${phase.line}${phase.highlight}`}
              ref={(node) => {
                slideRefs.current[index] = node
              }}
              className="home-hero__slide"
              aria-hidden={index !== 0}
            >
              <h1 className="home-hero__title">
                <span className="home-hero__title-line">{phase.line}</span>
                <span className="home-hero__highlight">{phase.highlight}</span>
              </h1>
              <span className="home-hero__rule" aria-hidden="true" />
              <p className="home-hero__description">{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="home-hero__actions">
          <Link to="/multimedia" className="home-hero__btn">
            <span className="home-hero__btn-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M10 8.5v7l6-3.5-6-3.5Z" />
              </svg>
            </span>
            Discover Our Work
          </Link>
          <Link to="/our-journey" className="home-hero__link">
            Our Journey <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
