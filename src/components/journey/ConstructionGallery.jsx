import { useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../motion/gsap'
import { attachScrollReveal, createRevealTimeline } from '../../motion/scrollReveal'
import SectionHeading from './SectionHeading'
import SplitPanel from './SplitPanel'
import { JOURNEY_CONSTRUCTION } from '../../data/journey'

export default function ConstructionGallery({ data = JOURNEY_CONSTRUCTION }) {
  const collageRef = useRef(null)

  useLayoutEffect(() => {
    const root = collageRef.current
    if (!root || prefersReducedMotion()) return undefined

    const cells = root.querySelectorAll('.construction-gallery__cell')
    const tl = createRevealTimeline(cells, {
      y: 28,
      duration: 0.85,
      stagger: 0.07,
      fromProps: { scale: 0.985, filter: 'grayscale(1) blur(4px)' },
      toProps: { scale: 1, filter: 'grayscale(1) blur(0px)' },
      clearProps: 'transform,opacity,visibility',
    })
    if (!tl) return undefined

    const reveal = attachScrollReveal(tl, root, { start: 'top 78%' })
    return () => {
      reveal?.kill()
      tl.kill()
    }
  }, [data.images])

  return (
    <SplitPanel
      id={data.act.id}
      className="construction-gallery"
      ariaLabelledby="construction-act-title"
      media={
        <div ref={collageRef} className="construction-gallery__collage">
          {data.images.map((image, i) => (
            <figure
              key={image.src}
              className={`construction-gallery__cell construction-gallery__cell--${i + 1}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      }
    >
      <SectionHeading
        titleId="construction-act-title"
        titleLines={data.titleLines}
        titleClassName="construction-gallery__title"
      />
    </SplitPanel>
  )
}
