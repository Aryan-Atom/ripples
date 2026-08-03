import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

/**
 * Counts a stat like "2,000+" up from zero when the element is actually
 * visible in the viewport. Uses IntersectionObserver so pinned heroes /
 * Lenis scroll distance cannot fire the count early.
 */
export default function StatCounter({ value, className }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const match = String(value).match(/([\d,.]+)/)
    if (!match) return undefined

    const target = Number(match[1].replace(/,/g, ''))
    const suffix = String(value).slice(match.index + match[1].length)
    const prefix = String(value).slice(0, match.index)
    const useGrouping = match[1].includes(',')

    const format = (n) =>
      `${prefix}${useGrouping ? Math.round(n).toLocaleString('en-US') : Math.round(n)}${suffix}`

    if (prefersReducedMotion()) {
      el.textContent = format(target)
      return undefined
    }

    el.textContent = format(0)

    let tween = null
    let started = false

    const play = () => {
      if (started) return
      started = true

      const state = { n: 0 }
      tween = gsap.to(state, {
        n: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(state.n)
        },
        onComplete: () => {
          el.textContent = format(target)
        },
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Require a real on-screen presence — not just a pin-related layout pass
        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return
        play()
        observer.disconnect()
      },
      {
        threshold: [0, 0.35, 0.6],
        // No large rootMargin — that was effectively starting the count off-screen
        rootMargin: '0px 0px -12% 0px',
      },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      tween?.kill()
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
