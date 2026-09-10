import { useEffect, useRef, useState } from 'react'
import GalleryLightbox from './GalleryLightbox.jsx'

/** Pinterest-style masonry collage. Hover reveals index + title; click opens a lightbox. */
export default function GalleryCollage({ items, label = 'Gallery' }) {
  const [open, setOpen] = useState(null)
  const [shown, setShown] = useState(items)
  const [hidden, setHidden] = useState(false)
  const fadeTimer = useRef(0)

  useEffect(() => {
    if (items === shown) return undefined

    setHidden(true)
    window.clearTimeout(fadeTimer.current)

    fadeTimer.current = window.setTimeout(() => {
      setShown(items)
      setOpen(null)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setHidden(false))
      })
    }, 400)

    return () => window.clearTimeout(fadeTimer.current)
  }, [items, shown])

  if (!shown?.length) return null

  return (
    <div className={`gallery-collage-fade${hidden ? ' is-hidden' : ''}`}>
      <div className="gallery-collage" aria-label={label}>
        {shown.map((item, index) => (
          <button
            type="button"
            className="gallery-collage__item"
            key={item.src}
            onClick={() => setOpen(index)}
            aria-label={`View ${item.title || `photo ${index + 1}`}`}
          >
            <img src={item.src} alt="" loading="lazy" decoding="async" />
            <span className="gallery-collage__overlay">
              <span className="gallery-collage__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="gallery-collage__name">{item.title}</span>
            </span>
          </button>
        ))}
      </div>

      <GalleryLightbox items={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  )
}
