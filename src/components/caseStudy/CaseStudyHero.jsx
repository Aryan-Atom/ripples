import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeUp from '../../motion/FadeUp'
import CaseStudyHeavyVideo from './CaseStudyHeavyVideo'
import { CASE_STUDY } from '../../data/caseStudy'
import { emphasizeLine } from '../../data/journey'

const SLIDE_MS = 2000

function CaseStudyHeroSlideshow({ slides, className, veilClassName }) {
  const rootRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || slides.length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [visible, slides.length])

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      {slides.map((src, i) => (
        <img
          key={src}
          className={`cs-hero__slide${i === index ? ' is-active' : ''}`}
          src={src}
          alt=""
          decoding="async"
        />
      ))}
      {veilClassName ? <div className={veilClassName} /> : null}
    </div>
  )
}

/** Full-bleed case-study opener  video, or a still slideshow when slides are set. */
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
            <Link key={item.to} to={item.to} className="cs-hero__place-row">
              <span className="cs-hero__place">{item.place}</span>
              <span className="cs-hero__more">
                Know More
                <span className="cs-hero__more-arrow" aria-hidden="true">
                  &rarr;
                </span>
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
      {hero.slides?.length ? (
        <CaseStudyHeroSlideshow
          slides={hero.slides}
          className="cs-hero__media"
          veilClassName="cs-hero__veil"
        />
      ) : (
        <CaseStudyHeavyVideo
          src={hero.video}
          poster={hero.poster}
          className="cs-hero__media"
          posterClassName="cs-hero__poster"
          videoClassName="cs-hero__video"
          veilClassName="cs-hero__veil"
          rootMargin="10% 0px"
        />
      )}
      {placeLinks ? <div className="cs-hero__frost" aria-hidden="true" /> : null}
      {inner}
    </header>
  )
}
