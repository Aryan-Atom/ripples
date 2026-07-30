import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import { safeSplitText } from '../motion/safeSplitText'
import { NAV_LINKS, SITE } from '../data/site'
import FadeUp from '../motion/FadeUp'

export default function SiteFooter() {
  const markRef = useRef(null)

  useLayoutEffect(() => {
    const el = markRef.current
    if (!el || prefersReducedMotion()) return undefined

    let split
    let tween
    let cancelled = false

    const run = () => {
      if (cancelled) return
      split = safeSplitText(el, { type: 'chars', mask: 'chars', charsClass: 'footer-mark-char' })
      if (!split?.chars?.length) return
      tween = gsap.from(split.chars, {
        yPercent: 104,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: 'top 94%', once: true },
      })
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(run).catch(run)
    } else {
      run()
    }

    return () => {
      cancelled = true
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert?.()
    }
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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
            <h4>Sitemap</h4>
            <nav aria-label="Footer">
              <Link to="/">Home</Link>
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={label} to={to}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-footer__col">
            <h4>Contact</h4>
            <nav aria-label="Contact">
              <a href={`mailto:${SITE.email.info}`}>{SITE.email.info}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
              <span>{SITE.hours}</span>
            </nav>
          </div>
          {SITE.addresses.map((address) => (
            <div className="site-footer__col" key={address.label}>
              <h4>{address.label}</h4>
              <nav aria-label={address.label}>
                {address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </nav>
            </div>
          ))}
        </FadeUp>
      </div>

      <div className="site-footer__mark" aria-hidden="true">
        <span ref={markRef}>RIPPLES</span>
      </div>

      <div className="site-footer__bottom r-container">
        <span>
          &copy; {new Date().getFullYear()} {SITE.legalName}
        </span>
        <span className="site-footer__tagline-line">{SITE.tagline}</span>
        <button type="button" className="site-footer__top" onClick={scrollTop}>
          Back to top <span aria-hidden="true">&uarr;</span>
        </button>
      </div>
    </footer>
  )
}
