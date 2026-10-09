import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import FadeUp from '../motion/FadeUp'
import SplitLines from '../motion/SplitLines'
import LazyVideo, { PREV_SECTION_ROOT_MARGIN } from './LazyVideo.jsx'
import { withBrand } from './Brand.jsx'
import { JOURNEY_TIMELINE } from '../data/journey'
import { WEBSITE_LOGO_VIDEO } from '../data/assets.js'

const STEP_MS = 2600
const VIDEO_START_YEAR = '1994'
const VIDEO_MID_YEAR = '2006'
const VIDEO_END_YEAR = '2022'

const VIDEO_START_INDEX = JOURNEY_TIMELINE.findIndex((entry) => entry.year === VIDEO_START_YEAR)
const VIDEO_MID_INDEX = JOURNEY_TIMELINE.findIndex((entry) => entry.year === VIDEO_MID_YEAR)
const VIDEO_END_INDEX = JOURNEY_TIMELINE.findIndex((entry) => entry.year === VIDEO_END_YEAR)

export default function HomeJourney() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)
  const [interactive, setInteractive] = useState(false)
  const [videoRange, setVideoRange] = useState({ top: 0, height: 0 })
  const [videoReady, setVideoReady] = useState(false)
  const count = JOURNEY_TIMELINE.length

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const measure = () => {
      const startEl = itemRefs.current[VIDEO_START_INDEX]
      const midEl = itemRefs.current[VIDEO_MID_INDEX]
      const endEl = itemRefs.current[VIDEO_END_INDEX]
      if (!startEl || !midEl || !endEl) return

      const trackTop = track.getBoundingClientRect().top
      const startTop = startEl.getBoundingClientRect().top - trackTop
      const midTop = midEl.getBoundingClientRect().top - trackTop
      const endBottom = endEl.getBoundingClientRect().bottom - trackTop
      // Begin halfway between 1994 and 2006
      const bandTop = (startTop + midTop) / 2

      setVideoRange({
        top: Math.max(0, bandTop),
        height: Math.max(0, endBottom - bandTop),
      })
    }

    measure()

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    observer?.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const progress = progressRef.current
    if (!section || !progress) return undefined

    gsap.set(progress, { scaleY: 1 / count, transformOrigin: 'top center' })

    if (prefersReducedMotion()) {
      gsap.set(progress, { scaleY: 1 })
      setActive(count - 1)
      setInteractive(true)
      return undefined
    }

    let index = 0
    let timer = 0
    let started = false

    const paint = (next) => {
      setActive(next)
      gsap.to(progress, {
        scaleY: (next + 1) / count,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const finish = () => {
      paint(count - 1)
      setInteractive(true)
    }

    const step = () => {
      index += 1
      if (index >= count - 1) {
        finish()
        return
      }
      paint(index)
      timer = window.setTimeout(step, STEP_MS)
    }

    const start = () => {
      if (started) return
      started = true
      observer.disconnect()
      paint(0)
      timer = window.setTimeout(step, STEP_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [count])

  const goTo = (index) => {
    if (!interactive) return
    setActive(index)
    const progress = progressRef.current
    if (!progress) return
    gsap.to(progress, {
      scaleY: (index + 1) / count,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  return (
    <section
      ref={sectionRef}
      className="home-journey home-section"
      aria-label="Company journey"
    >
      <div className="r-container home-journey__head">
        <FadeUp as="p" className="r-label">
          Company journey
        </FadeUp>
        <SplitLines as="h2" className="r-display">
          37 years of <em>Engineering</em> excellence
        </SplitLines>
        <FadeUp as="p" className="r-body home-journey__lead" delay={0.1}>
          From the first workshop to the world.
        </FadeUp>
      </div>

      <div className="home-journey__grid">
        <div
          className="home-journey__video-col"
          style={
            videoRange.height
              ? { marginTop: videoRange.top, height: videoRange.height }
              : undefined
          }
        >
          <div className="home-journey__video">
            <LazyVideo
              className={`home-journey__video-media${videoReady ? ' is-ready' : ''}`}
              src={WEBSITE_LOGO_VIDEO}
              rootMargin={PREV_SECTION_ROOT_MARGIN}
              autoPlay
              muted
              loop
              playsInline
              onReady={() => setVideoReady(true)}
            />
          </div>
        </div>

        <div className="home-journey__timeline" aria-live="polite">
          <div ref={trackRef} className="journey-timeline__track">
            <div className="journey-timeline__spine" aria-hidden="true">
              <div ref={progressRef} className="journey-timeline__progress" />
            </div>

            <ol className="journey-timeline__list">
              {JOURNEY_TIMELINE.map((entry, i) => (
                <li
                  key={entry.year}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  className={`journey-timeline__item${i % 2 === 0 ? ' is-left' : ' is-right'}${i <= active ? ' is-active' : ''}${i === active ? ' is-current' : ''}`}
                >
                  <span className="journey-timeline__dot" aria-hidden="true" />
                  <button
                    type="button"
                    className={`home-journey__card${interactive ? ' is-interactive' : ''}`}
                    onClick={() => goTo(i)}
                    disabled={!interactive}
                    aria-current={i === active ? 'true' : undefined}
                  >
                    <span className="journey-timeline__item-year">{entry.year}</span>
                    <h3 className="journey-timeline__item-title">{entry.title}</h3>
                    <p className="journey-timeline__item-body">{withBrand(entry.body)}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
