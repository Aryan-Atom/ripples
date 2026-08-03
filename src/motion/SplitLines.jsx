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
  delay = 0.06,
  stagger = 0.06,
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

      split = safeSplitText(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
      })
      if (!split?.lines?.length) {
        showElement(el)
        return
      }

      showElement(el)
      gsap.set(split.lines, { yPercent: 108, autoAlpha: 1 })

      tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      tl.to(split.lines, {
        yPercent: 0,
        duration: 0.7,
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
      // Ensure lines aren't left masked below the clip if reveal never fired.
      if (tl?.paused() && tl.progress() === 0 && split?.lines?.length) {
        gsap.set(split.lines, { yPercent: 0, clearProps: 'transform' })
      }
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

