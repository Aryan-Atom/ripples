import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../motion/preferences'

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone?.()
      return
    }

    const state = { value: 0 }
    const loadTween = gsap.to(state, {
      value: 100,
      duration: 0.55,
      ease: 'power1.out',
      onUpdate: () => setPct(Math.round(state.value)),
      onComplete: () => {
        setHiding(true)
        gsap.to('.preloader-curtain', {
          yPercent: -105,
          duration: 0.45,
          ease: 'power2.inOut',
          stagger: 0.04,
          onComplete: () => onDone?.(),
        })
      },
    })

    return () => loadTween.kill()
  }, [onDone])

  if (prefersReducedMotion()) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <div className="preloader-curtain absolute inset-0 bg-void" />
      <div className="preloader-curtain absolute inset-0 origin-top bg-void-soft" />
      {!hiding && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-void">
          <p className="font-display text-5xl font-light tracking-[0.08em] text-gold md:text-7xl">
            {pct}
          </p>
          <div className="h-px w-40 overflow-hidden bg-white/10">
            <div
              className="h-full origin-left bg-gradient-to-r from-gold-soft to-gold"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
