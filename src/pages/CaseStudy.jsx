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
import WGoaStudy from '../components/caseStudy/WGoaStudy'
import ConstructionGallery from '../components/journey/ConstructionGallery'
import JourneyFooter from '../components/journey/JourneyFooter'
import { CASE_STUDY_CHOICES, getCaseStudy } from '../data/caseStudy'

const STUDY_HEROES = Object.fromEntries(CASE_STUDY_CHOICES.map((choice) => [choice.id, choice]))

/**
 * Project case study. Nehru Garden keeps the split-panel stack.
 * W-Goa uses its own process-journal layout.
 */
export default function CaseStudy() {
  const { slug } = useParams()
  const hero = STUDY_HEROES[slug]
  if (!hero) return <Navigate to="/case-study" replace />
  const study = getCaseStudy(slug)
  const isWGoa = slug === 'wow-goa'

  return (
    <div className={`journey-page case-study-page${isWGoa ? ' wgoa-page' : ''}`}>
      <div className="journey-page__atmosphere" aria-hidden="true" />

      <main className="journey-page__main">
        {isWGoa ? (
          <WGoaStudy study={study} />
        ) : (
          <>
            <CaseStudyBrief study={study} />
            <CaseStudyBefore study={study} />
            {study.design?.images?.length > 0 ? <CaseStudyDesign study={study} /> : null}
            <CaseStudyVisualization study={study} />
            {study.fabrication?.items?.length > 0 ? <CaseStudyFabrication study={study} /> : null}
            <ConstructionGallery data={study.construction} />
            <CaseStudyFinale study={study} />
            <CaseStudyFooterCta study={study} />
          </>
        )}
      </main>

      <JourneyFooter />
    </div>
  )
}
