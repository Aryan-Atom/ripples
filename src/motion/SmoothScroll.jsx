import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'
import { resetScroll, scrollToHash, setActiveLenis } from './scrollReset'

/**
 * App-level Lenis for every route except Home  the Home hero package
 * owns its own Lenis instance tuned for the canvas scrub.
 */
export default function SmoothScroll() {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef(null)

  useLayoutEffect(() => {
    if (hash) return
    resetScroll(lenisRef.current)
  }, [pathname, hash])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    if (pathname === '/') {
      setActiveLenis(null)
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (!hash) resetScroll()
      return undefined
    }

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    })

    lenisRef.current = lenis
    setActiveLenis(lenis)

    if (!hash) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    lenis.on('scroll', ScrollTrigger.update)

    const onScrollTop = (event) => {
      event.preventDefault()
      lenis.scrollTo(0, { duration: 1.2 })
    }
    window.addEventListener('ripples:scroll-top', onScrollTop)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(() => {
      if (hash) {
        scrollToHash(hash, lenis)
      } else {
        resetScroll(lenis)
      }
      refresh()
    })
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      window.removeEventListener('ripples:scroll-top', onScrollTop)
      gsap.ticker.remove(raf)
      lenis.destroy()
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
      setActiveLenis(null)
      resetScroll()
    }
  }, [pathname])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis || !hash || prefersReducedMotion()) return undefined

    requestAnimationFrame(() => scrollToHash(hash, lenis))
    return undefined
  }, [hash])

  return null
}
