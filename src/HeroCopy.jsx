import { useCallback, useLayoutEffect, useRef } from 'react'
import { useHeroScrollSubscribe } from 'hero-video-anim'
import { getLogoEndStart } from './HeroLogoReveal.jsx'

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
      'Light, music, and water sync into one immersive show  every effect calibrated to build drama.',
  },
  {
    start: 0.67,
    end: 1.001,
    title: "What if the real masterpiece isn't the water?",
    description:
      "Since 1989, we've designed, built, and manufactured the systems behind iconic fountains worldwide.",
  },
]

/** Crossfade within each phase's local scroll span. */
const FADE_EDGE = 0.12
/** Fade copy out before the end Ripples logo fully lands. */
const OUTRO_FADE = 0.08

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
    const logoStart = getLogoEndStart()
    // Remap copy into the scroll before the end logo beat.
    const copyProgress = Math.min(1, Math.max(0, progress / logoStart))

    // First line is fully visible on load; only fade out into the end logo.
    let gate = 1
    if (progress > logoStart - OUTRO_FADE) {
      gate = Math.max(0, (logoStart - progress) / OUTRO_FADE)
    }

    if (rootRef.current) {
      rootRef.current.style.opacity = String(gate)
    }
    if (backdropRef.current) {
      backdropRef.current.style.opacity = String(gate)
    }

    const hideAll = gate <= 0.001

    PHASES.forEach((phase, index) => {
      const slide = slideRefs.current[index]
      if (!slide) return

      if (hideAll) {
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
    <div className="home-hero" ref={rootRef} style={{ opacity: 1 }}>
      <div className="home-hero__backdrop" ref={backdropRef} aria-hidden="true" />
      <div className="home-hero__stack">
        {PHASES.map((phase, index) => (
          <div
            key={phase.title}
            ref={(node) => {
              slideRefs.current[index] = node
            }}
            className="home-hero__slide"
            style={
              index === 0
                ? { opacity: 1, visibility: 'visible' }
                : { opacity: 0, visibility: 'hidden' }
            }
            aria-hidden={index !== 0}
          >
            <h1 className="home-hero__title">{phase.title}</h1>
            <p className="home-hero__description">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
