import { HOME_STATS } from '../data/site'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'
import StatCounter from '../motion/StatCounter'

export default function HomeIntro() {
  return (
    <section className="home-intro home-section" aria-label="About Ripples">
      <div className="home-intro__inner r-container">
        <FadeUp as="p" className="r-label">
          Ripples Engineering — est. 1989
        </FadeUp>

        <SplitLines as="h2" className="home-intro__statement">
          We design, engineer, and manufacture <em>water</em> that performs — every nozzle,
          pump, and note made <em>in-house.</em>
        </SplitLines>

        <div className="home-intro__row">
          <FadeUp as="p" className="home-intro__body r-body" delay={0.15}>
            Among the few companies worldwide that build fountain systems end to end —
            from precision nozzles to multimedia show control — so the show a city
            imagines is the show it gets, for decades.
          </FadeUp>

          <div className="home-intro__stats">
            {HOME_STATS.map((stat) => (
              <FadeUp className="home-intro__stat" key={stat.label} y={28}>
                <StatCounter value={stat.value} className="home-intro__stat-value" />
                <span className="home-intro__stat-label">{stat.label}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
