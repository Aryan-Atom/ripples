import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import WorldwideHero from '../components/WorldwideHero.jsx'
import WorldwideShowcase from '../components/WorldwideShowcase.jsx'
import TextMarquee from '../components/TextMarquee.jsx'
import { WORLDWIDE_REGIONS, WORLDWIDE_CITIES, prefetchWorldCountries } from '../data/worldwide'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

prefetchWorldCountries()

export default function Worldwide() {
  return (
    <div className="worldwide-page">
      <div className="worldwide-page__atmosphere" aria-hidden="true" />
      <main className="worldwide-page__main">
        <WorldwideHero />
        <WorldwideShowcase />

        <section className="worldwide-regions" aria-label="Regional presence">
          <div className="r-container">
            <FadeUp as="p" className="r-label">
              Where the water moves
            </FadeUp>
            <SplitLines as="h2" className="r-display worldwide-regions__title">
              Six continents, <em>one workshop.</em>
            </SplitLines>

            <div className="worldwide-regions__list">
              {WORLDWIDE_REGIONS.map((region, i) => (
                <FadeUp className="worldwide-region" key={region.index} delay={i * 0.04}>
                  <span className="worldwide-region__index">{region.index}</span>
                  <h3 className="worldwide-region__name">{region.name}</h3>
                  <div className="worldwide-region__detail">
                    <span className="worldwide-region__countries">{region.countries}</span>
                    <p className="worldwide-region__note">{region.note}</p>
                  </div>
                  <span className="worldwide-region__projects">{region.projects}</span>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="worldwide-cities" aria-hidden="true">
          <TextMarquee items={WORLDWIDE_CITIES.slice(0, 6)} />
          <TextMarquee items={WORLDWIDE_CITIES.slice(6)} reverse />
        </div>

        <section className="worldwide-cta" aria-label="Start a project">
          <div className="r-container">
            <SplitLines as="p" className="practice-cta__line">
              Your city could be <em>next.</em>
            </SplitLines>
            <FadeUp delay={0.2}>
              <Link className="r-link" to="/contact">
                Start a conversation <span className="r-link__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
