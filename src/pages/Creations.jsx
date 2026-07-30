import { useMemo, useState } from 'react'
import { CREATIONS, CREATION_FILTERS } from '../data/creations'
import PageHero from '../components/PageHero.jsx'
import CreationList from '../components/CreationList.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import FadeUp from '../motion/FadeUp'

export default function Creations() {
  const [filter, setFilter] = useState('All')

  const items = useMemo(
    () => (filter === 'All' ? CREATIONS : CREATIONS.filter((c) => c.category === filter)),
    [filter],
  )

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          eyebrow={`Creations — ${CREATIONS.length} selected works`}
          title={
            <>
              Water, <em>staged</em>
            </>
          }
          lead="Fountains, lake shows, and architectural water — each one composed for its place, engineered for its climate, and built in our own workshop."
        />

        <section className="creations-index" aria-label="Project index">
          <div className="r-container">
            <FadeUp className="creations-index__filters" stagger={0.05} y={16}>
              {CREATION_FILTERS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`creations-index__filter${filter === label ? ' is-active' : ''}`}
                  onClick={() => setFilter(label)}
                >
                  {label}
                </button>
              ))}
            </FadeUp>

            <CreationList items={items} key={filter} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
