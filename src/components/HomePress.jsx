import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED_PRESS } from '../data/press'
import FadeUp from '../motion/FadeUp'
import SplitLines from '../motion/SplitLines'
import PressGrid from './press/PressGrid'
import PressLightbox from './press/PressLightbox'
import PressLogoStrip from './press/PressLogoStrip'

/** Homepage “In the News” teaser — featured clippings + link to full gallery. */
export default function HomePress() {
  const [activeIndex, setActiveIndex] = useState(null)

  const openClipping = useCallback((clipping) => {
    const index = FEATURED_PRESS.findIndex((item) => item.id === clipping.id)
    setActiveIndex(index >= 0 ? index : 0)
  }, [])

  const navigate = useCallback((delta) => {
    setActiveIndex((current) => {
      if (current == null || !FEATURED_PRESS.length) return current
      return (current + delta + FEATURED_PRESS.length) % FEATURED_PRESS.length
    })
  }, [])

  return (
    <section className="home-press home-section" aria-label="In the news">
      <div className="r-container">
        <header className="home-press__head">
          <div>
            <FadeUp as="p" className="r-label" y={18} duration={0.9}>
              Press &amp; media
            </FadeUp>
            <SplitLines as="h2" className="r-display">
              In the <em>news.</em>
            </SplitLines>
            <FadeUp as="p" className="r-body home-press__lead" delay={0.15}>
              Coverage of the systems, shows, and craft behind Ripples — from national dailies
              to regional press.
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link className="r-link" to="/press">
              View all coverage <span className="r-link__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </FadeUp>
        </header>

        <FadeUp className="home-press__logos" delay={0.1}>
          <PressLogoStrip />
        </FadeUp>

        <FadeUp delay={0.15}>
          <PressGrid items={FEATURED_PRESS} onOpen={openClipping} />
        </FadeUp>

        <FadeUp className="home-press__footer" delay={0.2}>
          <Link className="press-all-btn" to="/press">
            View all coverage <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>
      </div>

      <PressLightbox
        items={FEATURED_PRESS}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={navigate}
      />
    </section>
  )
}
