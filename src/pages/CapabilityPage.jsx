import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  CAPABILITY_LINKS,
  WATER_FEATURE_CATEGORIES,
  getCapabilityPage,
  getCapabilityRelatedLinks,
} from '../data/capabilities'
import PageHero from '../components/PageHero.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import GalleryCoverflow from '../components/GalleryCoverflow.jsx'
import VideoCard from '../VideoShowcase/VideoCard.jsx'
import useHoverVideo from '../VideoShowcase/useHoverVideo.js'
import '../VideoShowcase/VideoShowcase.css'
import FadeUp from '../motion/FadeUp'

/** Prefab / Multimedia: first few as coverflow cards, the rest in the normal grid. */
const COVERFLOW_COUNT = 5

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

function MixedSectionGallery({ items, label }) {
  if (!items?.length) return null

  const coverCount = Math.min(COVERFLOW_COUNT, items.length)
  const coverItems = items.slice(0, coverCount)
  const gridItems = items.length > coverCount ? items.slice(coverCount) : []

  return (
    <div className="prefab-gallery-mix">
      {/* Keep media outside FadeUp so ScrollReveal can't leave photos at opacity 0 */}
      <div className="prefab-gallery-mix__coverflow">
        <GalleryCoverflow items={coverItems} label={`${label} cards`} />
      </div>
      {gridItems.length > 0 && (
        <div className="capability-gallery__wrap prefab-gallery-mix__grid">
          <p className="r-label prefab-gallery-mix__grid-label">More from this set</p>
          <GalleryGrid items={gridItems} />
        </div>
      )}
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
  const { activeId, setActive, clearActive } = useHoverVideo()

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

  if (!page) return <Navigate to="/" replace />

  const related = getCapabilityRelatedLinks(page.slug)
  const isWaterHub = page.slug === 'water-features'
  const isPrefab = page.slug === 'prefab-water-features'
  const isMultimedia = page.slug === 'multimedia-shows'
  const isArchitectural = page.slug === 'architectural-fountains'
  const isOthers = page.slug === 'waterworks-others'
  const usesCoverflowGallery = isPrefab || isMultimedia || isArchitectural || isOthers
  const showreel = isMultimedia ? page.showreel : null
  const sectionedGalleries = isPrefab || isOthers
  const isWaterCategory = WATER_FEATURE_CATEGORIES.some((c) => c.slug === page.slug)
  const isWaterworksCategory = [
    'multimedia-shows',
    'architectural-fountains',
    'prefab-water-features',
    'waterworks-others',
  ].includes(page.slug)

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

        <section className="capability-intro home-section" aria-label="Overview">
          <div className="r-container capability-intro__inner">
            <FadeUp as="p" className="capability-intro__body r-body">
              {page.body}
            </FadeUp>

            {isWaterworksCategory && (
              <FadeUp delay={0.1}>
                <Link className="r-link capability-back" to="/waterworks">
                  ← All WaterWorks
                </Link>
              </FadeUp>
            )}
            {isWaterCategory && !isWaterworksCategory && (
              <FadeUp delay={0.1}>
                <Link className="r-link capability-back" to="/waterworks">
                  ← All WaterWorks
                </Link>
              </FadeUp>
            )}
          </div>
        </section>

        {isOthers && page.sections?.length > 0 && (
          <section className="others-toc home-section" aria-label="Browse categories">
            <div className="r-container">
              <FadeUp
                as="ul"
                className="others-toc__featured"
                stagger={0.05}
                delay={0.06}
                aria-label="Collections"
              >
                {page.sections.map((section) => (
                  <li className="others-toc__featured-item" key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </FadeUp>
            </div>
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

        {sectionedGalleries &&
          page.sections?.map((section) => (
            <section
              className={`capability-gallery home-section${isOthers ? ' others-gallery-section' : ''}`}
              aria-label={section.label}
              key={section.id}
              id={section.id}
            >
              <div className="r-container multimedia-gallery-block">
                <FadeUp as="p" className="r-label">
                  {section.label}
                </FadeUp>
                <FadeUp as="h2" className="r-display capability-section__title" y={24}>
                  {section.titleBefore ? (
                    <>
                      {section.titleBefore} <em>{section.titleEm}</em>
                    </>
                  ) : section.label === 'Prefab Pools' ? (
                    <>
                      Prefab <em>pools</em>
                    </>
                  ) : (
                    <>
                      Prefab <em>fountains</em>
                    </>
                  )}
                </FadeUp>
                <MixedSectionGallery items={section.gallery} label={section.label} />
              </div>
            </section>
          ))}

        {showreel?.src && (
          <section
            className="capability-gallery home-section multimedia-video-section"
            aria-label="Multimedia showreel"
            id="multimedia-showreel"
          >
            <div className="r-container">
              <FadeUp as="p" className="r-label">
                In motion
              </FadeUp>
              <FadeUp as="h2" className="r-display capability-section__title" y={24}>
                Nightly <em>performance</em>
              </FadeUp>
              <div className="multimedia-video-section__grid">
                <VideoCard
                  id="multimedia-bhopal-musical"
                  poster={showreel.poster}
                  video={showreel.src}
                  title={showreel.caption || 'Bhopal Musical'}
                  category="Multimedia Show"
                  className="video-card__span-hero multimedia-video-section__card"
                  isActive={activeId === 'multimedia-bhopal-musical'}
                  isDimmed={false}
                  onHoverStart={setActive}
                  onHoverEnd={clearActive}
                  playCue
                  allowUnmute
                />
              </div>
            </div>
          </section>
        )}

        {isMultimedia && page.gallery?.length > 0 && (
          <section
            className="capability-gallery home-section"
            aria-label="Multimedia gallery"
            id="multimedia-gallery"
          >
            <div className="r-container multimedia-gallery-block">
              <FadeUp as="p" className="r-label">
                Selected shows
              </FadeUp>
              <FadeUp as="h2" className="r-display capability-section__title" y={24}>
                Nightly <em>spectacles</em>
              </FadeUp>
              <MixedSectionGallery items={page.gallery} label="Multimedia" />
            </div>
          </section>
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
              <MixedSectionGallery items={page.gallery} label="Architectural" />
            </div>
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
