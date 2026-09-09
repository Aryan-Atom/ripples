import { Link } from 'react-router-dom'
import { FEATURED_CREATION_GROUPS } from '../data/creations'
import CreationList from './CreationList.jsx'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

export default function HomeCreations() {
  return (
    <section className="home-creations home-section" aria-label="Selected creations">
      <div className="r-container">
        <header className="home-creations__head">
          <div>
            <FadeUp as="p" className="r-label">
              Selected creations
            </FadeUp>
            <SplitLines as="h2" className="r-display">
              Water, <em>staged.</em>
            </SplitLines>
          </div>
          <FadeUp delay={0.2}>
            <Link className="r-link" to="/waterworks">
              All WaterWorks <span className="r-link__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </FadeUp>
        </header>

        <CreationList groups={FEATURED_CREATION_GROUPS} />
      </div>
    </section>
  )
}
