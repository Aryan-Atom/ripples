import FadeUp from '../motion/FadeUp'
import JourneyTimeline from '../components/journey/JourneyTimeline'
import JourneyFooter from '../components/journey/JourneyFooter'
import BlueprintGrid from '../components/journey/BlueprintGrid'

/**
 * Company journey stub  hosts the full un-condensed timeline pulled off
 * the Nehru Garden case study page.
 */
export default function Journey() {
  return (
    <div className="journey-page">
      <div className="journey-page__atmosphere" aria-hidden="true" />

      <main className="journey-page__main">
        <header className="journey-stub-hero" aria-labelledby="journey-stub-title">
          <BlueprintGrid className="journey-stub-hero__grid" particleCount={16} />
          <div className="journey-stub-hero__inner r-container">
            <FadeUp as="p" className="r-label">
              Company journey
            </FadeUp>
            <FadeUp as="h1" id="journey-stub-title" className="journey-stub-hero__title" y={24}>
              35 years of <em>engineering</em> excellence
            </FadeUp>
            <FadeUp as="p" className="journey-stub-hero__lead" delay={0.1} y={18}>
              From the first workshop to projects worldwide  the Ripples timeline, told as it
              was built.
            </FadeUp>
          </div>
        </header>

        <JourneyTimeline />
      </main>

      <JourneyFooter />
    </div>
  )
}
