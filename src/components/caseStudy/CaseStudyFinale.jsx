import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/gsap'
import LazyVideo from '../LazyVideo'
import JourneyChapter from '../journey/JourneyChapter'
import { CASE_STUDY } from '../../data/caseStudy'
import { CaseStudyResult, CaseStudyVisualization } from './CaseStudySections'

function playVideo(video) {
  if (!video) return
  video.muted = true
  video.playsInline = true
  const run = () => {
    video.play().catch(() => {})
  }
  if (video.readyState >= 2) run()
  else {
    video.addEventListener('loadeddata', run, { once: true })
    video.addEventListener('canplay', run, { once: true })
  }
}

function pauseVideo(video) {
  video?.pause()
}

/**
 * Case Study only. No GSAP pin  a short sticky scroller (one extra viewport).
 * Precision → Alignment → Execution, then the final video follows on a normal scroll.
 */
function CaseStudyPinnedInstall() {
  const { installation } = CASE_STUDY
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const copyRef = useRef(null)
  const videoRef = useRef(null)
  const linesRef = useRef([])
  const [mediaReady, setMediaReady] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    const copy = copyRef.current
    const lines = linesRef.current.filter(Boolean)
    if (!section || !media || !copy || !lines.length) return undefined

    if (prefersReducedMotion()) {
      gsap.set([copy, ...lines], { autoAlpha: 1, y: 0, filter: 'none' })
      gsap.set(media, { scale: 1 })
      return undefined
    }

    gsap.set(media, { scale: 1.06 })
    gsap.set(copy, { autoAlpha: 0 })
    gsap.set(lines, { autoAlpha: 0, y: 32, filter: 'blur(4px)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: false,
        scrub: 0.55,
        invalidateOnRefresh: true,
        onEnter: () => playVideo(videoRef.current),
        onEnterBack: () => playVideo(videoRef.current),
        onLeave: () => pauseVideo(videoRef.current),
        onLeaveBack: () => pauseVideo(videoRef.current),
        onToggle: (self) => {
          if (self.isActive) playVideo(videoRef.current)
          else pauseVideo(videoRef.current)
        },
      },
    })

    tl.to(media, { scale: 1, duration: 0.2, ease: 'none' }, 0)
    tl.to(copy, { autoAlpha: 1, duration: 0.08, ease: 'none' }, 0.16)

    const textStart = 0.24
    const step = 0.26
    lines.forEach((line, i) => {
      const at = textStart + i * step
      tl.to(
        line,
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'none' },
        at,
      )
      if (i < lines.length - 1) {
        tl.to(
          line,
          { autoAlpha: 0, y: -20, filter: 'blur(3px)', duration: 0.07, ease: 'none' },
          at + 0.14,
        )
      }
    })

    tl.to({}, { duration: 0.06 }, textStart + (lines.length - 1) * step + 0.1)

    const approach = ScrollTrigger.create({
      trigger: section,
      start: 'top 92%',
      onEnter: () => playVideo(videoRef.current),
      onEnterBack: () => playVideo(videoRef.current),
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      approach.kill()
      tl.scrollTrigger?.kill()
      tl.kill()
      pauseVideo(videoRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (!mediaReady) return undefined
    playVideo(videoRef.current)
    ScrollTrigger.refresh()
  }, [mediaReady])

  return (
    <JourneyChapter
      ref={sectionRef}
      id={installation.act.id}
      className="cs-finale-install"
      aria-labelledby="cs-finale-install-title"
    >
      <div className="cs-finale-install__stage">
        <div ref={mediaRef} className="cs-finale-install__media">
          <img
            className="cs-finale-install__poster"
            src={installation.poster}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
          <LazyVideo
            ref={videoRef}
            className={`cs-finale-install__video${mediaReady ? ' is-ready' : ''}`}
            src={installation.video}
            poster={installation.poster}
            autoPlay={false}
            muted
            loop
            playsInline
            eager
            maxConcurrent={0}
            rootMargin="100% 0px"
            onReady={(video) => {
              setMediaReady(true)
              playVideo(video)
            }}
          />
          <div className="cs-finale-install__veil" aria-hidden="true" />
        </div>

        <div ref={copyRef} className="cs-finale-install__copy r-container">
          <p className="cs-finale-install__label r-label">{installation.act.label}</p>
          <div className="cs-finale-install__lines" aria-live="polite">
            {installation.lines.map((line, i) => (
              <p
                key={line}
                ref={(el) => {
                  linesRef.current[i] = el
                }}
                className="cs-finale-install__line"
                id={i === 0 ? 'cs-finale-install-title' : undefined}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="cs-finale-install__body">{installation.body}</p>
        </div>
      </div>
    </JourneyChapter>
  )
}

/** Day/Night → Precision/Execution → final output, Case Study only. */
export default function CaseStudyFinale() {
  return (
    <div className="cs-finale">
      <CaseStudyVisualization />
      <CaseStudyPinnedInstall />
      <CaseStudyResult />
    </div>
  )
}
