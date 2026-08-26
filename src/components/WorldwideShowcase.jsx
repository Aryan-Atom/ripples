import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WORLDWIDE_EVENTS } from '../data/worldwide'
import { prefersReducedMotion } from '../motion/gsap'
import { attachScrollReveal, createRevealTimeline } from '../motion/scrollReveal'
import { withBrand } from './Brand.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function WorldwideShowcase() {
  const wrapRef = useRef(null)
  const slideRefs = useRef([])
  const videoRefs = useRef([])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const slides = slideRefs.current.filter(Boolean)
    if (slides.length === 0) return undefined

    const triggers = slides.map((slide, i) =>
      ScrollTrigger.create({
        trigger: slide,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      }),
    )

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === activeIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [activeIndex])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const slides = slideRefs.current.filter(Boolean)
    const ctx = gsap.context(() => {
      slides.forEach((slide) => {
        const panel = slide.querySelector('.worldwide-showcase__panel')
        if (!panel) return

        const tl = createRevealTimeline(panel, {
          y: 22,
          duration: 0.45,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        })
        if (!tl) return

        attachScrollReveal(tl, slide)
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="worldwide-showcase" aria-label="Global event showcase">
      <div className="worldwide-showcase__header r-container">
        <span className="r-label">On the world stage</span>
        <h2 className="r-display worldwide-showcase__title">
          Events that move <em>water</em> and crowds.
        </h2>
        <p className="r-body worldwide-showcase__lead">
          Scroll through landmark launches, civic unveilings, and industry showcases 
          each engineered for its climate, audience, and skyline.
        </p>
      </div>

      <div className="worldwide-showcase__scroll" ref={wrapRef}>
        <nav className="worldwide-showcase__progress" aria-label="Showcase progress">
          {WORLDWIDE_EVENTS.map((event, i) => (
            <span
              key={event.index}
              className={`worldwide-showcase__dot${i === activeIndex ? ' is-active' : ''}`}
              aria-current={i === activeIndex ? 'step' : undefined}
            />
          ))}
        </nav>

        <div className="worldwide-showcase__slides">
          {WORLDWIDE_EVENTS.map((event, i) => (
            <article
              key={event.index}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              className="worldwide-showcase__slide"
              aria-label={event.title}
            >
              <div className="worldwide-showcase__slide-inner">
                <div className="worldwide-showcase__composition">
                  <div className="worldwide-showcase__frame">
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el
                      }}
                      className="worldwide-showcase__video"
                      src={event.video}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>

                  <div
                    className={`worldwide-showcase__panel worldwide-showcase__panel--${event.align}`}
                  >
                    <div className="worldwide-showcase__card">
                      <span className="worldwide-showcase__card-index">{event.index}</span>
                      <h3 className="worldwide-showcase__card-title">{event.title}</h3>
                      <p className="worldwide-showcase__card-body">{withBrand(event.description)}</p>
                      <span className="worldwide-showcase__card-rule" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
