import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

export default function GoldRule({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { scaleX: 1 })
      return
    }

    gsap.set(el, { scaleX: 0, transformOrigin: 'center' })
    const tween = gsap.to(el, {
      scaleX: 1,
      duration: 1.1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`h-px w-full bg-gradient-to-r from-transparent via-gold-soft to-transparent ${className}`}
    />
  )
}

export function RuleTitle({ children, light = false, align = 'center' }) {
  const alignClass =
    align === 'left' ? 'justify-start text-left' : 'justify-center text-center'

  return (
    <h2
      className={`flex items-center gap-5 font-display text-[clamp(2rem,4vw,4rem)] font-normal uppercase tracking-[0.08em] leading-[1.25] ${
        light ? 'text-ink' : 'text-mist'
      } ${alignClass}`}
    >
      {align !== 'left' && (
        <span className="hidden h-px max-w-20 flex-1 bg-gold-soft sm:block" />
      )}
      <span>{children}</span>
      <span className="hidden h-px max-w-20 flex-1 bg-gold-soft sm:block" />
    </h2>
  )
}
