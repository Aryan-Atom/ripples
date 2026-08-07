import { Link } from 'react-router-dom'
import {
  PRACTICE_VALUES,
  PRACTICE_PROCESS,
  PRACTICE_CAPABILITIES,
  PRACTICE_IMAGES,
} from '../data/practice'
import { HOME_STATS } from '../data/site'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'
import StatCounter from '../motion/StatCounter'

export default function Practice() {
  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          className="page-hero--practice"
          eyebrow="The practice  est. 1989"
          title={
            <>
              Engineers of <em>wonder</em>
            </>
          }
          lead="Ripples is a workshop before it is a studio. Composers, hydraulic engineers, and machinists share one floor in Noida  and one obsession: water that moves people."
        />

        <section className="practice-values" aria-label="Values">
          <div className="r-container">
            <FadeUp as="p" className="r-label">
              What we hold
            </FadeUp>
            <div className="practice-values__list">
              {PRACTICE_VALUES.map((value, i) => (
                <FadeUp className="practice-value" key={value.index} delay={i * 0.05}>
                  <span className="practice-value__index">{value.index}</span>
                  <h2 className="practice-value__title">{value.title}</h2>
                  <p className="practice-value__body">{value.body}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="practice-facility" aria-label="The facility">
          <FadeUp className="practice-facility__frame" y={0}>
            <img
              src={PRACTICE_IMAGES.facility}
              alt="Placeholder  Ripples manufacturing facility"
              loading="lazy"
              decoding="async"
            />
            <div className="practice-facility__caption">
              <p className="r-label">Noida, India</p>
              <p className="practice-facility__caption-line">
                Where every <em>nozzle</em> is born
              </p>
            </div>
          </FadeUp>
        </section>

        <section className="practice-process" aria-label="Process">
          <div className="r-container">
            <FadeUp as="p" className="r-label">
              How a show is made
            </FadeUp>
            <SplitLines as="h2" className="r-display practice-process__title">
              Five acts, <em>one hand.</em>
            </SplitLines>

            <ol className="practice-process__list">
              {PRACTICE_PROCESS.map((step, i) => (
                <FadeUp as="li" className="practice-step" key={step.index} delay={i * 0.04}>
                  <span className="practice-step__index">{step.index}</span>
                  <div>
                    <h3 className="practice-step__title">{step.title}</h3>
                    <p className="practice-step__body">{step.body}</p>
                  </div>
                </FadeUp>
              ))}
            </ol>
          </div>
        </section>

        <section className="practice-capabilities" aria-label="Capabilities">
          <div className="r-container practice-capabilities__inner">
            <div>
              <FadeUp as="p" className="r-label">
                Capabilities
              </FadeUp>
              <SplitLines as="h2" className="r-display">
                Everything water <em>can do.</em>
              </SplitLines>
              <FadeUp className="practice-capabilities__stats" stagger={0.09} delay={0.15}>
                {HOME_STATS.map((stat) => (
                  <div className="home-intro__stat" key={stat.label}>
                    <StatCounter value={stat.value} className="home-intro__stat-value" />
                    <span className="home-intro__stat-label">{stat.label}</span>
                  </div>
                ))}
              </FadeUp>
            </div>
            <FadeUp as="ul" className="practice-capabilities__list" stagger={0.06}>
              {PRACTICE_CAPABILITIES.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </FadeUp>
          </div>
        </section>

        <section className="practice-cta" aria-label="Start a project">
          <div className="r-container">
            <SplitLines as="p" className="practice-cta__line">
              The next <em>wonder</em> starts with a conversation.
            </SplitLines>
            <FadeUp delay={0.2}>
              <Link className="r-link" to="/contact">
                Get in touch <span className="r-link__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
