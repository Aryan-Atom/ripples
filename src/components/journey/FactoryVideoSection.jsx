import { memo } from 'react'
import LazyVideo from '../LazyVideo'
import FadeUp from '../../motion/FadeUp'
import JourneyChapter from './JourneyChapter'
import SectionHeading from './SectionHeading'
import { JOURNEY_MANUFACTURING } from '../../data/journey'

function FactoryVideoSection() {
  const data = JOURNEY_MANUFACTURING

  return (
    <JourneyChapter
      id={data.act.id}
      className="factory-videos"
      aria-labelledby="manufacturing-act-title"
    >
      <div className="r-container">
        <SectionHeading
          act={data.act}
          titleLines={data.titleLines}
          titleEm={data.titleEm}
          body={data.body}
        />

        <div className="factory-videos__grid">
          {data.videos.map((video, i) => (
            <FadeUp
              key={video.src}
              className={`factory-videos__card factory-videos__card--${i + 1}`}
              delay={i * 0.06}
              y={32}
            >
              <div className="factory-videos__frame">
                <LazyVideo
                  className="factory-videos__video"
                  src={video.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  maxConcurrent={1}
                  loadDelay={i * 120}
                />
              </div>
              <p className="factory-videos__caption r-label">{video.caption}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </JourneyChapter>
  )
}

export default memo(FactoryVideoSection)
