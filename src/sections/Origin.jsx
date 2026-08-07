import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RuleTitle } from '../ui/GoldRule'
import RevealText from '../motion/RevealText'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

export default function Origin() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      img,
      { yPercent: -12, scale: 1.12 },
      {
        yPercent: 12,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    const mask = gsap.fromTo(
      '.origin-mask',
      { scaleX: 1 },
      {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      mask.scrollTrigger?.kill()
      mask.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-void-soft px-[clamp(1.25rem,4vw,3rem)] py-[clamp(4.5rem,12vw,7.5rem)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <figure className="relative overflow-hidden">
          <div className="origin-mask absolute inset-0 z-10 bg-gold-soft/90" />
          <div className="overflow-hidden">
            <img
              ref={imgRef}
              src="/images/waves-exhibition-delhi.jpg"
              alt="Ripples Engineering exhibition booth at Waves Exhibition, Delhi NCR"
              className="aspect-[4/5] w-full object-cover will-change-transform lg:aspect-[4/5]"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-3 font-body text-[0.65rem] uppercase tracking-[0.15em] text-mist/45">
            Waves Exhibition, Delhi NCR  From prototype to presence
          </figcaption>
        </figure>

        <div>
          <RuleTitle align="left">The Origin</RuleTitle>
          <p className="mt-8 text-[0.95rem] leading-[1.85] text-mist/65">
            In 1988, at a Delhi exhibition, an idea took shape: what if an
            aquarium pump could become the heart of a fountain? A working
            prototype drew a crowd  and the first batch sold out.
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.85] text-mist/65">
            That moment of curiosity became Ripples Engineering: a company built
            on making water move with purpose, beauty, and precision.
          </p>
          <blockquote className="mt-10">
            <RevealText
              as="p"
              className="font-display text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.45] text-mist"
            >
              From a single exhibition floor to India&apos;s largest fountain
              manufacturer  one ripple at a time.
            </RevealText>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
