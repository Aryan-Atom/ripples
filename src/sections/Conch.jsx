import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RuleTitle } from '../ui/GoldRule'
import RevealText from '../motion/RevealText'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

export default function Conch() {
  const sectionRef = useRef(null)
  const pathRefs = useRef([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const paths = pathRefs.current.filter(Boolean)
    if (!section || !paths.length) return

    paths.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    if (prefersReducedMotion()) {
      paths.forEach((p) => {
        p.style.strokeDashoffset = '0'
      })
      setProgress(1)
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.8,
        onUpdate: (self) => setProgress(self.progress),
      },
    })

    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, ease: 'none', duration: 0.25 }, i * 0.12)
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)] text-ink"
    >
      <div className="mx-auto max-w-3xl text-center">
        <RuleTitle light>The Conch</RuleTitle>

        <div className="relative mx-auto mt-10 flex h-56 items-center justify-center md:h-72">
          <svg
            viewBox="0 0 120 120"
            className="h-40 w-40 text-gold md:h-48 md:w-48"
            fill="none"
            aria-hidden="true"
          >
            {[
              'M20 78c18-10 28-28 28-44',
              'M32 86c22-12 34-32 34-52',
              'M46 92c24-14 36-34 36-54',
              'M62 96c24-16 34-36 34-56',
            ].map((d, i) => (
              <path
                key={d}
                ref={(el) => {
                  pathRefs.current[i] = el
                }}
                d={d}
                stroke="currentColor"
                strokeWidth="1.25"
              />
            ))}
            <path
              d="M78 42c8 10 10 22 4 34-8 16-28 24-46 18"
              stroke="currentColor"
              strokeWidth="1.25"
              opacity={progress > 0.7 ? 1 : 0.2}
            />
          </svg>
        </div>

        <p className="mt-6 text-[0.95rem] leading-[1.85] text-ink/70">
          Four free-flowing lines form waves that resolve into a conch 
          signifying life in water and its sacred sound.
        </p>
        <RevealText
          as="p"
          className="mt-8 font-display text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.45] text-ink"
        >
          What started as tiny Ripples in 1989 has evolved into a giant wave.
        </RevealText>
      </div>
    </section>
  )
}
