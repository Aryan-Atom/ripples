import { useEffect, useRef, useState } from 'react'
import { BRAND_LOGOS } from '../data/brands'
import SplitLines from '../motion/SplitLines'
import FadeUp from '../motion/FadeUp'

function LogoSet({ logos, load, ariaHidden = false }) {
  return (
    <div className="brand-trail__set" aria-hidden={ariaHidden || undefined}>
      {logos.map((logo, i) => (
        <div className="brand-trail__item" key={`${logo.alt}-${i}`}>
          <img
            src={load ? logo.src : undefined}
            alt={ariaHidden ? '' : logo.alt}
            width={224}
            height={160}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default function BrandTrail() {
  const sectionRef = useRef(null)
  const [loadLogos, setLoadLogos] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || loadLogos) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadLogos(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadLogos])

  return (
    <section
      ref={sectionRef}
      className="brand-trail home-section"
      aria-label="Trusted partners"
    >
      <div className="brand-trail__head r-container">
        <div>
          <FadeUp as="p" className="r-label">
            Trusted by
          </FadeUp>
          <SplitLines as="h2" className="r-display">
            Institutions &amp; brands <em>That demand excellence</em>
          </SplitLines>
        </div>
      </div>

      <div className="brand-trail__track-wrap">
        <div className="brand-trail__row">
          <LogoSet logos={BRAND_LOGOS} load={loadLogos} />
          <LogoSet logos={BRAND_LOGOS} load={loadLogos} ariaHidden />
        </div>
      </div>
    </section>
  )
}
