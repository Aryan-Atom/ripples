import { forwardRef } from 'react'
import JourneyChapter from './JourneyChapter'
import JourneySpark from './JourneySpark'

/**
 * Full-bleed 50/50 chapter used across the journey redesign.
 * mediaSide: 'left' | 'right'
 */
const SplitPanel = forwardRef(function SplitPanel(
  {
    id,
    className = '',
    mediaSide = 'left',
    media,
    children,
    spark = true,
    ariaLabelledby,
  },
  ref,
) {
  return (
    <JourneyChapter
      ref={ref}
      id={id}
      className={`split-panel split-panel--media-${mediaSide} ${className}`.trim()}
      aria-labelledby={ariaLabelledby}
    >
      <div className="split-panel__media">{media}</div>
      <div className="split-panel__copy">
        <div className="split-panel__copy-inner">{children}</div>
        {spark ? <JourneySpark className="split-panel__spark" /> : null}
      </div>
    </JourneyChapter>
  )
})

export default SplitPanel
