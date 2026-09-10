import CaseStudyHero from '../components/caseStudy/CaseStudyHero'
import { CASE_STUDY_CHOICES } from '../data/caseStudy'

/** Two full-viewport case study cards. Click one to open that story. */
export default function CaseStudyIndex() {
  return (
    <div className="journey-page case-study-page case-study-index">
      <div className="journey-page__atmosphere" aria-hidden="true" />
      <main className="journey-page__main case-study-index__main">
        {CASE_STUDY_CHOICES.map((hero, index) => (
          <CaseStudyHero
            key={hero.id}
            hero={hero}
            to={hero.to}
            titleId={`cs-choice-${hero.id}`}
            titleAs={index === 0 ? 'h1' : 'h2'}
          />
        ))}
      </main>
    </div>
  )
}
