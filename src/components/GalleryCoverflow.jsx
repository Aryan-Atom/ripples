import { useCallback, useEffect, useState } from 'react'

/**
 * Coverflow-style photo cards  center featured, neighbors peek beside it.
 * Theme-matched for Ripples (dark glass cards, soft accent).
 */
export default function GalleryCoverflow({ items, label = 'Gallery' }) {
  const [active, setActive] = useState(0)
  const count = items?.length ?? 0

  const go = useCallback(
    (dir) => {
      if (count < 2) return
      setActive((i) => (i + dir + count) % count)
    },
    [count],
  )

  useEffect(() => {
    setActive(0)
  }, [items])

  useEffect(() => {
    if (count < 2) return undefined
    const onKey = (event) => {
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, count])

  if (!count) return null

  return (
    <div className="gallery-coverflow" aria-roledescription="carousel" aria-label={label}>
      <div className="gallery-coverflow__viewport">
        {count > 1 && (
          <button
            type="button"
            className="gallery-coverflow__btn gallery-coverflow__btn--prev"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        <div className="gallery-coverflow__stage">
          {items.map((item, index) => {
            let offset = index - active
            // Wrap offsets for a circular feel when there are enough cards
            if (count > 2) {
              if (offset > count / 2) offset -= count
              if (offset < -count / 2) offset += count
            }
            const abs = Math.abs(offset)
            const visible = abs <= 2
            const sideOpacity = offset === 0 ? 1 : abs === 1 ? 0.52 : 0.28
            return (
              <button
                type="button"
                key={item.src}
                className={`gallery-coverflow__card${offset === 0 ? ' is-active' : ''}${abs > 0 ? ' is-side' : ''}`}
                style={{
                  '--offset': offset,
                  '--abs': abs,
                  zIndex: 10 - abs,
                  opacity: visible ? sideOpacity : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                onClick={() => setActive(index)}
                aria-label={item.title || `Photo ${index + 1}`}
                aria-current={offset === 0 ? 'true' : undefined}
                tabIndex={offset === 0 ? 0 : -1}
              >
                <img src={item.src} alt={item.title || ''} loading="lazy" decoding="async" />
                <span className="gallery-coverflow__vignette" aria-hidden="true" />
              </button>
            )
          })}
        </div>

        {count > 1 && (
          <button
            type="button"
            className="gallery-coverflow__btn gallery-coverflow__btn--next"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {items[active]?.title ? (
        <p className="gallery-coverflow__caption" aria-live="polite">
          {items[active].title}
        </p>
      ) : null}
    </div>
  )
}
