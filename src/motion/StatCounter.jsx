import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { attachScrollReveal } from './scrollReveal'

/** Counts a stat like "2,000+" up from zero when it scrolls into view. */
export default function StatCounter({ value, className }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    const match = String(value).match(/([\d,.]+)/)
    if (!match) return undefined

    const target = Number(match[1].replace(/,/g, ''))
    const suffix = String(value).slice(match.index + match[1].length)
    const prefix = String(value).slice(0, match.index)
    const useGrouping = match[1].includes(',')
    const state = { n: 0 }

    const setText = (n) => {
      el.textContent = `${prefix}${useGrouping ? n.toLocaleString('en-US') : n}${suffix}`
    }

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
    tl.to(state, {
      n: target,
      duration: 1.8,
      onUpdate: () => setText(Math.round(state.n)),
      onComplete: () => setText(target),
    })

    const scrollTrigger = attachScrollReveal(tl, el, { start: 'top 94%' })

    if (scrollTrigger.progress >= 1) {
      setText(target)
    }

    return () => {
      scrollTrigger?.kill()
      tl.kill()
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
