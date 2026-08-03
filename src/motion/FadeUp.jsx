import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'
import { attachScrollReveal, createRevealTimeline, REVEAL_START } from './scrollReveal'

/** Generic scroll-in reveal: rise + fade, optionally staggering direct children. */
export default function FadeUp({
  as: Tag = 'div',
  children,
  className,
  delay = 0.06,
  y = 28,
  duration = 0.65,
  stagger = 0,
  start = REVEAL_START,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const targets = stagger > 0 ? Array.from(el.children) : el

    if (prefersReducedMotion()) {
      gsap.set(gsap.utils.toArray(targets), { clearProps: 'all' })
      return undefined
    }

    const tl = createRevealTimeline(targets, { y, duration, stagger, delay })
    if (!tl) return undefined

    const reveal = attachScrollReveal(tl, el, { start })

    return () => {
      reveal?.kill()
      // If reveal never played, force visible so unmount/remount can't strand text.
      if (tl.paused() && tl.progress() === 0) {
        gsap.set(gsap.utils.toArray(targets), { autoAlpha: 1, y: 0, clearProps: 'all' })
      }
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

