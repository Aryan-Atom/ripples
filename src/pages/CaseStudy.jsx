import CaseStudyHero from '../components/caseStudy/CaseStudyHero'
import {
  CaseStudyBrief,
  CaseStudyBefore,
  CaseStudyDesign,
  CaseStudyDrawing,
  CaseStudyFabrication,
  CaseStudyVisualization,
  CaseStudyResult,
  CaseStudyFooterCta,
} from '../components/caseStudy/CaseStudySections'
import MediaReveal from '../components/journey/MediaReveal'
import ConstructionGallery from '../components/journey/ConstructionGallery'
import InstallationSection from '../components/journey/InstallationSection'
import JourneyFooter from '../components/journey/JourneyFooter'
import { CASE_STUDY } from '../data/caseStudy'

/**
 * Nehru Garden project case study  brief → result, with kept engineering,
 * construction, and installation chapters.
 */
export default function CaseStudy() {
  return (
    <div className="journey-page case-study-page">
      <div className="journey-page__atmosphere" aria-hidden="true" />

      <main className="journey-page__main">
        <CaseStudyHero />
        <CaseStudyBrief />
        <CaseStudyBefore />
        <CaseStudyDesign />
        <CaseStudyDrawing />
        <MediaReveal data={CASE_STUDY.engineering} labelsAside />
        <CaseStudyFabrication />
        <ConstructionGallery data={CASE_STUDY.construction} />
        <CaseStudyVisualization />
        <InstallationSection data={CASE_STUDY.installation} />
        <CaseStudyResult />
        <CaseStudyFooterCta />
      </main>

      <JourneyFooter />
    </div>
  )
}
