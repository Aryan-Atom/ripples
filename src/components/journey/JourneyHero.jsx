import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../motion/gsap'
import { safeSplitText, showElement } from '../../motion/safeSplitText'
import { whenFontsReady } from '../../motion/scrollReveal'
import FadeUp from '../../motion/FadeUp'
import BlueprintGrid from './BlueprintGrid'
import { JOURNEY_HERO } from '../../data/journey'
import { withBrand } from '../Brand.jsx'

export default function JourneyHero() {
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el || prefersReducedMotion()) return undefined

    let split
    let tween
    let cancelled = false

    const run = () => {
      if (cancelled) return
      split = safeSplitText(el, { type: 'chars,words', mask: 'words' })
      if (!split?.chars?.length) {
        showElement(el)
        return
      }

      showElement(el)

      // Pad SplitText word masks so glyphs (e.g. trailing "g") aren't clipped.
      split.words?.forEach((word) => {
        const mask = word.parentElement
        if (mask && mask !== el) {
          mask.style.paddingRight = '0.16em'
          mask.style.paddingBottom = '0.18em'
          mask.style.boxSizing = 'content-box'
        }
      })

      gsap.set(split.chars, { yPercent: 108 })
      tween = gsap.to(split.chars, {
        yPercent: 0,
        duration: 1.25,
        ease: 'power4.out',
        stagger: { each: 0.018, from: 'start' },
        delay: 0.12,
      })
    }

    const cancelFonts = whenFontsReady(run)

    return () => {
      cancelled = true
      cancelFonts()
      tween?.kill()
      split?.revert?.()
      showElement(el)
    }
  }, [])

  return (
    <header className="journey-hero" aria-labelledby="journey-hero-title">
      <BlueprintGrid className="journey-hero__grid" particleCount={22} />

      <div className="journey-hero__inner r-container">
        <FadeUp as="p" className="journey-hero__label r-label">
          {JOURNEY_HERO.label}
        </FadeUp>

        <h1 id="journey-hero-title" className="journey-hero__title" ref={titleRef}>
          {JOURNEY_HERO.titleLines.map((line) => {
            const isEm = line === JOURNEY_HERO.titleEm
            return (
              <span key={line} className="journey-hero__title-line">
                {isEm ? <em>{line}</em> : line}
                <br />
              </span>
            )
          })}
        </h1>

        <FadeUp as="p" className="journey-hero__lead" delay={0.55} y={24}>
          {withBrand(JOURNEY_HERO.lead)}
        </FadeUp>
      </div>
    </header>
  )
}
