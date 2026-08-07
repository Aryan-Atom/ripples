import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../motion/gsap'
import { attachScrollReveal } from '../../motion/scrollReveal'
import BlueprintGrid from './BlueprintGrid'
import SectionHeading from './SectionHeading'
import SplitPanel from './SplitPanel'
import { JOURNEY_BLUEPRINT } from '../../data/journey'

function FountainBlueprint() {
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    const root = svgRef.current
    if (!root || prefersReducedMotion()) return undefined

    const paths = root.querySelectorAll('.bp-draw')
    paths.forEach((path) => {
      const len = path.getTotalLength?.() ?? 400
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 0.9,
      })
    })

    const tl = gsap.timeline({ paused: true })
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 2.2,
      stagger: 0.1,
      ease: 'power2.inOut',
    })
    tl.fromTo(
      root.querySelectorAll('.bp-node'),
      { scale: 0, opacity: 0, transformOrigin: 'center' },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' },
      1.1,
    )

    const reveal = attachScrollReveal(tl, root, { start: 'top 78%' })
    return () => {
      reveal?.kill()
      tl.kill()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="blueprint-svg"
      viewBox="0 0 640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect className="bp-draw" x="36" y="36" width="568" height="448" stroke="currentColor" strokeWidth="0.75" />
      <line className="bp-draw" x1="36" y1="76" x2="604" y2="76" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
      <text x="52" y="64" className="blueprint-svg__meta" fill="currentColor">
        NEHRU GARDEN  POOL LAYOUT  1:100
      </text>

      <ellipse className="bp-draw" cx="320" cy="280" rx="200" ry="120" stroke="currentColor" strokeWidth="1.15" />
      <ellipse className="bp-draw" cx="320" cy="280" rx="140" ry="84" stroke="currentColor" strokeWidth="0.7" strokeDasharray="6 4" />
      <circle className="bp-draw" cx="320" cy="280" r="36" stroke="currentColor" strokeWidth="1" />
      <circle className="bp-draw" cx="320" cy="280" r="12" stroke="currentColor" strokeWidth="0.8" />

      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x = 320 + Math.cos(rad) * 168
        const y = 280 + Math.sin(rad) * 100
        return (
          <g key={deg}>
            <line
              className="bp-draw"
              x1="320"
              y1="280"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.55"
            />
            <circle className="bp-node" cx={x} cy={y} r="3.2" fill="currentColor" />
          </g>
        )
      })}

      <line className="bp-draw" x1="120" y1="430" x2="520" y2="430" stroke="currentColor" strokeWidth="0.55" />
      <line className="bp-draw" x1="120" y1="422" x2="120" y2="438" stroke="currentColor" strokeWidth="0.55" />
      <line className="bp-draw" x1="520" y1="422" x2="520" y2="438" stroke="currentColor" strokeWidth="0.55" />
      <text x="320" y="452" className="blueprint-svg__meta" fill="currentColor" textAnchor="middle">
        40.00 m
      </text>
    </svg>
  )
}

export default function BlueprintSection() {
  const data = JOURNEY_BLUEPRINT

  return (
    <SplitPanel
      id={data.act.id}
      className="blueprint-act"
      ariaLabelledby="blueprint-act-title"
      media={
        <>
          <BlueprintGrid className="blueprint-act__grid" particleCount={14} />
          <div className="blueprint-act__stage">
            <div className="blueprint-act__glow" aria-hidden="true" />
            <div className="blueprint-act__frame">
              <FountainBlueprint />
            </div>
          </div>
        </>
      }
    >
      <SectionHeading
        titleId="blueprint-act-title"
        titleLines={data.titleLines}
        titleEm={data.titleEm}
        body={data.body}
        ruled
      />
    </SplitPanel>
  )
}
