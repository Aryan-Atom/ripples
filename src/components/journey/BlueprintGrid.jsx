import { memo, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../motion/gsap'

/**
 * Subtle animated blueprint grid + sparse particles.
 * GPU-friendly: CSS grid + translate3d particles via rAF.
 */
function BlueprintGrid({ className = '', particleCount = 18 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.00008,
      vy: (Math.random() - 0.5) * 0.00006,
      a: 0.12 + Math.random() * 0.22,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > 1) p.vx *= -1
        if (p.y < 0 || p.y > 1) p.vy *= -1
        ctx.beginPath()
        ctx.fillStyle = `rgba(109, 158, 168, ${p.a})`
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [particleCount])

  return (
    <div className={`journey-grid ${className}`.trim()} aria-hidden="true">
      <div className="journey-grid__lines" />
      <canvas ref={canvasRef} className="journey-grid__particles" />
    </div>
  )
}

export default memo(BlueprintGrid)
