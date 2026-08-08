import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RuleTitle } from '../ui/GoldRule'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

export default function Manufacturing() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: 0.6,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => st.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)] text-ink"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <RuleTitle light align="left">
            Manufacturing
          </RuleTitle>
          <p className="mt-8 text-[0.95rem] leading-[1.85] text-ink/70">
            Our in-house factory in Noida is where design becomes hardware 
            nozzles, manifolds, control panels, and show systems built under one
            roof.
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.85] text-ink/70">
            Dedicated R&amp;D in hydraulics, lighting, and control systems keeps
            every installation precise, durable, and ready for the night it has
            to perform.
          </p>
        </div>

        <figure className="overflow-hidden">
          <img
            src="/images/noida-factory.jpg"
            alt="Exterior of the Ripples Engineering factory building in Noida"
            className="aspect-[5/4] w-full object-cover"
            loading="lazy"
            style={{
              clipPath: `inset(0 ${Math.max(0, 100 - progress * 100)}% 0 0)`,
            }}
          />
          <figcaption className="mt-3 text-[0.65rem] uppercase tracking-[0.15em] text-ink/50">
            Noida  Design, fabricate, commission
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
