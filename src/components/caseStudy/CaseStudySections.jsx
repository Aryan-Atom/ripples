import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import FadeUp from '../../motion/FadeUp'
import JourneyChapter from '../journey/JourneyChapter'
import SectionHeading from '../journey/SectionHeading'
import SplitPanel from '../journey/SplitPanel'
import { CASE_STUDY } from '../../data/caseStudy'

export function CaseStudyBrief() {
  const { brief } = CASE_STUDY
  return (
    <SplitPanel
      id="brief"
      className="cs-brief"
      mediaSide="right"
      ariaLabelledby="cs-brief-title"
      media={
        <img
          className="cs-fill-media"
          src={brief.image.src}
          alt={brief.image.alt}
          loading="lazy"
          decoding="async"
        />
      }
    >
      <SectionHeading
        act={{ label: brief.eyebrow }}
        titleId="cs-brief-title"
        titleLines={brief.titleLines}
        titleEm={brief.titleEm}
        body={brief.body}
        ruled
      />
    </SplitPanel>
  )
}

export function CaseStudyBefore() {
  const { before } = CASE_STUDY
  return (
    <JourneyChapter id="before" className="cs-before" aria-labelledby="cs-before-title">
      <div className="r-container">
        <FadeUp as="p" className="r-label">
          {before.eyebrow}
        </FadeUp>
        <FadeUp as="p" id="cs-before-title" className="cs-before__intro" y={18} delay={0.06}>
          {before.intro}
        </FadeUp>
        <div className="cs-before__grid">
          {before.images.map((image, i) => (
            <FadeUp key={image.src} className="cs-before__cell" delay={0.08 + i * 0.05} y={24}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </FadeUp>
          ))}
        </div>
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyDesign() {
  const { design } = CASE_STUDY
  return (
    <SplitPanel
      id="design"
      className="cs-design"
      ariaLabelledby="cs-design-title"
      media={
        <div className="cs-sheet">
          <img
            className="cs-fill-media cs-fill-media--contain"
            src={design.image.src}
            alt={design.image.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      }
    >
      <SectionHeading
        act={{ label: design.eyebrow }}
        titleId="cs-design-title"
        titleLines={design.titleLines}
        titleEm={design.titleEm}
        body={design.body}
        ruled
      />
    </SplitPanel>
  )
}

export function CaseStudyDrawing() {
  const { drawing } = CASE_STUDY
  return (
    <JourneyChapter id="drawing" className="cs-drawing" aria-labelledby="cs-drawing-title">
      <div className="r-container">
        <SectionHeading
          act={{ label: drawing.eyebrow }}
          titleId="cs-drawing-title"
          titleLines={drawing.titleLines}
          titleEm={drawing.titleEm}
          body={drawing.body}
          ruled
        />
        <FadeUp className="cs-drawing__frame cs-sheet" y={28} delay={0.1}>
          <img
            src={drawing.image.src}
            alt={drawing.image.alt}
            loading="lazy"
            decoding="async"
          />
        </FadeUp>
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyFabrication() {
  const { fabrication } = CASE_STUDY
  return (
    <JourneyChapter
      id="fabrication"
      className="cs-fabrication"
      aria-labelledby="cs-fabrication-title"
    >
      <div className="r-container">
        <SectionHeading
          act={{ label: fabrication.eyebrow }}
          titleId="cs-fabrication-title"
          titleLines={fabrication.titleLines}
          titleEm={fabrication.titleEm}
          body={fabrication.body}
          ruled
        />
        <div className="cs-fabrication__grid">
          {fabrication.items.map((item, i) => (
            <FadeUp
              key={item.src}
              className="cs-fabrication__card"
              delay={i * 0.06}
              y={28}
            >
              <div className="cs-fabrication__frame cs-sheet">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              </div>
              <p className="r-label cs-fabrication__caption">{item.caption}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyVisualization() {
  const { visualization } = CASE_STUDY
  const modes = visualization.modes
  const [modeId, setModeId] = useState(modes[0]?.id ?? 'day')
  const stageRef = useRef(null)
  const videoRefs = useRef({})

  // Keep both clips playing so crossfades never hitch on a cold start.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const ensurePlaying = () => {
      modes.forEach((mode) => {
        const video = videoRefs.current[mode.id]
        if (!video) return
        video.muted = true
        video.defaultMuted = true
        video.playsInline = true
        if (video.paused) {
          video.play().catch(() => {})
        }
      })
    }

    ensurePlaying()

    const onVis = () => {
      if (document.visibilityState === 'visible') ensurePlaying()
    }
    document.addEventListener('visibilitychange', onVis)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) ensurePlaying()
        else {
          modes.forEach((mode) => {
            videoRefs.current[mode.id]?.pause()
          })
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(stage)

    return () => {
      document.removeEventListener('visibilitychange', onVis)
      observer.disconnect()
    }
  }, [modes])

  return (
    <SplitPanel
      id="visualization"
      className="cs-visualization"
      mediaSide="right"
      ariaLabelledby="cs-viz-title"
      media={
        <div ref={stageRef} className="cs-visualization__stage">
          {modes.map((mode) => (
            <video
              key={mode.id}
              ref={(node) => {
                videoRefs.current[mode.id] = node
              }}
              className={`cs-visualization__video${mode.id === modeId ? ' is-active' : ''}`}
              src={mode.src}
              poster={visualization.poster}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden={mode.id !== modeId}
            />
          ))}
          <div className="cs-visualization__switch" role="group" aria-label="Day or night">
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`cs-visualization__mode${mode.id === modeId ? ' is-active' : ''}`}
                onClick={() => {
                  const next = videoRefs.current[mode.id]
                  if (next?.paused) next.play().catch(() => {})
                  setModeId(mode.id)
                }}
                aria-pressed={mode.id === modeId}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <SectionHeading
        act={{ label: visualization.eyebrow }}
        titleId="cs-viz-title"
        titleLines={visualization.titleLines}
        titleEm={visualization.titleEm}
        body={visualization.body}
        ruled
      />
    </SplitPanel>
  )
}

/** Full-bleed installation video — no GSAP pin, so it never overlaps Visualization. */
export function CaseStudyInstallation() {
  const { installation } = CASE_STUDY
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const root = mediaRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          const video = videoRef.current
          if (video) {
            video.muted = true
            video.playsInline = true
            video.play().catch(() => {})
          }
        } else {
          videoRef.current?.pause()
        }
      },
      { rootMargin: '30% 0px', threshold: 0.12 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return undefined

    const onReady = () => {
      setReady(true)
      if (!video.paused) return
      video.play().catch(() => {})
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    if (video.readyState >= 2) onReady()

    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
    }
  }, [shouldLoad])

  return (
    <JourneyChapter
      id="installation"
      className="cs-installation"
      aria-labelledby="cs-install-title"
    >
      <div ref={mediaRef} className="cs-installation__media" aria-hidden="true">
        <img
          className={`cs-installation__poster${ready ? ' is-faded' : ''}`}
          src={installation.poster}
          alt=""
          decoding="async"
        />
        <video
          ref={videoRef}
          className={`cs-installation__video${ready ? ' is-ready' : ''}`}
          src={shouldLoad ? installation.video : undefined}
          poster={installation.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="cs-installation__veil" />
      </div>
      <div className="cs-installation__inner r-container">
        <p className="r-label cs-installation__eyebrow">{installation.act.label}</p>
        <h2 id="cs-install-title" className="cs-installation__title">
          {installation.title}
        </h2>
        <p className="cs-installation__body">{installation.body}</p>
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyResult() {
  const { result } = CASE_STUDY
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const root = mediaRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          const video = videoRef.current
          if (video) {
            video.muted = true
            video.playsInline = true
            video.play().catch(() => {})
          }
        } else {
          videoRef.current?.pause()
        }
      },
      { rootMargin: '30% 0px', threshold: 0.12 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return undefined

    const onReady = () => {
      setReady(true)
      if (!video.paused) return
      video.play().catch(() => {})
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    if (video.readyState >= 2) onReady()

    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
    }
  }, [shouldLoad])

  return (
    <JourneyChapter id="result" className="cs-result" aria-labelledby="cs-result-title">
      <div ref={mediaRef} className="cs-result__media" aria-hidden="true">
        <img
          className={`cs-result__poster${ready ? ' is-faded' : ''}`}
          src={result.poster}
          alt=""
          decoding="async"
        />
        <video
          ref={videoRef}
          className={`cs-result__video${ready ? ' is-ready' : ''}`}
          src={shouldLoad ? result.video : undefined}
          poster={result.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="cs-result__veil" />
      </div>
      <div className="cs-result__inner r-container">
        <p className="r-label cs-result__eyebrow">{result.eyebrow}</p>
        <h2 id="cs-result-title" className="cs-result__title">
          {result.titleLines.map((l, i) =>
            l === result.titleEm ? <em key={i}>{l}</em> : <span key={i}>{l} </span>,
          )}
        </h2>
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyFooterCta() {
  const { cta } = CASE_STUDY
  return (
    <section className="cs-cta" aria-label="Start a project">
      <div className="r-container cs-cta__inner">
        <FadeUp as="p" className="r-label">
          {cta.eyebrow}
        </FadeUp>
        <FadeUp as="h2" className="cs-cta__title" y={22} delay={0.06}>
          {cta.title}
        </FadeUp>
        <FadeUp className="cs-cta__actions" delay={0.12} y={16}>
          <Link className="cs-cta__primary" to={cta.primary.to}>
            {cta.primary.label}
            <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
