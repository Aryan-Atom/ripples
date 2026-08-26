import { Link } from 'react-router-dom'
import { getCapabilityPage, WATER_FEATURE_CATEGORIES } from '../data/capabilities'
import FadeUp from '../motion/FadeUp'

function GalleryGrid({ items }) {
  if (!items?.length) return null
  return (
    <div className="capability-gallery__grid">
      {items.map((item) => (
        <figure className="capability-shot" key={item.src}>
          <div className="capability-shot__frame">
            <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
          </div>
          <figcaption className="capability-shot__caption">{item.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ExploreHead({ page, as: Tag = 'h2' }) {
  return (
    <div className="multimedia-explore__head">
      <FadeUp as="p" className="r-label">
        {page.eyebrow}
      </FadeUp>
      <FadeUp as={Tag} className="page-hero__title multimedia-explore__title" y={24}>
        <span className="multimedia-explore__title-main">{page.titleBefore}</span>{' '}
        <em>{page.titleEm}</em>
      </FadeUp>
      <FadeUp as="p" className="page-hero__lead" delay={0.08}>
        {page.lead}
      </FadeUp>
      <FadeUp as="p" className="multimedia-explore__body r-body" delay={0.12}>
        {page.body}
      </FadeUp>
    </div>
  )
}

export function WaterFeaturesExplore() {
  const water = getCapabilityPage('water-features')
  if (!water) return null

  return (
    <section
      id="water-features"
      className="multimedia-explore multimedia-explore--lead home-section"
      aria-label="Water features"
    >
      <div className="r-container">
        <FadeUp as="p" className="r-label multimedia-explore__block-label">
          Categories
        </FadeUp>
        <FadeUp className="capability-more__list" stagger={0.06} y={22} delay={0.1}>
          {WATER_FEATURE_CATEGORIES.map((link) => (
            <Link key={link.to} className="capability-more__link" to={link.to}>
              {link.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </FadeUp>

        {water.gallery?.length > 0 && (
          <div className="capability-gallery__wrap multimedia-explore__gallery">
            <FadeUp as="p" className="r-label" delay={0.08}>
              Selected work
            </FadeUp>
            <FadeUp y={32} delay={0.12}>
              <GalleryGrid items={water.gallery} />
            </FadeUp>
            <FadeUp delay={0.18}>
              <Link className="r-link multimedia-explore__more" to="/water-features">
                Full water features gallery <span className="r-link__arrow" aria-hidden="true">→</span>
              </Link>
            </FadeUp>
          </div>
        )}
      </div>
    </section>
  )
}

export function PrefabExplore() {
  const prefab = getCapabilityPage('prefab-water-features')
  if (!prefab) return null

  return (
    <section
      id="prefab-water-features"
      className="multimedia-explore home-section"
      aria-label="Prefab water features"
    >
      <div className="r-container">
        <ExploreHead page={prefab} />

        {prefab.sections?.map((section) => (
          <div className="capability-gallery__wrap multimedia-explore__gallery" key={section.id}>
            <FadeUp as="p" className="r-label">
              {section.label}
            </FadeUp>
            <FadeUp as="h3" className="r-display capability-section__title" y={20} delay={0.06}>
              {section.label === 'Prefab Pools' ? (
                <>
                  Prefab <em>pools</em>
                </>
              ) : (
                <>
                  Prefab <em>fountains</em>
                </>
              )}
            </FadeUp>
            <FadeUp y={28} delay={0.1}>
              <GalleryGrid items={section.gallery.slice(0, 6)} />
            </FadeUp>
          </div>
        ))}

        <FadeUp delay={0.12}>
          <Link className="r-link multimedia-explore__more" to="/prefab-water-features">
            Full prefab gallery <span className="r-link__arrow" aria-hidden="true">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
