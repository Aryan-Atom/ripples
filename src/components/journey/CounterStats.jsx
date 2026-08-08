import FadeUp from '../../motion/FadeUp'
import StatCounter from '../../motion/StatCounter'
import JourneyChapter from './JourneyChapter'
import { JOURNEY_STATS } from '../../data/journey'

export default function CounterStats() {
  return (
    <JourneyChapter id="numbers" className="journey-stats" aria-label="By the numbers">
      <div className="r-container">
        <FadeUp as="p" className="r-label">
          By the numbers
        </FadeUp>
        <ul className="journey-stats__grid">
          {JOURNEY_STATS.map((stat, i) => (
            <FadeUp as="li" className="journey-stats__item" key={stat.label} delay={i * 0.06}>
              <StatCounter value={stat.value} className="journey-stats__value r-stat" />
              <span className="journey-stats__label">{stat.label}</span>
            </FadeUp>
          ))}
        </ul>
      </div>
    </JourneyChapter>
  )
}
