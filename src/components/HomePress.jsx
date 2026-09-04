import FadeUp from '../motion/FadeUp'
import SplitLines from '../motion/SplitLines'

const FEATURED_PUBLICATIONS = [
  'The Times of India',
  'The Hindu',
  'The Economic Times',
  'Hindustan',
  'Navbharat',
]

/** Homepage “Featured in”  publication names only. */
export default function HomePress() {
  return (
    <section className="home-press home-section" aria-label="Featured in">
      <div className="r-container">
        <header className="home-press__head">
          <FadeUp as="p" className="r-label">
            Press &amp; media
          </FadeUp>
          <SplitLines as="h2" className="r-display">
            Featured <em>in.</em>
          </SplitLines>
          <FadeUp as="p" className="r-body home-press__lead" delay={0.15}>
            Coverage from national and regional publications across India.
          </FadeUp>
        </header>

        <FadeUp as="ul" className="home-press__featured" stagger={0.06} delay={0.1} aria-label="Publications">
          {FEATURED_PUBLICATIONS.map((name) => (
            <li className="home-press__featured-item" key={name}>
              {name}
            </li>
          ))}
        </FadeUp>
      </div>
    </section>
  )
}
