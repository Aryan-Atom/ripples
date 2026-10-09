import { useCallback, useEffect, useRef, useState } from 'react'
import GalleryLightbox from './GalleryLightbox.jsx'
import LazyVideo, { PREV_SECTION_ROOT_MARGIN } from './LazyVideo.jsx'

/** First wave on page open; later waves unlock as the user approaches. */
const BATCH = 3

function ProjectVideo({ src, poster, className, eager, unlocked }) {
  if (!src || !unlocked) {
    return poster ? (
      <img className={className} src={poster} alt="" loading="lazy" decoding="async" />
    ) : null
  }

  return (
    <LazyVideo
      className={className}
      src={src}
      poster={poster}
      eager={eager}
      prefetch={eager}
      rootMargin={PREV_SECTION_ROOT_MARGIN}
      autoPlay
      muted
      loop
      playsInline
    />
  )
}

/** Video project cards — click opens photos with arrow navigation. */
export default function MultimediaProjectCards({ projects }) {
  const [open, setOpen] = useState(null)
  const [unlockedCount, setUnlockedCount] = useState(BATCH)
  const slideRefs = useRef([])

  const close = useCallback(() => setOpen(null), [])
  const setIndex = useCallback((next) => {
    setOpen((prev) => (prev ? { ...prev, index: next } : prev))
  }, [])

  // Unlock the next batch when a slide near the frontier enters (previous-section margin).
  useEffect(() => {
    if (!projects?.length) return undefined

    const observers = []

    projects.forEach((_, i) => {
      const el = slideRefs.current[i]
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          // Approaching slide i → keep at least this batch + the next batch warm.
          const need = Math.ceil((i + 1) / BATCH) * BATCH + BATCH
          setUnlockedCount((prev) => Math.max(prev, Math.min(need, projects.length)))
        },
        { rootMargin: PREV_SECTION_ROOT_MARGIN, threshold: 0.01 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [projects])

  if (!projects?.length) return null

  return (
    <section
      className="multimedia-projects worldwide-showcase worldwide-showcase--compact"
      aria-label="Multimedia projects"
    >
      <div className="worldwide-showcase__slides">
        {projects.map((project, i) => {
          const unlocked = i < unlockedCount
          const eager = i < BATCH

          const openGallery = () => {
            const photos = project.gallery || []
            const lightboxVideo = project.videoCompressed || project.video
            if (!lightboxVideo && !photos.length) return
            const items = []
            if (lightboxVideo) {
              items.push({
                type: 'video',
                title: project.title,
                src: lightboxVideo,
                poster: project.poster || photos[0]?.src,
              })
            }
            items.push(...photos)
            setOpen({ items, index: 0 })
          }

          return (
            <article
              className="worldwide-showcase__slide"
              key={project.id}
              aria-label={project.title}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
            >
              <div className="worldwide-showcase__slide-inner">
                <div className="multimedia-project">
                  <div className="worldwide-showcase__composition">
                    <div className="worldwide-showcase__frame">
                      <ProjectVideo
                        className="worldwide-showcase__video"
                        src={project.video}
                        poster={project.poster}
                        eager={eager}
                        unlocked={unlocked}
                      />
                    </div>

                    <div
                      className={`worldwide-showcase__panel worldwide-showcase__panel--${project.align || 'right'}`}
                    >
                      <div className="worldwide-showcase__card">
                        {project.index ? (
                          <span className="worldwide-showcase__card-index">{project.index}</span>
                        ) : null}
                        <h3 className="worldwide-showcase__card-title">{project.title}</h3>
                        <p className="worldwide-showcase__card-body">{project.description}</p>
                        {project.video || project.gallery?.length ? (
                          <button
                            type="button"
                            className="worldwide-showcase__card-more"
                            onClick={openGallery}
                          >
                            View more
                            <span aria-hidden="true">→</span>
                          </button>
                        ) : (
                          <span className="worldwide-showcase__card-rule" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <GalleryLightbox
        items={open?.items}
        index={open?.index ?? null}
        onClose={close}
        onIndex={setIndex}
      />
    </section>
  )
}
