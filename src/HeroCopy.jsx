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

/** Wider crossfade so 3 beats dissolve cleanly under scrub. */
const FADE = 0.1

function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

function phaseOpacity(progress, phase, index, total) {
  const { start, end } = phase
  const fadeInFrom = index === 0 ? start : start - FADE
  const fadeOutTo = index === total - 1 ? end : end + FADE

  if (progress < fadeInFrom || progress > fadeOutTo) return 0

  let opacity = 1
  if (index > 0 && progress < start + FADE) {
    opacity = Math.min(opacity, smoothstep((progress - (start - FADE)) / (2 * FADE)))
  }
  if (index < total - 1 && progress > end - FADE) {
    opacity = Math.min(opacity, smoothstep((end + FADE - progress) / (2 * FADE)))
  }
  return Math.max(0, Math.min(1, opacity))
}

export default function HeroCopy() {
  const slideRefs = useRef([])
  const rootRef = useRef(null)
  const backdropRef = useRef(null)

  const updateSlides = useCallback((progress) => {
    const logoEnd = getLogoRevealEnd()
    const inLogo = progress < logoEnd
    const copyProgress = inLogo
      ? 0
      : (progress - logoEnd) / (1 - logoEnd)

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
        slide.style.transform = 'translate3d(0, 10px, 0)'
        slide.setAttribute('aria-hidden', 'true')
        return
      }

      const opacity = phaseOpacity(copyProgress, phase, index, PHASES.length)
      const y = (1 - opacity) * 10
      slide.style.opacity = String(opacity)
      slide.style.transform = `translate3d(0, ${y}px, 0)`
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
