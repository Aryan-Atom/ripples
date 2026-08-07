import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RuleTitle } from '../ui/GoldRule'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

const ENTRIES = [
  {
    year: '1989',
    text: 'Ripples Engineering takes root  the first workshops and the first sold-out fountain batches.',
  },
  {
    year: '1994',
    text: 'Expanded manufacturing capacity and a growing portfolio of architectural water features across India.',
  },
  {
    year: '2006',
    text: 'Advanced control systems and lighting integration elevate large-scale public installations.',
  },
  {
    year: '2012',
    text: 'Multimedia fountain shows become a signature offering  water, music, and light in one choreography.',
  },
  {
    year: '2017',
    text: 'A mature in-house ecosystem: design, R&D, fabrication, and commissioning under one roof in Noida.',
  },
]

export default function Timeline() {
  const pinRef = useRef(null)
  const spineRef = useRef(null)

  useEffect(() => {
    const pin = pinRef.current
    const spine = spineRef.current
    if (!pin || !spine) return

    if (prefersReducedMotion()) {
      gsap.set(spine, { scaleY: 1 })
      gsap.set('.timeline-entry', { opacity: 1, y: 0 })
      return
    }

    gsap.set(spine, { scaleY: 0, transformOrigin: 'top center' })
    gsap.set('.timeline-entry', { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.7,
      },
    })

    tl.to(spine, { scaleY: 1, ease: 'none', duration: 1 }, 0)

    ENTRIES.forEach((_, i) => {
      const rate = 0.85 + (i % 3) * 0.08
      tl.to(
        `.timeline-entry-${i}`,
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 * rate },
        0.12 + i * 0.16,
      )
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={pinRef} className="relative min-h-screen bg-void px-[clamp(1.25rem,4vw,3rem)] py-24">
      <div className="mx-auto max-w-4xl">
        <RuleTitle>Our Journey</RuleTitle>
        <div className="relative mt-16">
          <div
            ref={spineRef}
            className="absolute top-0 bottom-0 left-[0.35rem] w-px bg-gold md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <ol className="relative space-y-16">
            {ENTRIES.map((entry, i) => (
              <li
                key={entry.year}
                className={`timeline-entry timeline-entry-${i} relative grid md:grid-cols-2 ${
                  i % 2 === 1 ? '' : ''
                }`}
              >
                <div
                  className={`pl-8 md:pl-0 ${
                    i % 2 === 1
                      ? 'md:col-start-2 md:pl-12 md:text-left'
                      : 'md:col-start-1 md:pr-12 md:text-right'
                  }`}
                >
                  <span className="font-display text-[clamp(2rem,3.5vw,2.75rem)] text-gold">
                    {entry.year}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-mist/60">
                    {entry.text}
                  </p>
                </div>
                <span
                  className="absolute top-2 left-[0.2rem] h-2 w-2 rounded-full border border-gold bg-void md:left-1/2 md:-translate-x-1/2"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
