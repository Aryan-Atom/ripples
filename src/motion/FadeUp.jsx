import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

/** Generic scroll-in reveal: rise + fade, optionally staggering direct children. */
export default function FadeUp({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  y = 44,
  duration = 1.1,
  stagger = 0,
  start = 'top 88%',
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    const targets = stagger > 0 ? Array.from(el.children) : el
    const tween = gsap.from(targets, {
      autoAlpha: 0,
      y,
      duration,
      delay,
      ease: 'power3.out',
      stagger,
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: el, start, once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, y, duration, stagger, start])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
