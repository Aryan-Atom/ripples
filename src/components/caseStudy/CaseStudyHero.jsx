import { useCallback, useState } from 'react'
import FadeUp from '../../motion/FadeUp'
import LazyVideo from '../LazyVideo'
import { CASE_STUDY } from '../../data/caseStudy'
import { emphasizeLine } from '../../data/journey'

/**
 * Hero uses Intro.mp4 as a simple muted loop.
 * Large file: stream with preload=metadata, pause when off-screen.
 */
export default function CaseStudyHero() {
  const { hero } = CASE_STUDY
  const [ready, setReady] = useState(false)

  const onReady = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <header className="cs-hero" aria-labelledby="cs-hero-title">
      <div className="cs-hero__media" aria-hidden="true">
        <img
          className={`cs-hero__poster${ready ? ' is-faded' : ''}`}
          src={hero.poster}
          alt=""
          decoding="async"
        />
        <LazyVideo
          className={`cs-hero__video${ready ? ' is-ready' : ''}`}
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          rootMargin="20% 0px"
          maxConcurrent={0}
          onReady={onReady}
        />
        <div className="cs-hero__veil" />
      </div>

      <div className="cs-hero__inner r-container">
        <FadeUp as="p" className="r-label cs-hero__eyebrow">
          {hero.eyebrow}
        </FadeUp>

        <FadeUp as="h1" id="cs-hero-title" className="cs-hero__title" y={28} delay={0.08}>
          {hero.titleLines.map((line) => {
            const parts = emphasizeLine(line, hero.titleEm)
            return (
              <span key={line} className="cs-hero__title-line">
                {parts.before}
                {parts.em ? <em>{parts.em}</em> : null}
                {parts.after}
              </span>
            )
          })}
        </FadeUp>

        <FadeUp as="p" className="cs-hero__place" delay={0.2} y={20}>
          {hero.place}
        </FadeUp>
      </div>
    </header>
  )
}
