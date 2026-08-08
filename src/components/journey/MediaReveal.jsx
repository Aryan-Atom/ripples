import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../motion/gsap'
import { attachScrollReveal } from '../../motion/scrollReveal'
import LazyVideo from '../LazyVideo'
import EngineeringLabel from './EngineeringLabel'
import SectionHeading from './SectionHeading'
import SplitPanel from './SplitPanel'
import { JOURNEY_DESIGN } from '../../data/journey'

function SlideMedia({ slide, active }) {
  if (slide.type === 'video') {
    return (
      <LazyVideo
        className="media-reveal__video"
        src={slide.src}
        autoPlay={active}
        muted
        loop
        playsInline
        maxConcurrent={1}
      />
    )
  }

  return (
    <img
      className="media-reveal__image"
      src={slide.src}
      alt={slide.alt}
      loading="lazy"
      decoding="async"
    />
  )
}

function MediaReveal() {
  const data = JOURNEY_DESIGN
  const [index, setIndex] = useState(0)
  const layersRef = useRef([])
  const labelsRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const layers = layersRef.current.filter(Boolean)
    layers.forEach((layer, i) => {
      gsap.set(layer, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.985 })
    })
  }, [])

  useEffect(() => {
    const layers = layersRef.current.filter(Boolean)
    if (!layers.length) return

    if (prefersReducedMotion()) {
      layers.forEach((layer, i) => {
        gsap.set(layer, { autoAlpha: i === index ? 1 : 0 })
      })
      return
    }

    layers.forEach((layer, i) => {
      const on = i === index
      gsap.to(layer, {
        autoAlpha: on ? 1 : 0,
        scale: on ? 1 : 0.985,
        duration: 1.1,
        ease: 'power2.inOut',
        overwrite: 'auto',
      })
    })
  }, [index])

  useEffect(() => {
    if (data.slides.length < 2) return undefined
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % data.slides.length)
    }, 5200)
    return () => window.clearInterval(id)
  }, [data.slides.length])

  useLayoutEffect(() => {
    const root = labelsRef.current
    if (!root || prefersReducedMotion()) return undefined

    const labels = root.querySelectorAll('.eng-label')
    gsap.set(labels, { autoAlpha: 0, y: 10 })
    const tl = gsap.timeline({ paused: true })
    tl.to(labels, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    })
    const reveal = attachScrollReveal(tl, root, { start: 'top 70%' })
    return () => {
      reveal?.kill()
      tl.kill()
    }
  }, [])

  return (
    <SplitPanel
      id={data.act.id}
      className="media-reveal"
      mediaSide="right"
      ariaLabelledby="design-act-title"
      media={
        <div className="media-reveal__stage">
          <div className="media-reveal__frame">
            {data.slides.map((slide, i) => (
              <div
                key={slide.src}
                ref={(el) => {
                  layersRef.current[i] = el
                }}
                className="media-reveal__layer"
                aria-hidden={i !== index}
              >
                <SlideMedia slide={slide} active={i === index} />
              </div>
            ))}
            <div ref={labelsRef} className="media-reveal__labels" aria-hidden="true">
              {data.labels.map((label) => (
                <EngineeringLabel key={label.text} {...label} />
              ))}
            </div>
          </div>
          <div className="media-reveal__dots" role="tablist" aria-label="Design media">
            {data.slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`media-reveal__dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                <span className="sr-only">Slide {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      }
    >
      <SectionHeading
        act={data.act}
        titleId="design-act-title"
        titleLines={data.titleLines}
        titleEm={data.titleEm}
        body={data.body}
        ruled
      />
    </SplitPanel>
  )
}

export default memo(MediaReveal)
