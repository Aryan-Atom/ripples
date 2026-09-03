import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../motion/gsap'
import LazyVideo from '../LazyVideo'
import JourneyChapter from './JourneyChapter'
import { JOURNEY_INSTALLATION } from '../../data/journey'

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
 * Installation  full-bleed pinned chapter:
 * 1) Section enters → video plays
 * 2) Scroll scrubs Precision → Alignment → Execution
 * 3) Sequence completes → pin releases → next section
 */
export default function InstallationSection({ data = JOURNEY_INSTALLATION }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const mediaRef = useRef(null)
  const copyRef = useRef(null)
  const videoRef = useRef(null)
  const linesRef = useRef([])
  const [mediaReady, setMediaReady] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const media = mediaRef.current
    const copy = copyRef.current
    const lines = linesRef.current.filter(Boolean)
    if (!section || !stage || !media || !copy || !lines.length) return undefined

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
        end: '+=280%',
        pin: stage,
        pinSpacing: true,
        scrub: 0.55,
        anticipatePin: 1,
        onRefresh: (self) => {
          if (self.pin && self.pin.parentElement) {
            self.pin.parentElement.style.zIndex = '1';
          }
        },
        invalidateOnRefresh: true,
        fastScrollEnd: true,
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

    // Hold: video fills frame, then copy appears.
    tl.to(media, { scale: 1, duration: 0.28, ease: 'none' }, 0)
    tl.to(copy, { autoAlpha: 1, duration: 0.1, ease: 'none' }, 0.22)

    // Text sequence  last line stays until pin releases.
    const textStart = 0.32
    const step = 0.22
    lines.forEach((line, i) => {
      const at = textStart + i * step
      tl.to(
        line,
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.1, ease: 'none' },
        at,
      )
      if (i < lines.length - 1) {
        tl.to(
          line,
          { autoAlpha: 0, y: -20, filter: 'blur(3px)', duration: 0.08, ease: 'none' },
          at + 0.14,
        )
      }
    })

    // Keep last frame visible briefly before next section.
    tl.to({}, { duration: 0.18 }, textStart + (lines.length - 1) * step + 0.12)

    // Also start video as soon as the section approaches the viewport.
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
      id={data.act.id}
      className="installation-act"
      aria-labelledby="installation-act-title"
    >
      <div ref={stageRef} className="installation-act__stage">
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
            ref={videoRef}
            className={`installation-act__video${mediaReady ? ' is-ready' : ''}`}
            src={data.video}
            poster={data.poster}
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
          <div className="installation-act__veil" aria-hidden="true" />
        </div>

        <div ref={copyRef} className="installation-act__copy r-container">
          <p className="installation-act__label r-label">{data.act.label}</p>
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
