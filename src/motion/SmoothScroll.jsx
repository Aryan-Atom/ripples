import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * App-level Lenis for every route except Home — the Home hero package
 * owns its own Lenis instance tuned for the canvas scrub.
 */
export default function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/' || prefersReducedMotion()) return undefined

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.1 })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [pathname])

  return null
}
