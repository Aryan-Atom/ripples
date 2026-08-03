import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { attachScrollReveal, createRevealTimeline, REVEAL_START } from './scrollReveal'

/** Generic scroll-in reveal: rise + fade, optionally staggering direct children. */
export default function FadeUp({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  y = 44,
  duration = 1.1,
  stagger = 0,
  start = REVEAL_START,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    const targets = stagger > 0 ? Array.from(el.children) : el
    const tl = createRevealTimeline(targets, { y, duration, stagger, delay })
    if (!tl) return undefined

    const scrollTrigger = attachScrollReveal(tl, el, { start })

    return () => {
      scrollTrigger?.kill()
      tl.kill()
      gsap.set(gsap.utils.toArray(targets), { clearProps: 'all' })
    }
  }, [delay, y, duration, stagger, start])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
