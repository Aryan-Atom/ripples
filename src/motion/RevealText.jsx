import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './preferences'

gsap.registerPlugin(ScrollTrigger)

export default function RevealText({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const text = el.textContent || ''
    el.setAttribute('aria-label', text)
    el.textContent = ''

    const chars = [...text].map((ch) => {
      const span = document.createElement('span')
      span.className = 'inline-block will-change-transform'
      span.textContent = ch === ' ' ? '\u00A0' : ch
      span.setAttribute('aria-hidden', 'true')
      el.appendChild(span)
      return span
    })

    if (prefersReducedMotion()) {
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    gsap.set(chars, { opacity: 0, y: '0.65em', rotateX: -55 })

    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.02,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [children, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
