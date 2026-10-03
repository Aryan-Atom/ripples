import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function stepIndex(index, length, direction) {
  if (!length) return 0
  return (index + direction + length) % length
}

function isVideoItem(item) {
  if (!item) return false
  if (item.type === 'video') return true
  return /\.(mp4|webm|mov)(\?|$)/i.test(String(item.src || ''))
}

/** Full-screen media viewer. Esc / arrows / backdrop / ×. Supports images + video (with audio). */
export default function GalleryLightbox({ items, index, onClose, onIndex }) {
  const current = index != null ? items?.[index] : null
  const onCloseRef = useRef(onClose)
  const onIndexRef = useRef(onIndex)
  const videoRef = useRef(null)
  onCloseRef.current = onClose
  onIndexRef.current = onIndex

  const count = items?.length ?? 0
  const showArrows = count > 1
  const showingVideo = isVideoItem(current)

  useEffect(() => {
    if (index == null || !current) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') onCloseRef.current()
      if (!count) return
      if (event.key === 'ArrowRight') onIndexRef.current(stepIndex(index, count, 1))
      if (event.key === 'ArrowLeft') onIndexRef.current(stepIndex(index, count, -1))
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, count, current])

  useEffect(() => {
    const video = videoRef.current
    if (!showingVideo || !video) return undefined

    video.muted = false
    video.defaultMuted = false
    video.removeAttribute('muted')
    const play = video.play()
    if (play?.catch) play.catch(() => {})

    return () => {
      video.pause()
    }
  }, [showingVideo, current?.src, index])

  if (index == null || !current) return null

  const go = (direction) => (event) => {
    event.stopPropagation()
    onIndex(stepIndex(index, count, direction))
  }

  return createPortal(
    <div
      className={`gallery-lightbox${showArrows ? ' gallery-lightbox--nav' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={current.title || (showingVideo ? 'Video' : 'Photograph')}
      onClick={onClose}
    >
      <button
        type="button"
        className="gallery-lightbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      {showArrows && (
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={go(-1)}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}

      <figure className="gallery-lightbox__frame" onClick={(event) => event.stopPropagation()}>
        {showingVideo ? (
          <video
            key={current.src}
            ref={videoRef}
            className="gallery-lightbox__video"
            src={current.src}
            poster={current.poster || undefined}
            controls
            playsInline
            preload="auto"
          />
        ) : (
          <img src={current.src} alt={current.title || ''} />
        )}
        <figcaption className="gallery-lightbox__caption">
          <span>
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          {current.title}
        </figcaption>
      </figure>

      {showArrows && (
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={go(1)}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>,
    document.body,
  )
}
