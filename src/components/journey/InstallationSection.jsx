import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/gsap'
import LazyVideo from '../LazyVideo'
import JourneyChapter from './JourneyChapter'
import { JOURNEY_INSTALLATION } from '../../data/journey'

/**
 * Act V  pin full-viewport media first (settle), then scrub text on further scroll.
 */
export default function InstallationSection() {
  const data = JOURNEY_INSTALLATION
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const mediaRef = useRef(null)
  const copyRef = useRef(null)
  const linesRef = useRef([])
  const [mediaReady, setMediaReady] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const media = mediaRef.current
    const copy = copyRef.current
    const lines = linesRef.current.filter(Boolean)
    if (!section || !pin || !media || !copy || !lines.length) return undefined

    if (prefersReducedMotion()) {
      gsap.set(lines, { autoAlpha: 1, y: 0, filter: 'none' })
      gsap.set(copy, { autoAlpha: 1 })
      gsap.set(media, { scale: 1 })
      return undefined
    }

    // Start: media fills the screen; copy waits until settle completes.
    gsap.set(media, { scale: 1.08 })
    gsap.set(copy, { autoAlpha: 0 })
    gsap.set(lines, { autoAlpha: 0, y: 28, filter: 'blur(4px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Phase 1  settle: hold full-bleed media on screen before any text.
    tl.to(
      media,
      { scale: 1, duration: 0.38, ease: 'none' },
      0,
    )
    tl.to(
      copy,
      { autoAlpha: 1, duration: 0.12, ease: 'none' },
      0.32,
    )

    // Phase 2  text sequence after the media has settled.
    const textStart = 0.42
    lines.forEach((line, i) => {
      const start = textStart + i * 0.18
      tl.to(
        line,
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'none' },
        start,
      )
      if (i < lines.length - 1) {
        tl.to(
          line,
          { autoAlpha: 0, y: -18, filter: 'blur(3px)', duration: 0.1, ease: 'none' },
          start + 0.14,
        )
      }
    })

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  useLayoutEffect(() => {
    if (!mediaReady) return undefined
    ScrollTrigger.refresh()
  }, [mediaReady])

  return (
    <JourneyChapter
      ref={sectionRef}
      id={data.act.id}
      className="installation-act"
      aria-labelledby="installation-act-title"
    >
      <div ref={pinRef} className="installation-act__pin">
        <div ref={mediaRef} className="installation-act__media">
          <img
            className="installation-act__poster"
            src={data.poster}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
          <LazyVideo
            className={`installation-act__video${mediaReady ? ' is-ready' : ''}`}
            src={data.video}
            poster={data.poster}
            autoPlay
            muted
            loop
            playsInline
            maxConcurrent={1}
            rootMargin="40% 0px"
            onReady={() => setMediaReady(true)}
          />
          <div className="installation-act__veil" aria-hidden="true" />
        </div>

        <div ref={copyRef} className="installation-act__copy r-container">
          <p className="installation-act__label r-label">
            {data.act.label}
          </p>
          <div className="installation-act__lines" aria-live="polite">
            {data.lines.map((line, i) => (
              <p
                key={line}
                ref={(el) => {
                  linesRef.current[i] = el
                }}
                className="installation-act__line"
              >
                {line}
              </p>
            ))}
          </div>
          <p className="installation-act__body">{data.body}</p>
        </div>
      </div>
    </JourneyChapter>
  )
}
