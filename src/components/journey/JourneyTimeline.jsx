import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/gsap'
import FadeUp from '../../motion/FadeUp'
import BlueprintGrid from './BlueprintGrid'
import SplitPanel from './SplitPanel'
import { JOURNEY_TIMELINE, JOURNEY_TIMELINE_MEDIA } from '../../data/journey'

export default function JourneyTimeline() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const progressRef = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    const progress = progressRef.current
    if (!section || !list || !progress) return undefined

    const items = JOURNEY_TIMELINE.length

    if (prefersReducedMotion()) {
      gsap.set(progress, { scaleY: 1 })
      return undefined
    }

    gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' })

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 50%',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(progress, { scaleY: self.progress })
        const next = Math.min(items - 1, Math.floor(self.progress * items + 0.001))
        setActive((prev) => (prev === next ? prev : next))
      },
    })

    return () => st.kill()
  }, [])

  return (
    <SplitPanel
      ref={sectionRef}
      id="timeline"
      className="journey-timeline"
      spark={false}
      media={
        <div className="journey-timeline__media">
          <BlueprintGrid className="journey-timeline__grid" particleCount={10} />
          <div className="journey-timeline__stage">
            <FadeUp as="p" className="r-label journey-timeline__eyebrow">
              35 years of innovation
            </FadeUp>
            <FadeUp as="h2" className="journey-timeline__heading" delay={0.06}>
              A line through <em>time.</em>
            </FadeUp>
            <div className="journey-timeline__blueprint-wrap">
              <img
                className="timeline-blueprint"
                src={JOURNEY_TIMELINE_MEDIA.blueprint}
                alt={JOURNEY_TIMELINE_MEDIA.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="journey-timeline__active" aria-live="polite">
        {JOURNEY_TIMELINE[active]?.year}
      </div>

      <div className="journey-timeline__track">
        <div className="journey-timeline__spine" aria-hidden="true">
          <div ref={progressRef} className="journey-timeline__progress" />
        </div>

        <ol ref={listRef} className="journey-timeline__list">
          {JOURNEY_TIMELINE.map((entry, i) => (
            <li
              key={entry.year}
              className={`journey-timeline__item${i % 2 === 0 ? ' is-left' : ' is-right'}${i <= active ? ' is-active' : ''}${i === active ? ' is-current' : ''}`}
            >
              <span className="journey-timeline__dot" aria-hidden="true" />
              <div className="journey-timeline__card">
                <span className="journey-timeline__item-year">{entry.year}</span>
                <h3 className="journey-timeline__item-title">{entry.title}</h3>
                <p className="journey-timeline__item-body">{entry.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SplitPanel>
  )
}
