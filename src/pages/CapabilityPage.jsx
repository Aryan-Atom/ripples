import { Link, Navigate, useParams } from 'react-router-dom'
import {
  CAPABILITY_LINKS,
  WATER_FEATURE_CATEGORIES,
  getCapabilityPage,
  getCapabilityRelatedLinks,
} from '../data/capabilities'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
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

/**
 * Themed rebuild of a legacy capability gallery page.
 * Photos & categories from the old ripplesfountains.com archives.
 */
export default function CapabilityPage({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params.slug
  const page = getCapabilityPage(slug)

  if (!page) return <Navigate to="/" replace />

  const related = getCapabilityRelatedLinks(page.slug)
  const isWaterHub = page.slug === 'water-features'
  const isPrefab = page.slug === 'prefab-water-features'
  const isWaterCategory = WATER_FEATURE_CATEGORIES.some((c) => c.slug === page.slug)

  return (
    <div className="interior-page">
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          eyebrow={page.eyebrow}
          title={
            <>
              {page.titleBefore} <em>{page.titleEm}</em>
            </>
          }
          lead={page.lead}
        />

        <section className="capability-intro home-section" aria-label="Overview">
          <div className="r-container capability-intro__inner">
            <FadeUp as="p" className="capability-intro__body r-body">
              {page.body}
            </FadeUp>

            {isWaterCategory && (
              <FadeUp delay={0.1}>
                <Link className="r-link capability-back" to="/water-features">
                  ← All water features
                </Link>
              </FadeUp>
            )}
          </div>
        </section>

        {isWaterHub && (
          <section className="capability-categories home-section" aria-label="Water feature categories">
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                Categories
              </FadeUp>
              <FadeUp className="capability-more__list" stagger={0.06} y={22}>
                {WATER_FEATURE_CATEGORIES.map((link) => (
                  <Link key={link.to} className="capability-more__link" to={link.to}>
                    {link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </FadeUp>
            </div>
          </section>
        )}

        {isPrefab &&
          page.sections?.map((section) => (
            <section
              className="capability-gallery home-section"
              aria-label={section.label}
              key={section.id}
              id={section.id}
            >
              <div className="r-container">
                <FadeUp as="p" className="r-label">
                  {section.label}
                </FadeUp>
                <FadeUp as="h2" className="r-display capability-section__title" y={24}>
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
                <p className="capability-section__count r-body">
                  {section.gallery.length} frames
                </p>
                <FadeUp className="capability-gallery__wrap" y={32} delay={0.08}>
                  <GalleryGrid items={section.gallery} />
                </FadeUp>
              </div>
            </section>
          ))}

        {!isWaterHub && !isPrefab && page.gallery?.length > 0 && (
          <section className="capability-gallery home-section" aria-label={`${page.label} gallery`}>
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                Selected work — {page.gallery.length} frames
              </FadeUp>
              <FadeUp className="capability-gallery__wrap" y={32} delay={0.08}>
                <GalleryGrid items={page.gallery} />
              </FadeUp>
            </div>
          </section>
        )}

        {related.length > 0 && !isWaterHub && (
          <section className="capability-more home-section" aria-label="More capabilities">
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                {isWaterCategory ? 'More water features' : 'Also explore'}
              </FadeUp>
              <FadeUp className="capability-more__list" stagger={0.06} y={22}>
                {related.map((link) => (
                  <Link key={link.to} className="capability-more__link" to={link.to}>
                    {link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </FadeUp>
            </div>
          </section>
        )}

        {isWaterHub && (
          <section className="capability-more home-section" aria-label="More capabilities">
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                Also explore
              </FadeUp>
              <FadeUp className="capability-more__list" stagger={0.06} y={22}>
                {CAPABILITY_LINKS.filter((link) => link.to !== '/water-features').map((link) => (
                  <Link key={link.to} className="capability-more__link" to={link.to}>
                    {link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </FadeUp>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
