import { useCallback, useMemo, useState } from 'react'
import {
  PRESS_CLIPPINGS,
  PRESS_PUBLICATIONS,
  PRESS_YEARS,
} from '../data/press'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import FadeUp from '../motion/FadeUp'
import PressFilters from '../components/press/PressFilters'
import PressGrid from '../components/press/PressGrid'
import PressLightbox from '../components/press/PressLightbox'
/** Full press gallery with filters and lightbox  scans from legacy press archive. */
export default function Press() {
  const [publicationFilter, setPublicationFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(null)

  const filtered = useMemo(() => {
    return PRESS_CLIPPINGS.filter((item) => {
      const pubOk = publicationFilter === 'all' || item.publicationId === publicationFilter
      const yearOk = yearFilter === 'all' || !PRESS_YEARS.length || item.year === yearFilter
      return pubOk && yearOk
    })
  }, [publicationFilter, yearFilter])

  const openClipping = useCallback(
    (clipping) => {
      const index = filtered.findIndex((item) => item.id === clipping.id)
      setActiveIndex(index >= 0 ? index : 0)
    },
    [filtered],
  )

  const navigate = useCallback(
    (delta) => {
      setActiveIndex((current) => {
        if (current == null || !filtered.length) return current
        return (current + delta + filtered.length) % filtered.length
      })
    },
    [filtered],
  )

  const onPublicationChange = (value) => {
    setPublicationFilter(value)
    setActiveIndex(null)
  }
  const onYearChange = (value) => {
    setYearFilter(value)
    setActiveIndex(null)
  }

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          eyebrow="Press & media"
          title={
            <>
              In the <em>news</em>
            </>
          }
          lead="Newspaper features and media coverage of Ripples Engineering  systems, shows, and the workshop behind them."
        />

        <section className="press-page" aria-label="Press clippings">
          <div className="r-container">
            <FadeUp>
              <PressFilters
                publications={PRESS_PUBLICATIONS}
                years={PRESS_YEARS}
                publicationFilter={publicationFilter}
                yearFilter={yearFilter}
                onPublicationChange={onPublicationChange}
                onYearChange={onYearChange}
              />
            </FadeUp>

            <p className="press-page__count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'clipping' : 'clippings'}
            </p>

            <PressGrid items={filtered} onOpen={openClipping} />
          </div>
        </section>
      </main>

      <SiteFooter />

      <PressLightbox
        items={filtered}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={navigate}
      />
    </div>
  )
}
