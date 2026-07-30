import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import { safeSplitText, showElement } from '../motion/safeSplitText'
import FadeUp from '../motion/FadeUp'

/**
 * Interior page opener: eyebrow, mega title (char reveal), optional lead.
 * `title` accepts JSX so accent words can be wrapped in <em>.
 */
export default function PageHero({ eyebrow, title, lead, children }) {
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
      tween = gsap.from(split.chars, {
        yPercent: 108,
        duration: 1.2,
        ease: 'power4.out',
        stagger: { each: 0.02, from: 'start' },
        delay: 0.15,
      })
    }

    gsap.set(el, { autoAlpha: 0 })
    if (document.fonts?.ready) {
      document.fonts.ready.then(run).catch(run)
    } else {
      run()
    }

    return () => {
      cancelled = true
      tween?.kill()
      split?.revert?.()
      showElement(el)
    }
  }, [])

  return (
    <header className="page-hero">
      <div className="page-hero__inner r-container">
        {eyebrow && (
          <FadeUp as="p" className="page-hero__eyebrow r-label" y={18} duration={0.9}>
            {eyebrow}
          </FadeUp>
        )}
        <h1 className="page-hero__title" ref={titleRef}>
          {title}
        </h1>
        {lead && (
          <FadeUp as="p" className="page-hero__lead" delay={0.5} y={28}>
            {lead}
          </FadeUp>
        )}
        {children}
      </div>
    </header>
  )
}
