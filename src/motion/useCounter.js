import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './preferences'

gsap.registerPlugin(ScrollTrigger)

/** Animate a numeric counter once when the element enters view. */
export function useCounter(target, { suffix = '', decimals = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.textContent = `${target}${suffix}`
      return
    }

    const state = { value: 0 }
    const tween = gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${state.value.toFixed(decimals)}${suffix}`
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [target, suffix, decimals])

  return ref
}
