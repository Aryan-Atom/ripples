import { useCallback, useLayoutEffect, useRef } from 'react'
import { useHeroScrollSubscribe } from 'hero-video-anim'
import { getLogoRevealEnd } from './HeroLogoReveal.jsx'

const PHASES = [
  {
    start: 0,
    end: 0.34,
    title: 'Who turns engineering into wonder?',
    description:
      'Every show begins in quiet precision  pressure, light, and timing tuned long before the first surge arrives.',
  },
  {
    start: 0.34,
    end: 0.67,
    title: "When water becomes a performance  who's behind the stage?",
    description:
      'Laser, music, and water sync into one immersive show  every effect calibrated to build drama.',
  },
  {
    start: 0.67,
    end: 1.001,
    title: "What if the real masterpiece isn't the water?",
    description:
      "Since 1989, we've designed, built, and manufactured the systems behind iconic fountains worldwide.",
  },
]

/** Crossfade within each phase's local scroll span (original hero copy behavior). */
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
  const rootRef = useRef(null)
  const backdropRef = useRef(null)

  const updateSlides = useCallback((progress) => {
    const logoEnd = getLogoRevealEnd()
    const inLogo = progress < logoEnd
    const copyProgress = inLogo ? 0 : (progress - logoEnd) / (1 - logoEnd)

    const copyGate = inLogo
      ? Math.max(0, (progress - logoEnd * 0.88) / (logoEnd * 0.12))
      : 1

    if (rootRef.current) {
      rootRef.current.style.opacity = String(copyGate)
    }
    if (backdropRef.current) {
      backdropRef.current.style.opacity = String(copyGate)
    }

    PHASES.forEach((phase, index) => {
      const slide = slideRefs.current[index]
      if (!slide) return

      if (inLogo) {
        slide.style.opacity = '0'
        slide.style.visibility = 'hidden'
        slide.setAttribute('aria-hidden', 'true')
        return
      }

      const opacity = phaseOpacity(copyProgress, phase, index, PHASES.length)
      slide.style.opacity = String(opacity)
      slide.style.visibility = opacity > 0 ? 'visible' : 'hidden'
      slide.setAttribute('aria-hidden', opacity <= 0.5 ? 'true' : 'false')
    })
  }, [])

  useHeroScrollSubscribe(updateSlides)

  useLayoutEffect(() => {
    updateSlides(0)
  }, [updateSlides])

  return (
    <div className="home-hero" ref={rootRef} style={{ opacity: 0 }}>
      <div className="home-hero__backdrop" ref={backdropRef} aria-hidden="true" />
      <div className="home-hero__stack">
        {PHASES.map((phase, index) => (
          <div
            key={phase.title}
            ref={(node) => {
              slideRefs.current[index] = node
            }}
            className="home-hero__slide"
            aria-hidden
          >
            <h1 className="home-hero__title">{phase.title}</h1>
            <p className="home-hero__description">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
