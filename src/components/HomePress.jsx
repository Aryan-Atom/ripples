import { Link } from 'react-router-dom'
import { PRESS_LOGOS } from '../data/press'
import FadeUp from '../motion/FadeUp'
import SplitLines from '../motion/SplitLines'

/** Homepage “Featured in” — publication names only; full clippings live on /press. */
export default function HomePress() {
  return (
    <section className="home-press home-section" aria-label="Featured in">
      <div className="r-container">
        <header className="home-press__head">
          <div>
            <FadeUp as="p" className="r-label">
              Press &amp; media
            </FadeUp>
            <SplitLines as="h2" className="r-display">
              Featured <em>in.</em>
            </SplitLines>
            <FadeUp as="p" className="r-body home-press__lead" delay={0.15}>
              National and regional coverage of Ripples systems, shows, and craft.
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link className="r-link" to="/press">
              View all coverage <span className="r-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </FadeUp>
        </header>

        <FadeUp as="ul" className="home-press__featured" stagger={0.06} delay={0.1} aria-label="Publications">
          {PRESS_LOGOS.map((logo) => (
            <li className="home-press__featured-item" key={logo.publicationId}>
              {logo.alt}
            </li>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}
