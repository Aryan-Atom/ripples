import { useCallback, useState } from 'react'
import GalleryLightbox from './GalleryLightbox.jsx'
import LazyVideo, { PREV_SECTION_ROOT_MARGIN } from './LazyVideo.jsx'

/** Prefetch the first few cards so the multimedia page starts ready. */
const EAGER_COUNT = 3

/** Video project cards — click opens photos with arrow navigation. */
export default function MultimediaProjectCards({ projects }) {
  const [open, setOpen] = useState(null)

  const close = useCallback(() => setOpen(null), [])
  const setIndex = useCallback((next) => {
    setOpen((prev) => (prev ? { ...prev, index: next } : prev))
  }, [])

  if (!projects?.length) return null

  return (
    <section
      className="multimedia-projects worldwide-showcase worldwide-showcase--compact"
      aria-label="Multimedia projects"
    >
      <div className="worldwide-showcase__slides">
        {projects.map((project, i) => {
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
            <article className="worldwide-showcase__slide" key={project.id} aria-label={project.title}>
              <div className="worldwide-showcase__slide-inner">
                <div className="multimedia-project">
                  <div className="worldwide-showcase__composition">
                    <div className="worldwide-showcase__frame">
                      {project.video ? (
                        <LazyVideo
                          className="worldwide-showcase__video"
                          src={project.video}
                          poster={project.poster}
                          prefetch={i < EAGER_COUNT}
                          rootMargin={PREV_SECTION_ROOT_MARGIN}
                          maxConcurrent={2}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : project.poster ? (
                        <img
                          className="worldwide-showcase__video"
                          src={project.poster}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
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
