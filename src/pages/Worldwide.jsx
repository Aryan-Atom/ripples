import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter.jsx'
import WorldwideHero from '../components/WorldwideHero.jsx'
import WorldwideShowcase from '../components/WorldwideShowcase.jsx'
import GalleryCollage from '../components/GalleryCollage.jsx'
import TextMarquee from '../components/TextMarquee.jsx'
import {
  WORLDWIDE_CITIES,
  WORLDWIDE_COLLAGE,
  WORLDWIDE_EVENTS,
  WORLDWIDE_PROJECTS,
  prefetchWorldCountries,
} from '../data/worldwide'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

prefetchWorldCountries()

export default function Worldwide() {
  return (
    <div className="worldwide-page">
      <div className="worldwide-page__atmosphere" aria-hidden="true" />
      <main className="worldwide-page__main">
        <WorldwideHero />

        <WorldwideShowcase
          items={WORLDWIDE_EVENTS}
          label="Events"
          title={
            <>
              Events that move <em>Water</em> and crowds.
            </>
          }
          lead="Landmark launches, civic unveilings, and industry showcases  each engineered for its climate, audience, and skyline."
          ariaLabel="Worldwide events"
        />

        <WorldwideShowcase
          items={WORLDWIDE_PROJECTS}
          label="Projects"
          title={
            <>
              Projects delivered <em>Worldwide.</em>
            </>
          }
          lead="Permanent installations built for campuses, civic plazas, and destinations  across Abu Dhabi, Dubai, and beyond."
          ariaLabel="Worldwide projects"
          compact
          variant="projects"
        />

        {WORLDWIDE_COLLAGE.length > 0 ? (
          <section
            className="worldwide-collage capability-gallery home-section"
            aria-label="Worldwide project collage"
          >
            <div className="r-container multimedia-gallery-block worldwide-collage__intro">
              <FadeUp as="p" className="r-label">
                Across the map
              </FadeUp>
              <FadeUp as="h2" className="r-display worldwide-collage__title" y={24}>
                Water features across the <em>World.</em>
              </FadeUp>
            </div>
            <GalleryCollage items={WORLDWIDE_COLLAGE} label="Worldwide collage" />
          </section>
        ) : null}

        <div className="worldwide-cities" aria-hidden="true">
          <TextMarquee items={WORLDWIDE_CITIES.slice(0, 6)} />
          <TextMarquee items={WORLDWIDE_CITIES.slice(6)} reverse />
        </div>

        <section className="worldwide-cta" aria-label="Start a project">
          <div className="r-container">
            <SplitLines as="p" className="practice-cta__line">
              Your city could be <em>Next.</em>
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
