import { useRef, useState } from 'react'
import RevealText from '../motion/RevealText'

export default function CTA() {
  const btnRef = useRef(null)
  const [ripple, setRipple] = useState({ x: 50, y: 50, on: false })

  const onMove = (e) => {
    const el = btnRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    const mx = (e.clientX - (r.left + r.width / 2)) * 0.2
    const my = (e.clientY - (r.top + r.height / 2)) * 0.2
    el.style.transform = `translate(${mx}px, ${my}px)`
    setRipple({ x, y, on: true })
  }

  const onLeave = () => {
    const el = btnRef.current
    if (el) el.style.transform = 'translate(0, 0)'
    setRipple((r) => ({ ...r, on: false }))
  }

  return (
    <section
      id="contact"
      className="bg-void px-[clamp(1.25rem,4vw,3rem)] py-[clamp(5rem,14vw,8.5rem)] text-center"
    >
      <RevealText
        as="h2"
        className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal uppercase tracking-[0.08em] text-mist"
      >
        Begin Your Project
      </RevealText>

      <a
        ref={btnRef}
        href="mailto:admin@ripplesfountains.com"
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mt-10 inline-flex items-center justify-center overflow-hidden border border-gold px-10 py-4 font-body text-[0.72rem] font-medium uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:text-void-soft"
      >
        <span
          className="pointer-events-none absolute inset-0 origin-center bg-gold transition-transform duration-500"
          style={{
            transform: ripple.on ? 'scale(1)' : 'scale(0)',
            clipPath: `circle(70% at ${ripple.x}% ${ripple.y}%)`,
          }}
        />
        <span className="relative z-10">Request a Consultation</span>
      </a>
    </section>
  )
}
