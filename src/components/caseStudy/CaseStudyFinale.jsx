import { CASE_STUDY } from '../../data/caseStudy'
import { CaseStudyInstallation, CaseStudyResult } from './CaseStudySections'

/** Installation gallery → final output, Case Study only. */
export default function CaseStudyFinale({ study = CASE_STUDY }) {
  return (
    <div className="cs-finale">
      <CaseStudyInstallation study={study} />
      <CaseStudyResult study={study} />
    </div>
  )
}
