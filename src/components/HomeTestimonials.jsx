import { TESTIMONIALS } from '../data/testimonials'
import FadeUp from '../motion/FadeUp'
import SplitLines from '../motion/SplitLines'

/** Homepage testimonials  editorial quotes from legacy site clients. */
export default function HomeTestimonials() {
  return (
    <section className="home-testimonials home-section" aria-label="Client testimonials">
      <div className="r-container">
        <header className="home-testimonials__head">
          <FadeUp as="p" className="r-label">
            Testimonials
          </FadeUp>
          <SplitLines as="h2" className="r-display">
            What clients <em>say.</em>
          </SplitLines>
          <FadeUp as="p" className="r-body home-testimonials__lead" delay={0.15}>
            Municipalities, parks, and industrial campuses  in their own words.
          </FadeUp>
        </header>

        <div className="home-testimonials__list">
          {TESTIMONIALS.map((item, index) => (
            <FadeUp
              as="blockquote"
              className="home-testimonial"
              key={item.id}
              delay={Math.min(index * 0.06, 0.24)}
              y={32}
            >
              <p className="home-testimonial__quote">{item.quote}</p>
              <footer className="home-testimonial__byline">
                <cite className="home-testimonial__org">{item.org}</cite>
                <span className="home-testimonial__place">{item.place}</span>
              </footer>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
