import { Link } from 'react-router-dom'
import { WORLDWIDE_CITIES } from '../data/worldwide'
import TextMarquee from './TextMarquee.jsx'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

export default function HomeWorldwide() {
  return (
    <section className="home-worldwide home-section" aria-label="Worldwide presence">
      <div className="r-container home-worldwide__head">
        <FadeUp as="p" className="r-label" y={18} duration={0.9}>
          Worldwide
        </FadeUp>
        <SplitLines as="h2" className="r-display">
          From India, <em>to the world.</em>
        </SplitLines>
        <FadeUp as="p" className="r-body home-worldwide__body" delay={0.15}>
          Thirty countries, six continents, one workshop. Every system ships from our
          own factory floor and arrives with the team that built it.
        </FadeUp>
        <FadeUp delay={0.25}>
          <Link className="r-link" to="/worldwide">
            Explore the globe <span className="r-link__arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </FadeUp>
      </div>

      <div className="home-worldwide__marquees" aria-hidden="true">
        <TextMarquee items={WORLDWIDE_CITIES.slice(0, 6)} />
        <TextMarquee items={WORLDWIDE_CITIES.slice(6)} reverse />
      </div>
    </section>
  )
}
