import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  CAPABILITY_LINKS,
  WATER_FEATURE_CATEGORIES,
  getCapabilityPage,
  getCapabilityRelatedLinks,
} from '../data/capabilities'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import GalleryCollage from '../components/GalleryCollage.jsx'
import MultimediaProjectCards from '../components/MultimediaProjectCards.jsx'
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

function sectionHeading(section) {
  if (!section) return null
  if (section.titleBefore) {
    return (
      <>
        {section.titleBefore} <em>{section.titleEm}</em>
      </>
    )
  }
  if (section.id === 'prefab-pools') {
    return (
      <>
        Prefab <em>Pools</em>
      </>
    )
  }
  if (section.id === 'prefab-fountains') {
    return (
      <>
        Prefab <em>Fountains</em>
      </>
    )
  }
  return section.label
}

function sectionIdFromHash(page) {
  if (!page?.sections?.length) return null
  const hash = typeof window !== 'undefined' ? window.location.hash?.slice(1) : ''
  const match = page.sections.find((section) => section.id === hash)
  if (match) return match.id
  if (page.slug === 'prefab-water-features') {
    return page.sections.find((section) => section.id === 'prefab-fountains')?.id ?? page.sections[0].id
  }
  return page.sections[0].id
}

/**
 * Themed rebuild of a legacy capability gallery page.
 * Photos & categories from the old ripplesfountains.com archives.
 */
export default function CapabilityPage({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params.slug
  const page = getCapabilityPage(slug)
  const [collageSectionId, setCollageSectionId] = useState(() => sectionIdFromHash(page))
  const [collageSwitched, setCollageSwitched] = useState(false)

  useEffect(() => {
    const hash = window.location.hash?.slice(1)
    if (hash) {
      const target = document.getElementById(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  useEffect(() => {
    if (
      !page?.sections?.length ||
      (page.slug !== 'prefab-water-features' && page.slug !== 'waterworks-others')
    ) {
      return undefined
    }

    const applyHash = () => {
      setCollageSectionId(sectionIdFromHash(page))
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [page])

  if (!page) return <Navigate to="/" replace />

  const related = getCapabilityRelatedLinks(page.slug)
  const isWaterHub = page.slug === 'water-features'
  const isPrefab = page.slug === 'prefab-water-features'
  const isMultimedia = page.slug === 'multimedia-shows'
  const isArchitectural = page.slug === 'architectural-fountains'
  const isOthers = page.slug === 'waterworks-others'
  const usesCoverflowGallery = isPrefab || isMultimedia || isArchitectural || isOthers
  const isCollageSwitch = isPrefab || isOthers
  const isWaterCategory = WATER_FEATURE_CATEGORIES.some((c) => c.slug === page.slug)
  const collageSection =
    page.sections?.find((section) => section.id === collageSectionId) ?? page.sections?.[0]

  return (
    <div
      key={page.slug}
      className={`interior-page${usesCoverflowGallery ? ' interior-page--prefab' : ''}`}
    >
      <div className="interior-page__atmosphere" aria-hidden="true" />
      <main className="interior-page__main">
        <PageHero
          contentKey={page.slug}
          eyebrow={page.eyebrow}
          title={
            <>
              {page.titleBefore} <em>{page.titleEm}</em>
            </>
          }
          lead={page.lead}
        />

        {isCollageSwitch && collageSection?.gallery?.length > 0 && (
          <section
            className="capability-gallery home-section"
            aria-label={`${collageSection.label} gallery`}
            id={collageSection.id}
          >
            <div className="r-container multimedia-gallery-block">
              <FadeUp as="p" className="r-label">
                Selected work
              </FadeUp>
              <FadeUp as="h2" className="r-display capability-section__title" y={24}>
                <span
                  key={collageSection.id}
                  className={collageSwitched ? 'prefab-switch-title' : undefined}
                >
                  {sectionHeading(collageSection)}
                </span>
              </FadeUp>
              <div
                className={`prefab-switch${page.sections.length > 2 ? ' prefab-switch--many' : ''}`}
                role="tablist"
                aria-label={isPrefab ? 'Prefab type' : 'Other waterworks'}
              >
                {page.sections.map((section) => {
                  const selected = section.id === collageSection.id
                  return (
                    <button
                      key={section.id}
                      type="button"
                      role="tab"
                      className={`prefab-switch__btn${selected ? ' is-active' : ''}`}
                      aria-selected={selected}
                      onClick={() => {
                        if (section.id === collageSection.id) return
                        setCollageSwitched(true)
                        setCollageSectionId(section.id)
                        window.history.replaceState(null, '', `#${section.id}`)
                      }}
                    >
                      {section.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <GalleryCollage
              items={collageSection.gallery}
              label={`${collageSection.label} collage`}
            />
          </section>
        )}

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

        {isMultimedia && page.projects?.length > 0 && (
          <MultimediaProjectCards projects={page.projects} gallery={page.gallery} />
        )}

        {isArchitectural && page.gallery?.length > 0 && (
          <section
            className="capability-gallery home-section"
            aria-label="Architectural gallery"
            id="architectural-gallery"
          >
            <div className="r-container multimedia-gallery-block">
              <FadeUp as="p" className="r-label">
                Selected work
              </FadeUp>
              <FadeUp as="h2" className="r-display capability-section__title" y={24}>
                Built as <em>form</em>
              </FadeUp>
            </div>
            <GalleryCollage items={page.gallery} label="Architectural collage" />
          </section>
        )}

        {!isWaterHub && !usesCoverflowGallery && page.gallery?.length > 0 && (
          <section className="capability-gallery home-section" aria-label={`${page.label} gallery`}>
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                Selected work  {page.gallery.length} frames
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
                {CAPABILITY_LINKS.map((link) => (
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
