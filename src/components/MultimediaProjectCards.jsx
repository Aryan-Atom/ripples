import { useCallback, useEffect, useRef, useState } from 'react'
import GalleryLightbox from './GalleryLightbox.jsx'

function CardVideo({ src, poster, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

    const play = () => {
      video.muted = true
      video.play().catch(() => {})
    }

    video.addEventListener('canplay', play)
    play()

    return () => {
      video.removeEventListener('canplay', play)
    }
  }, [src])

  if (!src) {
    return poster ? <img className={className} src={poster} alt="" /> : null
  }

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
    />
  )
}

/** Video project cards  click opens photos with arrow navigation. */
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
        {projects.map((project) => (
          <article className="worldwide-showcase__slide" key={project.id} aria-label={project.title}>
            <div className="worldwide-showcase__slide-inner">
              <div
                className="multimedia-project"
                role="button"
                tabIndex={0}
                onClick={() => {
                  const items = project.gallery
                  if (!items?.length) return
                  setOpen({ items, index: 0 })
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  event.currentTarget.click()
                }}
                aria-label={`View photos of ${project.title}`}
              >
                <div className="worldwide-showcase__composition">
                  <div className="worldwide-showcase__frame">
                    <CardVideo
                      className="worldwide-showcase__video"
                      src={project.video}
                      poster={project.poster}
                    />
                  </div>

                  <div
                    className={`worldwide-showcase__panel worldwide-showcase__panel--${project.align || 'right'}`}
                  >
                    <div className="worldwide-showcase__card">
                      <h3 className="worldwide-showcase__card-title">{project.title}</h3>
                      <p className="worldwide-showcase__card-body">{project.description}</p>
                      <span className="worldwide-showcase__card-rule" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
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
