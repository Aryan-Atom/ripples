import { useEffect, useRef } from 'react'
import {
  isCoarsePointer,
  isMobileViewport,
  prefersReducedMotion,
} from '../motion/preferences'

export default function MagneticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport() || isCoarsePointer()) {
      document.body.classList.add('is-touch')
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let hovering = false
    let raf = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor="hover"]')
      hovering = !!t
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
        hovering ? 2.2 : 1
      })`
    }

    const tick = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${
        hovering ? 2.2 : 1
      })`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[300] hidden h-1.5 w-1.5 rounded-full bg-gold md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[300] hidden h-9 w-9 rounded-full border border-gold/70 transition-[width,height,border-color] duration-300 md:block"
      />
    </>
  )
}
