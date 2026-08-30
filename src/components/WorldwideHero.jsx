import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'
import WorldwideGlobe from './WorldwideGlobe.jsx'

/** Absolute background layer  never affects hero layout flow. */
function WorldwideGlobeAmbient() {
  return (
    <div className="worldwide-hero__globe-ambient" aria-hidden="true">
      <div className="worldwide-hero__globe-stat">
        <span className="worldwide-hero__globe-stat-value">30+</span>
        <span className="worldwide-hero__globe-stat-label">Countries</span>
      </div>
      <WorldwideGlobe variant="ambient" />
    </div>
  )
}

export default function WorldwideHero() {
  return (
    <section className="worldwide-hero" aria-labelledby="worldwide-hero-title">
      <WorldwideGlobeAmbient />

      <div className="worldwide-hero__inner r-container">
        <div className="worldwide-hero__copy">
          <SplitLines as="h1" id="worldwide-hero-title" className="worldwide-hero__title">
            Experiences delivered <em>worldwide.</em>
          </SplitLines>
          <FadeUp as="p" className="worldwide-hero__lead" delay={0.08}>
            Building iconic fountain experiences across continents  from civic
            plazas to landmark destinations worldwide.
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
