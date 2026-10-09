import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import FadeUp from '../../motion/FadeUp'
import JourneyChapter from '../journey/JourneyChapter'
import SectionHeading from '../journey/SectionHeading'
import SplitPanel from '../journey/SplitPanel'
import GalleryCollage from '../GalleryCollage.jsx'
import { CASE_STUDY } from '../../data/caseStudy'
import CaseStudyHeavyVideo from './CaseStudyHeavyVideo'
import { armAutoplayGestureRetry, armInlinePlayback, playSafe } from '../../utils/videoAutoplay.js'

function isVideoSrc(src) {
  return typeof src === 'string' && /\.(mp4|webm|ogg)(\?|$)/i.test(src)
}

export function CaseStudyBrief({ study = CASE_STUDY }) {
  const { brief } = study
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

export function CaseStudyBefore({ study = CASE_STUDY }) {
  const { before } = study
  return (
    <JourneyChapter id="before" className="cs-before" aria-labelledby="cs-before-title">
      <div className="r-container">
        <FadeUp as="p" className="r-label">
          {before.eyebrow}
        </FadeUp>
        <FadeUp as="p" id="cs-before-title" className="cs-before__intro" y={18} delay={0.06}>
          {before.intro}
        </FadeUp>
        <div className={`cs-before__grid${before.images.length === 1 ? ' cs-before__grid--single' : ''}`}>
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

export function CaseStudyDesign({ study = CASE_STUDY }) {
  const { design } = study
  return (
    <SplitPanel
      id="design"
      className="cs-design"
      mediaSide="right"
      ariaLabelledby="cs-design-title"
      media={<GalleryCollage items={design.images} label="Design drawings collage" />}
    >
      <SectionHeading
        act={{ label: design.eyebrow }}
        titleId="cs-design-title"
        titleLines={design.titleLines}
        titleEm={design.titleEm}
        body={design.body}
        ruled
      />
      {design.bodySecondary ? (
        <FadeUp as="p" className="cs-design__note" delay={0.12}>
          {design.bodySecondary}
        </FadeUp>
      ) : null}
      {design.note ? (
        <FadeUp as="p" className="cs-design__note" delay={0.18}>
          {design.note}
        </FadeUp>
      ) : null}
      {design.labels?.length ? (
        <FadeUp as="ul" className="cs-design__labels" delay={0.24}>
          {design.labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </FadeUp>
      ) : null}
    </SplitPanel>
  )
}

export function CaseStudyFabrication({ study = CASE_STUDY }) {
  const { fabrication } = study
  const collageItems = (fabrication.items || []).map((item) => ({
    src: item.src,
    title: item.title || item.caption,
    alt: item.alt,
  }))

  return (
    <SplitPanel
      id="fabrication"
      className="cs-design cs-fabrication-panel"
      mediaSide="right"
      ariaLabelledby="cs-fabrication-title"
      media={<GalleryCollage items={collageItems} label="Fabrication collage" />}
    >
      <SectionHeading
        act={{ label: fabrication.eyebrow }}
        titleId="cs-fabrication-title"
        titleLines={fabrication.titleLines}
        titleEm={fabrication.titleEm}
        body={fabrication.body}
        ruled
      />
    </SplitPanel>
  )
}

export function CaseStudyVisualization({ study = CASE_STUDY }) {
  const { visualization } = study
  const modes = visualization.modes
  const [modeId, setModeId] = useState('night')
  const stageRef = useRef(null)
  const videoRefs = useRef({})

  // Keep both clips playing so crossfades never hitch on a cold start.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    armAutoplayGestureRetry()

    const ensurePlaying = () => {
      modes.forEach((mode) => {
        const video = videoRefs.current[mode.id]
        if (!video) return
        armInlinePlayback(video)
        video.dataset.autoplayIntent = '1'
        video.dataset.shouldPlay = '1'
        if (video.paused) playSafe(video).catch(() => {})
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
            const video = videoRefs.current[mode.id]
            if (!video) return
            video.dataset.shouldPlay = '0'
            video.pause()
          })
        }
      },
      { rootMargin: '0px 0px 100% 0px', threshold: 0.01 },
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
          {modes.map((mode) =>
            isVideoSrc(mode.src) ? (
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
            ) : (
              <img
                key={mode.id}
                className={`cs-visualization__video${mode.id === modeId ? ' is-active' : ''}`}
                src={mode.src}
                alt=""
                aria-hidden={mode.id !== modeId}
              />
            ),
          )}
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

/** Installation gallery  same pattern as Before (label + italic intro + image row). */
export function CaseStudyInstallation({ study = CASE_STUDY }) {
  const { installation } = study
  const images = installation.images || []
  const intro = installation.intro || installation.body

  return (
    <JourneyChapter
      id={installation.act?.id || 'installation'}
      className="cs-before cs-installation-gallery"
      aria-labelledby="cs-install-title"
    >
      <div className="r-container">
        <FadeUp as="p" className="r-label">
          {installation.act?.label || installation.eyebrow || 'Installation'}
        </FadeUp>
        {intro ? (
          <FadeUp as="p" id="cs-install-title" className="cs-before__intro" y={18} delay={0.06}>
            {intro}
          </FadeUp>
        ) : null}
        {images.length > 0 ? (
          <div
            className={`cs-before__grid${images.length === 1 ? ' cs-before__grid--single' : ''}`}
          >
            {images.map((image, i) => (
              <FadeUp key={image.src} className="cs-before__cell" delay={0.08 + i * 0.05} y={24}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </FadeUp>
            ))}
          </div>
        ) : null}
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyResult({ study = CASE_STUDY }) {
  const { result } = study

  return (
    <JourneyChapter id="result" className="cs-result" aria-labelledby="cs-result-title">
      {result.video ? (
        <CaseStudyHeavyVideo
          src={result.video}
          poster={result.poster}
          className="cs-result__media"
          posterClassName="cs-result__poster"
          videoClassName="cs-result__video"
          veilClassName="cs-result__veil"
          rootMargin="0px 0px 100% 0px"
        />
      ) : (
        <div className="cs-result__media" aria-hidden="true">
          <img
            className="cs-result__poster"
            src={result.image?.src || result.poster}
            alt=""
            decoding="async"
          />
          <div className="cs-result__veil" />
        </div>
      )}
      <div className="cs-result__inner r-container">
        <p className="r-label cs-result__eyebrow">{result.eyebrow}</p>
        <h2 id="cs-result-title" className="cs-result__title">
          {result.titleLines.map((l, i) =>
            l === result.titleEm ? <em key={i}>{l}</em> : <span key={i}>{l} </span>,
          )}
        </h2>
        {result.outcomes?.length ? (
          <ul className="cs-result__outcomes">
            {result.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </JourneyChapter>
  )
}

export function CaseStudyFooterCta({ study = CASE_STUDY }) {
  const { cta } = study
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
