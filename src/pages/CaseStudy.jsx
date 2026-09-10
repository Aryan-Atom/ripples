import { Navigate, useParams } from 'react-router-dom'
import {
  CaseStudyBrief,
  CaseStudyBefore,
  CaseStudyDesign,
  CaseStudyFabrication,
  CaseStudyVisualization,
  CaseStudyFooterCta,
} from '../components/caseStudy/CaseStudySections'
import CaseStudyFinale from '../components/caseStudy/CaseStudyFinale'
import MediaReveal from '../components/journey/MediaReveal'
import ConstructionGallery from '../components/journey/ConstructionGallery'
import JourneyFooter from '../components/journey/JourneyFooter'
import { CASE_STUDY, CASE_STUDY_CHOICES } from '../data/caseStudy'

const STUDY_HEROES = Object.fromEntries(CASE_STUDY_CHOICES.map((choice) => [choice.id, choice]))

/**
 * Project case study  brief → result, with kept engineering,
 * construction, and installation chapters.
 */
export default function CaseStudy() {
  const { slug } = useParams()
  const hero = STUDY_HEROES[slug]
  if (!hero) return <Navigate to="/case-study" replace />

  return (
    <div className="journey-page case-study-page">
      <div className="journey-page__atmosphere" aria-hidden="true" />

      <main className="journey-page__main">
        <CaseStudyBrief />
        <CaseStudyBefore />
        <CaseStudyDesign />
        <MediaReveal data={CASE_STUDY.engineering} labelsAside />
        <CaseStudyVisualization />
        <CaseStudyFabrication />
        <ConstructionGallery data={CASE_STUDY.construction} />
        <CaseStudyFinale />
        <CaseStudyFooterCta />
      </main>

      <JourneyFooter />
    </div>
  )
}
