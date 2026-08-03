import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { safeSplitText, showElement } from './safeSplitText'
import { attachScrollReveal, REVEAL_START, whenFontsReady } from './scrollReveal'

/**
 * Masked line-by-line text reveal (SplitText + ScrollTrigger).
 * Text stays visible until split is ready — no empty container flash.
 */
export default function SplitLines({
  as: Tag = 'h2',
  children,
  className,
  delay = 0,
  stagger = 0.09,
  start = REVEAL_START,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    let split
    let tl
    let scrollTrigger
    let cancelled = false

    const run = () => {
      if (cancelled) return

      split = safeSplitText(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      if (!split?.lines?.length) {
        showElement(el)
        return
      }

      showElement(el)
      gsap.set(split.lines, { yPercent: 115 })

      tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
      tl.to(split.lines, {
        yPercent: 0,
        duration: 1.15,
        stagger,
        delay,
      })

      scrollTrigger = attachScrollReveal(tl, el, { start })
    }

    const cancelFonts = whenFontsReady(run)

    return () => {
      cancelled = true
      cancelFonts()
      scrollTrigger?.kill()
      tl?.kill()
      split?.revert?.()
      showElement(el)
    }
  }, [delay, stagger, start])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

