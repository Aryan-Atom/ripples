import { lazy, Suspense } from 'react'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

const WorldwideGlobe = lazy(() => import('./WorldwideGlobe.jsx'))

export default function WorldwideHero() {
  return (
    <section className="worldwide-hero" aria-labelledby="worldwide-hero-title">
      <div className="worldwide-hero__inner">
        <div className="worldwide-hero__copy">
          <SplitLines as="h1" id="worldwide-hero-title" className="worldwide-hero__title">
            Experiences delivered <em>worldwide.</em>
          </SplitLines>
          <FadeUp as="p" className="worldwide-hero__lead" delay={0.3}>
            Building iconic fountain experiences across continents — from civic
            plazas to landmark destinations worldwide.
          </FadeUp>
        </div>

        <div className="worldwide-hero__globe-wrap">
          <div className="worldwide-hero__globe-glow" aria-hidden="true" />
          <Suspense fallback={<div className="worldwide-globe worldwide-globe--placeholder" />}>
            <WorldwideGlobe />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
