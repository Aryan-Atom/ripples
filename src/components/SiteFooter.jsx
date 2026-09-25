import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { COLOR_LOGO } from '../data/assets.js'
import { FOOTER_EXPLORE_LINKS } from '../data/capabilities'
import FadeUp from '../motion/FadeUp'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import { attachScrollReveal, createRevealTimeline } from '../motion/scrollReveal'

export default function SiteFooter() {
  const markRef = useRef(null)
  const brandRef = useRef(null)

  useLayoutEffect(() => {
    const wrap = markRef.current
    const brand = brandRef.current
    if (!wrap || !brand) return undefined

    if (prefersReducedMotion()) {
      gsap.set(brand, { clearProps: 'all' })
      return undefined
    }

    const tl = createRevealTimeline(brand, {
      y: 0,
      duration: 1.15,
      delay: 0.04,
      ease: 'power4.out',
      fromProps: { yPercent: 55, scale: 0.94 },
      toProps: { scale: 1 },
    })
    if (!tl) return undefined

    const reveal = attachScrollReveal(tl, wrap, { start: 'top 92%' })

    return () => {
      reveal?.kill()
      tl.kill()
      gsap.set(brand, { clearProps: 'all' })
    }
  }, [])

  const scrollTop = () => {
    const event = new Event('ripples:scroll-top', { cancelable: true })
    if (window.dispatchEvent(event)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const factory = SITE.addresses.find((address) => address.label === 'Factory')
  const offices = SITE.addresses.filter((address) => address.label !== 'Factory')

  return (
    <footer className="site-footer">
      <div className="site-footer__inner r-container">
        <FadeUp className="site-footer__cta" y={36}>
          <p className="r-label">Next</p>
          <p className="site-footer__cta-line">
            Have a <em>spectacle</em> in mind?
          </p>
          <a className="site-footer__cta-mail" href={`mailto:${SITE.email.work}`}>
            {SITE.email.work}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </FadeUp>

        <FadeUp className="site-footer__grid" stagger={0.1} y={30}>
          <div className="site-footer__col">
            <h4>Brand</h4>
            <nav aria-label="Brand">
              <span>Ripples Water Technology</span>
              <span>{SITE.tagline}</span>
              <a href={`mailto:${SITE.email.info}`}>{SITE.email.info}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </nav>
          </div>
          <div className="site-footer__col">
            <h4>Explore</h4>
            <nav aria-label="Capabilities">
              {FOOTER_EXPLORE_LINKS.map(({ label, to }) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-footer__col">
            <h4>Offices</h4>
            {offices.map((address) => (
              <nav aria-label={address.label} key={address.label}>
                {address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </nav>
            ))}
          </div>
          {factory && (
            <div className="site-footer__col">
              <h4>Factory</h4>
              <nav aria-label={factory.label}>
                {factory.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </nav>
            </div>
          )}
        </FadeUp>
      </div>

      <div className="site-footer__mark" ref={markRef}>
        <img
          ref={brandRef}
          src={COLOR_LOGO}
          alt="Ripples water technology"
          className="site-footer__mark-brand"
        />
      </div>

      <div className="site-footer__bottom r-container">
        <span>
          &copy; {new Date().getFullYear()} {SITE.legalName}
        </span>
        <span className="site-footer__tagline-line">Sculpting water since 1989</span>
        <button type="button" className="site-footer__top" onClick={scrollTop}>
          Back to top <span aria-hidden="true">&uarr;</span>
        </button>
      </div>
    </footer>
  )
}
