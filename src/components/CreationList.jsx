import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import FadeUp from '../motion/FadeUp'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const MOBILE_LAYOUT_QUERY = '(max-width: 900px)'

/**
 * Editorial numbered project list.
 * Desktop: cursor-following image preview on hover.
 * Mobile (≤900px): text left, thumbnail right — always visible.
 * Touch tablet: tap a row to reveal its image with motion.
 */
export default function CreationList({ items }) {
  const rootRef = useRef(null)
  const previewRef = useRef(null)
  const thumbRefs = useRef([])
  const [active, setActive] = useState(-1)
  const [openIndex, setOpenIndex] = useState(-1)
  const [isHoverDevice, setIsHoverDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HOVER_QUERY).matches,
  )
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_LAYOUT_QUERY).matches,
  )

  const useDesktopHover = isHoverDevice && !isMobileLayout
  const useTouchReveal = !useDesktopHover && !isMobileLayout

  useLayoutEffect(() => {
    const hoverMq = window.matchMedia(HOVER_QUERY)
    const mobileMq = window.matchMedia(MOBILE_LAYOUT_QUERY)

    const sync = () => {
      setIsHoverDevice(hoverMq.matches)
      setIsMobileLayout(mobileMq.matches)
    }

    sync()
    hoverMq.addEventListener?.('change', sync)
    mobileMq.addEventListener?.('change', sync)
    return () => {
      hoverMq.removeEventListener?.('change', sync)
      mobileMq.removeEventListener?.('change', sync)
    }
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    const preview = previewRef.current
    if (!root || !preview || !useDesktopHover) return undefined
    if (prefersReducedMotion()) return undefined

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
  }, [useDesktopHover])

  useLayoutEffect(() => {
    if (!useTouchReveal) return undefined

    const thumbs = thumbRefs.current
    const reduced = prefersReducedMotion()

    thumbs.forEach((thumb, i) => {
      if (!thumb) return

      if (i === openIndex) {
        gsap.set(thumb, { display: 'block', overflow: 'hidden' })
        if (reduced) {
          gsap.set(thumb, {
            height: 'auto',
            autoAlpha: 1,
            y: 0,
            scale: 1,
            marginBottom: '1.1rem',
          })
          return
        }
        gsap.fromTo(
          thumb,
          { height: 0, autoAlpha: 0, y: 18, scale: 0.96, marginBottom: 0 },
          {
            height: 'auto',
            autoAlpha: 1,
            y: 0,
            scale: 1,
            marginBottom: '1.1rem',
            duration: 0.5,
            ease: 'power3.out',
          },
        )
        return
      }

      if (reduced) {
        gsap.set(thumb, { height: 0, autoAlpha: 0, marginBottom: 0, display: 'none' })
        return
      }

      gsap.to(thumb, {
        height: 0,
        autoAlpha: 0,
        y: 12,
        scale: 0.96,
        marginBottom: 0,
        duration: 0.32,
        ease: 'power2.in',
        onComplete: () => {
          if (openIndex !== i) gsap.set(thumb, { display: 'none' })
        },
      })
    })
  }, [openIndex, useTouchReveal, items])

  useLayoutEffect(() => {
    if (!useTouchReveal) return undefined
    thumbRefs.current.forEach((thumb) => {
      if (!thumb) return
      gsap.set(thumb, {
        display: 'none',
        height: 0,
        autoAlpha: 0,
        marginBottom: 0,
        overflow: 'hidden',
      })
    })
  }, [useTouchReveal, items])

  const activateRow = (i) => {
    if (useDesktopHover) {
      setActive(i)
      return
    }
    if (useTouchReveal) {
      setOpenIndex((prev) => (prev === i ? -1 : i))
    }
  }

  const listMode = useDesktopHover ? 'hover' : isMobileLayout ? 'mobile' : 'touch'

  return (
    <div className={`creation-list creation-list--${listMode}`} ref={rootRef}>
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
        {items.map((item, i) => {
          const isOpen = useTouchReveal && openIndex === i
          const isInteractive = useDesktopHover || useTouchReveal

          return (
            <article
              key={item.id}
              className={`creation-row${i === active ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => {
                if (useDesktopHover) setActive(i)
              }}
              onFocus={() => {
                if (useDesktopHover) setActive(i)
              }}
              onClick={isInteractive ? () => activateRow(i) : undefined}
              onKeyDown={
                isInteractive
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        activateRow(i)
                      }
                    }
                  : undefined
              }
              tabIndex={isInteractive ? 0 : undefined}
              role={useTouchReveal ? 'button' : undefined}
              aria-expanded={useTouchReveal ? isOpen : undefined}
            >
              <div className="creation-row__copy">
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
              </div>
              <img
                ref={(node) => {
                  thumbRefs.current[i] = node
                }}
                className="creation-row__thumb"
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            </article>
          )
        })}
      </FadeUp>
    </div>
  )
}
