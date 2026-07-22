import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { LenisContext } from './LenisContext'
import { DEFAULT_LENIS_OPTIONS } from './lenisOptions'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children, options }) {
  const lenisRef = useRef(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  })

  useEffect(() => {
    const lenis = new Lenis({ ...DEFAULT_LENIS_OPTIONS, ...optionsRef.current })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  )
}
