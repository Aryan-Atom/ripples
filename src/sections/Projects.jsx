import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RuleTitle } from '../ui/GoldRule'
import { prefersReducedMotion } from '../motion/preferences'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'Isola Courtyard Fountain',
    location: 'Isola, 2014',
  },
  {
    title: 'Multimedia Fountain Show',
    location: 'Public installation',
  },
  {
    title: 'The Big 5 Dubai',
    location: 'Dubai',
  },
  {
    title: 'Garden & Landscape Dubai',
    location: 'Dubai',
  },
  {
    title: 'International Exhibition',
    location: 'Dubai',
  },
]

export default function Projects() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    if (!track || !pin || prefersReducedMotion()) return

    const tween = gsap.to(track, {
      xPercent: -55,
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 0.45,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      ref={pinRef}
      id="projects"
      className="relative min-h-screen overflow-hidden bg-void-soft"
    >
      <div className="px-[clamp(1.25rem,4vw,3rem)] pt-20">
        <RuleTitle>Featured Projects</RuleTitle>
      </div>

      <div className="mt-10 overflow-hidden pb-20">
        <div ref={trackRef} className="flex w-max gap-0">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="relative aspect-[16/10] w-[85vw] max-w-3xl shrink-0"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void via-void/50 to-transparent p-6">
                <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-mist">
                  {project.title}
                </h3>
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.15em] text-gold">
                  {project.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
