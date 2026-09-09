import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import FadeUp from '../motion/FadeUp'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const MOBILE_LAYOUT_QUERY = '(max-width: 900px)'

/**
 * Editorial numbered project list.
 * Desktop: cursor-following image preview on hover.
 * Mobile (≤900px): text left, thumbnail right  always visible.
 * Touch tablet: tap a row to reveal its image with motion.
 */
export default function CreationList({ items, groups }) {
  const sections = groups?.length
    ? groups
    : [{ id: 'all', label: null, items: items ?? [] }]
  const flatItems = sections.flatMap((section) => section.items)
  const rootRef = useRef(null)
  const previewRef = useRef(null)
  const thumbRefs = useRef([])
  const activeRef = useRef(-1)
  const moveXRef = useRef(null)
  const moveYRef = useRef(null)
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
    const preview = previewRef.current
    if (!preview || !useDesktopHover) return undefined

    moveXRef.current = gsap.quickTo(preview, 'left', { duration: 0.4, ease: 'power3.out' })
    moveYRef.current = gsap.quickTo(preview, 'top', { duration: 0.4, ease: 'power3.out' })

    return () => {
      moveXRef.current = null
      moveYRef.current = null
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
  }, [openIndex, useTouchReveal, flatItems])

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
  }, [useTouchReveal, flatItems])

  const ensureMovers = (preview) => {
    if (!preview) return
    if (!moveXRef.current || !moveYRef.current) {
      moveXRef.current = gsap.quickTo(preview, 'left', { duration: 0.4, ease: 'power3.out' })
      moveYRef.current = gsap.quickTo(preview, 'top', { duration: 0.4, ease: 'power3.out' })
    }
  }

  const showGroupPreview = (index, event) => {
    if (!useDesktopHover) return
    const preview = previewRef.current
    activeRef.current = index
    setActive(index)
    if (!preview) return
    ensureMovers(preview)
    preview.style.left = `${event.clientX}px`
    preview.style.top = `${event.clientY}px`
    moveXRef.current?.(event.clientX)
    moveYRef.current?.(event.clientY)
  }

  const movePreview = (event) => {
    if (!useDesktopHover || activeRef.current < 0) return
    ensureMovers(previewRef.current)
    moveXRef.current?.(event.clientX)
    moveYRef.current?.(event.clientY)
  }

  const hidePreview = () => {
    if (!useDesktopHover) return
    activeRef.current = -1
    setActive(-1)
  }

  const activateRow = (i) => {
    if (useTouchReveal) {
      setOpenIndex((prev) => (prev === i ? -1 : i))
    }
  }

  const listMode = useDesktopHover ? 'hover' : isMobileLayout ? 'mobile' : 'touch'

  const preview = (
    <div
      className={`creation-list__preview${active >= 0 ? ' is-visible' : ''}`}
      ref={previewRef}
      aria-hidden="true"
    >
      {flatItems.map((item, i) => (
        <img
          key={item.id}
          src={item.image}
          alt=""
          className={`creation-list__preview-img${i === active ? ' is-active' : ''}`}
        />
      ))}
    </div>
  )

  return (
    <div className={`creation-list creation-list--${listMode}`} ref={rootRef}>
      {useDesktopHover && typeof document !== 'undefined'
        ? createPortal(preview, document.body)
        : null}

      <FadeUp stagger={0.1} y={36}>
        {sections.map((section, sectionIndex) => {
          const offset = sections
            .slice(0, sectionIndex)
            .reduce((count, group) => count + group.items.length, 0)

          return (
            <div key={section.id} className="creation-group">
              {section.label ? (
                <div className="creation-group__head" onMouseEnter={hidePreview}>
                  <h3 className="creation-group__title">{section.label}</h3>
                  {section.to ? (
                    <Link
                      className="creation-group__arrow"
                      to={section.to}
                      aria-label={`Open ${section.label} in WaterWorks`}
                    >
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  ) : null}
                </div>
              ) : null}

              <div
                className="creation-group__projects"
                onMouseEnter={(event) => showGroupPreview(offset, event)}
                onMouseMove={movePreview}
                onMouseLeave={hidePreview}
              >
              {section.items.map((item, localIndex) => {
                const i = offset + localIndex
                const isOpen = useTouchReveal && openIndex === i
                const isInteractive = useTouchReveal

                return (
                  <article
                    key={item.id}
                    className={`creation-row${i === active ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
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
                        <span className="creation-row__index">
                          {String(localIndex + 1).padStart(2, '0')}
                        </span>
                        <h3 className="creation-row__title">{item.title}</h3>
                        <p className="creation-row__summary">{item.summary}</p>
                        <span className="creation-row__meta">
                          {item.location}
                          {item.category ? <em>{item.category}</em> : null}
                        </span>
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
              </div>
            </div>
          )
        })}
      </FadeUp>
    </div>
  )
}
