import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import { safeSplitText, showElement } from '../motion/safeSplitText'
import { attachScrollReveal, whenFontsReady } from '../motion/scrollReveal'
import { SITE } from '../data/site'
import { CAPABILITY_LINKS } from '../data/capabilities'
import FadeUp from '../motion/FadeUp'
import { Brand, withBrand } from './Brand.jsx'

export default function SiteFooter() {
  const markRef = useRef(null)
  const markWrapRef = useRef(null)

  useLayoutEffect(() => {
    const el = markRef.current
    const wrap = markWrapRef.current
    if (!el) return undefined

    if (prefersReducedMotion()) {
      wrap?.classList.add('is-armed')
      showElement(el)
      return undefined
    }

    let split
    let scrollTrigger
    let cancelled = false

    // Keep mark invisible until chars sit under the mask.
    gsap.set(el, { autoAlpha: 0 })
    wrap?.classList.remove('is-armed')

    const run = () => {
      if (cancelled) return
      split = safeSplitText(el, { type: 'chars', mask: 'chars', charsClass: 'footer-mark-char' })
      if (!split?.chars?.length) {
        wrap?.classList.add('is-armed')
        showElement(el)
        return
      }

      gsap.set(split.chars, { yPercent: 110 })
      wrap?.classList.add('is-armed')
      showElement(el)

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
      tl.to(split.chars, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.045,
        delay: 0.12,
      })

      scrollTrigger = attachScrollReveal(tl, el, { start: 'top 92%' })
    }

    const cancelFonts = whenFontsReady(run)

    return () => {
      cancelled = true
      cancelFonts()
      scrollTrigger?.kill()
      split?.revert?.()
      wrap?.classList.remove('is-armed')
      showElement(el)
    }
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
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
              <Brand>{SITE.name}</Brand>
              <span>{SITE.tagline}</span>
              <a href={`mailto:${SITE.email.info}`}>{SITE.email.info}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </nav>
          </div>
          <div className="site-footer__col">
            <h4>Explore</h4>
            <nav aria-label="Capabilities">
              {CAPABILITY_LINKS.map(({ label, to }) => (
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

      <div className="site-footer__mark" ref={markWrapRef} aria-hidden="true">
        <span ref={markRef} className="r-brand">RIPPLES</span>
      </div>

      <div className="site-footer__bottom r-container">
        <span>
          &copy; {new Date().getFullYear()} {withBrand(SITE.legalName)}
        </span>
        <span className="site-footer__tagline-line">{SITE.tagline}</span>
        <button type="button" className="site-footer__top" onClick={scrollTop}>
          Back to top <span aria-hidden="true">&uarr;</span>
        </button>
      </div>
    </footer>
  )
}
