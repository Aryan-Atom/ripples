import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import FadeUp from '../motion/FadeUp'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

/**
 * Editorial numbered project list with a cursor-following image preview
 * on pointer devices. Falls back to inline thumbnails on touch screens.
 */
export default function CreationList({ items }) {
  const rootRef = useRef(null)
  const previewRef = useRef(null)
  const [active, setActive] = useState(-1)

  useLayoutEffect(() => {
    const root = rootRef.current
    const preview = previewRef.current
    if (!root || !preview) return undefined
    if (prefersReducedMotion() || !window.matchMedia(HOVER_QUERY).matches) return undefined

    gsap.set(preview, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.85, rotate: -3 })
    const moveX = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveY = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
    }
    const onEnter = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
      gsap.to(preview, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(preview, { autoAlpha: 0, scale: 0.85, rotate: -3, duration: 0.35, ease: 'power3.in' })
    }

    root.addEventListener('mousemove', onMove)
    root.addEventListener('mouseenter', onEnter)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseenter', onEnter)
      root.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="creation-list" ref={rootRef}>
      <div className="creation-list__preview" ref={previewRef} aria-hidden="true">
        {items.map((item, i) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`creation-list__preview-img${i === active ? ' is-active' : ''}`}
          />
        ))}
      </div>

      <FadeUp stagger={0.08} y={36}>
        {items.map((item, i) => (
          <article
            key={item.id}
            className={`creation-row${i === active ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <img
              className="creation-row__thumb"
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
            <div className="creation-row__line">
              <span className="creation-row__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="creation-row__title">{item.title}</h3>
              <p className="creation-row__summary">{item.summary}</p>
              <span className="creation-row__meta">
                {item.location}
                <em>{item.category}</em>
              </span>
              <span className="creation-row__year">{item.year}</span>
            </div>
          </article>
        ))}
      </FadeUp>
    </div>
  )
}
