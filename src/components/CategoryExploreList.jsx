import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FadeUp from '../motion/FadeUp'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
/** Delay before opening so a quick pass-through doesn’t snap the panel. */
const OPEN_DELAY_MS = 120
/** Slightly longer close so the collapse eases out. */
const CLOSE_DELAY_MS = 80

/**
 * WaterWorks categories:
 * Desktop  Meridian-style rows (title + body + tags always visible);
 *           hover expands image strip below; click opens gallery.
 * Mobile  vertical cards with cover image and CTA.
 */
export default function CategoryExploreList({ categories }) {
  const [isHoverDevice, setIsHoverDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HOVER_QUERY).matches,
  )
  const [openId, setOpenId] = useState(null)
  const openTimerRef = useRef(0)
  const closeTimerRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY)
    const sync = () => setIsHoverDevice(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  useEffect(
    () => () => {
      window.clearTimeout(openTimerRef.current)
      window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  const openItem = (id) => {
    window.clearTimeout(closeTimerRef.current)
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = window.setTimeout(() => {
      setOpenId(id)
    }, OPEN_DELAY_MS)
  }

  const closeItem = (id) => {
    window.clearTimeout(openTimerRef.current)
    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => {
      setOpenId((current) => (current === id ? null : current))
    }, CLOSE_DELAY_MS)
  }

  if (!categories?.length) return null

  if (!isHoverDevice) {
    return (
      <FadeUp className="ww-cat-cards" stagger={0.08} y={28}>
        {categories.map((cat) => (
          <Link key={cat.id} className="ww-cat-card" to={cat.to}>
            <div className="ww-cat-card__media">
              <img src={cat.cover} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="ww-cat-card__body">
              <h3 className="ww-cat-card__title">{cat.label}</h3>
              <ul className="ww-cat-card__tags" aria-label="Tags">
                {cat.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="ww-cat-card__desc">{cat.description}</p>
              <span className="ww-cat-card__cta">
                View gallery <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </FadeUp>
    )
  }

  return (
    <FadeUp
      as="ul"
      className={`ww-cat-list${openId ? ' has-open' : ''}`}
      stagger={0.06}
      y={22}
      aria-label="WaterWorks categories"
    >
      {categories.map((cat) => {
        const open = openId === cat.id
        return (
          <li
            key={cat.id}
            className={`ww-cat-item${open ? ' is-open' : ''}`}
            onMouseEnter={() => openItem(cat.id)}
            onMouseLeave={() => closeItem(cat.id)}
          >
            <Link className="ww-cat-item__hit" to={cat.to}>
              <div className="ww-cat-item__row">
                <h3 className="ww-cat-item__title">{cat.label}</h3>
                <p className="ww-cat-item__desc">{cat.description}</p>
                <div className="ww-cat-item__aside">
                  <ul className="ww-cat-item__tags" aria-label="Tags">
                    {cat.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {cat.place ? <p className="ww-cat-item__place">{cat.place}</p> : null}
                </div>
              </div>

              <div className="ww-cat-item__panel" aria-hidden={!open}>
                <div className="ww-cat-item__panel-inner">
                  <div className="ww-cat-item__images">
                    {cat.previews.map((src, index) => (
                      <div
                        className="ww-cat-item__shot"
                        key={src}
                        style={{ '--shot-i': index }}
                      >
                        <img src={src} alt="" loading="lazy" decoding="async" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </FadeUp>
  )
}
