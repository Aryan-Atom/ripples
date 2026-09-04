import FadeUp from '../../motion/FadeUp'
import CaseStudyHeavyVideo from './CaseStudyHeavyVideo'
import { CASE_STUDY } from '../../data/caseStudy'
import { emphasizeLine } from '../../data/journey'

/** Hero Intro.mp4  stream only while on screen, drop buffer after leave. */
export default function CaseStudyHero() {
  const { hero } = CASE_STUDY

  return (
    <header className="cs-hero" aria-labelledby="cs-hero-title">
      <CaseStudyHeavyVideo
        src={hero.video}
        poster={hero.poster}
        className="cs-hero__media"
        posterClassName="cs-hero__poster"
        videoClassName="cs-hero__video"
        veilClassName="cs-hero__veil"
        rootMargin="10% 0px"
      />

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
