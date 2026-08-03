import { useEffect, useId, useRef } from 'react'

/**
 * Full-scan lightbox with focus trap, Esc / backdrop close, and prev/next.
 */
export default function PressLightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const clipping = index != null ? items[index] : null

  useEffect(() => {
    if (!clipping) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate(-1)
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(1)
        return
      }

      // Focus trap
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [clipping, onClose, onNavigate])

  if (!clipping) return null

  return (
    <div
      className="press-lightbox"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="press-lightbox__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="press-lightbox__header">
          <div>
            <p className="press-lightbox__pub">{clipping.publication}</p>
            <h2 className="press-lightbox__title" id={titleId}>
              {clipping.headline}
            </h2>
            <time className="press-lightbox__date" dateTime={`${clipping.year}`}>
              {clipping.date}
            </time>
          </div>
          <button
            type="button"
            className="press-lightbox__close"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close clipping viewer"
          >
            ×
          </button>
        </header>

        <div className="press-lightbox__stage">
          <img
            src={clipping.fullImage}
            alt={clipping.alt}
            loading="eager"
            decoding="async"
          />
        </div>

        <footer className="press-lightbox__nav">
          <button
            type="button"
            className="press-lightbox__btn"
            onClick={() => onNavigate(-1)}
            disabled={items.length < 2}
            aria-label="Previous clipping"
          >
            ← Previous
          </button>
          <span className="press-lightbox__count" aria-live="polite">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            className="press-lightbox__btn"
            onClick={() => onNavigate(1)}
            disabled={items.length < 2}
            aria-label="Next clipping"
          >
            Next →
          </button>
        </footer>
      </div>
    </div>
  )
}
