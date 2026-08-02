import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { safeSplitText, showElement } from './safeSplitText'

/**
 * Masked line-by-line text reveal (SplitText + ScrollTrigger).
 * Waits for fonts so line breaks are computed against the final metrics.
 */
export default function SplitLines({
  as: Tag = 'h2',
  children,
  className,
  delay = 0,
  stagger = 0.09,
  start = 'top 85%',
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    let split
    let tween
    let cancelled = false

    const run = () => {
      if (cancelled) return
      split = safeSplitText(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      if (!split?.lines?.length) {
        showElement(el)
        return
      }

      showElement(el)
      tween = gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.15,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
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
      tween?.scrollTrigger?.kill()
      tween?.kill()
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

