import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'
import { resetScroll } from './scrollReset'

/**
 * App-level Lenis for every route except Home — the Home hero package
 * owns its own Lenis instance tuned for the canvas scrub.
 */
export default function SmoothScroll() {
  const { pathname } = useLocation()
  const lenisRef = useRef(null)

  useLayoutEffect(() => {
    resetScroll(lenisRef.current)
  }, [pathname])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    if (pathname === '/') {
      lenisRef.current?.destroy()
      lenisRef.current = null
      resetScroll()
      return undefined
    }

    resetScroll()

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    })

    lenisRef.current = lenis
    lenis.scrollTo(0, { immediate: true, force: true })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(() => {
      resetScroll(lenis)
      refresh()
    })
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
      resetScroll()
    }
  }, [pathname])

  return null
}
