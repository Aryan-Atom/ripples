import { Link } from 'react-router-dom'
import FadeUp from '../../motion/FadeUp'
import CaseStudyHeavyVideo from './CaseStudyHeavyVideo'
import { CASE_STUDY } from '../../data/caseStudy'
import { emphasizeLine } from '../../data/journey'

/** Hero Intro.mp4  stream only while on screen, drop buffer after leave. */
export default function CaseStudyHero({
  hero = CASE_STUDY.hero,
  to,
  links,
  titleId = 'cs-hero-title',
  titleAs = 'h1',
}) {
  const TitleTag = titleAs
  const placeLinks = links ?? (to ? [{ to, place: hero.place }] : null)

  const inner = (
    <div className="cs-hero__inner r-container">
      <FadeUp as="p" className="r-label cs-hero__eyebrow">
        {hero.eyebrow}
      </FadeUp>

      <FadeUp as={TitleTag} id={titleId} className="cs-hero__title" y={28} delay={0.08}>
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

      {placeLinks ? (
        <div className="cs-hero__places">
          {placeLinks.map((item) => (
            <Link key={item.to} to={item.to} className="cs-hero__place-link">
              {item.place}
              <span className="cs-hero__place-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="cs-hero__place">{hero.place}</p>
      )}
    </div>
  )

  return (
    <header className="cs-hero" aria-labelledby={titleId}>
      <CaseStudyHeavyVideo
        src={hero.video}
        poster={hero.poster}
        className="cs-hero__media"
        posterClassName="cs-hero__poster"
        videoClassName="cs-hero__video"
        veilClassName="cs-hero__veil"
        rootMargin="10% 0px"
      />
      {inner}
    </header>
  )
}
