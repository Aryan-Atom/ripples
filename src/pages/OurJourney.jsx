import JourneyHero from '../components/journey/JourneyHero'
import BlueprintSection from '../components/journey/BlueprintSection'
import MediaReveal from '../components/journey/MediaReveal'
import ConstructionGallery from '../components/journey/ConstructionGallery'
import FactoryVideoSection from '../components/journey/FactoryVideoSection'
import InstallationSection from '../components/journey/InstallationSection'
import PerformanceSection from '../components/journey/PerformanceSection'
import JourneyTimeline from '../components/journey/JourneyTimeline'
import CounterStats from '../components/journey/CounterStats'
import PhilosophySection from '../components/journey/PhilosophySection'
import JourneyFooter from '../components/journey/JourneyFooter'

/**
 * Our Journey  cinematic chapter scroll through 35 years of Ripples Engineering.
 * Full-bleed 50/50 splits match the documentary reference frames.
 */
export default function OurJourney() {
  return (
    <div className="journey-page">
      <div className="journey-page__atmosphere" aria-hidden="true" />

      <main className="journey-page__main">
        <JourneyHero />
        <BlueprintSection />
        <ConstructionGallery />
        <MediaReveal />
        <FactoryVideoSection />
        <InstallationSection />
        <PerformanceSection />
        <JourneyTimeline />
        <CounterStats />
        <PhilosophySection />
      </main>

      <JourneyFooter />
    </div>
  )
}
