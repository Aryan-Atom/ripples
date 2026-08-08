import { memo, useState } from 'react'
import LazyVideo from '../LazyVideo'
import FadeUp from '../../motion/FadeUp'
import JourneySpark from './JourneySpark'
import SectionHeading from './SectionHeading'
import SplitPanel from './SplitPanel'
import { JOURNEY_PERFORMANCE } from '../../data/journey'

function PerformanceSection() {
  const data = JOURNEY_PERFORMANCE
  const [mode, setMode] = useState('day')
  const active = mode === 'day' ? data.day : data.night
  const hasVideo = Boolean(active?.src)

  return (
    <SplitPanel
      id={data.act.id}
      className="performance-act"
      ariaLabelledby="performance-act-title"
      spark={false}
      media={
        <div className="performance-act__media">
          {hasVideo ? (
            <LazyVideo
              key={active.src}
              className="performance-act__video"
              src={active.src}
              autoPlay
              muted
              loop
              playsInline
              maxConcurrent={1}
            />
          ) : (
            <div className="performance-act__placeholder" aria-hidden="true" />
          )}
        </div>
      }
    >
      <div className="performance-act__copy">
        <SectionHeading
          act={data.act}
          titleId="performance-act-title"
          titleLines={data.titleLines}
          titleEm={data.titleEm}
          body={data.body}
        />

        <FadeUp className="performance-act__footer" delay={0.18}>
          <div className="performance-act__toggle" role="group" aria-label="Day or night view">
            {['day', 'night'].map((key) => (
              <button
                key={key}
                type="button"
                className={`performance-act__toggle-btn${mode === key ? ' is-active' : ''}`}
                aria-pressed={mode === key}
                onClick={() => setMode(key)}
              >
                {key === 'day' ? data.day.label : data.night.label}
              </button>
            ))}
          </div>
          <JourneySpark />
        </FadeUp>
      </div>
    </SplitPanel>
  )
}

export default memo(PerformanceSection)
