import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { NAV_LINKS, SITE } from '../data/site'
import { Brand } from './Brand.jsx'

const PRIMARY_LINKS = NAV_LINKS.filter((link) => link.to !== '/contact')
const CONTACT_LINK = NAV_LINKS.find((link) => link.to === '/contact')

const MOBILE_QUERY = '(max-width: 768px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const onChange = (event) => setIsMobile(event.matches)
    onChange(media)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export default function SiteNav({ variant = 'solid' }) {
  const isHero = variant === 'hero'
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const backdropRef = useRef(null)
  const menuRef = useRef(null)
  const itemsRef = useRef([])
  const hasAnimated = useRef(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!isMobile) {
      hasAnimated.current = false
      setMenuOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return

    const header = headerRef.current
    const backdrop = backdropRef.current
    const menu = menuRef.current
    const items = itemsRef.current.filter(Boolean)
    if (!header || !backdrop || !menu || items.length === 0) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true
        gsap.set([backdrop, menu], { visibility: 'hidden', pointerEvents: 'none', opacity: 0 })
        gsap.set(items, { opacity: 0, y: 18 })
        if (!menuOpen) return
      }

      if (menuOpen) {
        gsap.set([backdrop, menu], { visibility: 'visible' })
        gsap.set(backdrop, { pointerEvents: 'auto' })
        gsap.set(menu, { pointerEvents: 'auto' })

        if (reducedMotion) {
          gsap.set([backdrop, menu, items], { opacity: 1, y: 0, scaleY: 1, clearProps: 'transform' })
          return
        }

        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.55 }, 0)
          .fromTo(
            menu,
            { opacity: 0, y: -14, scaleY: 0.9, transformOrigin: 'top center' },
            { opacity: 1, y: 0, scaleY: 1, duration: 0.7 },
            0.06,
          )
          .fromTo(
            items,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' },
            0.18,
          )
      } else {
        if (reducedMotion) {
          gsap.set([backdrop, menu, items], { opacity: 0, clearProps: 'transform' })
          gsap.set([backdrop, menu], { visibility: 'hidden', pointerEvents: 'none' })
          return
        }

        gsap
          .timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
              gsap.set([backdrop, menu], { visibility: 'hidden', pointerEvents: 'none' })
            },
          })
          .to(items, { opacity: 0, y: -10, duration: 0.22, stagger: 0.04 }, 0)
          .to(
            menu,
            { opacity: 0, y: -10, scaleY: 0.94, duration: 0.38, transformOrigin: 'top center' },
            0.08,
          )
          .to(backdrop, { opacity: 0, duration: 0.4 }, 0.12)
          .set(backdrop, { pointerEvents: 'none' }, '>')
          .set(menu, { pointerEvents: 'none' }, '<')
      }
    }, header)

    return () => ctx.revert()
  }, [menuOpen, isMobile])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className={`site-nav site-nav--${variant}${menuOpen ? ' site-nav--open' : ''}${isMobile ? ' site-nav--mobile' : ''}`}
      style={isHero ? { '--nav-items': PRIMARY_LINKS.length } : undefined}
    >
      <div className={`site-nav__inner${isHero ? '' : ' r-container'}`}>
        <Link to="/" className="site-nav__logo" onClick={closeMenu}>
          <img src="/assets/logo.png" alt="Ripples logo" className="site-nav__logo-icon" />
          <Brand>{SITE.name}</Brand>
        </Link>

        {!isMobile && (
          <nav className="site-nav__links" aria-label="Primary">
            {PRIMARY_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) => `site-nav__item${isActive ? ' is-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            {CONTACT_LINK && (
              <NavLink
                to={CONTACT_LINK.to}
                className={({ isActive }) =>
                  `site-nav__cta${isActive ? ' is-active' : ''}`
                }
              >
                {CONTACT_LINK.label}
              </NavLink>
            )}
          </nav>
        )}

        {isMobile && (
          <button
            type="button"
            className="site-nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-nav__toggle-bar" aria-hidden="true" />
            <span className="site-nav__toggle-bar" aria-hidden="true" />
            <span className="site-nav__toggle-bar" aria-hidden="true" />
          </button>
        )}
      </div>

      {isMobile && (
        <>
          <div
            ref={backdropRef}
            className="site-nav__mobile-backdrop"
            aria-hidden={!menuOpen}
            onClick={closeMenu}
          />
          <div
            id="site-nav-menu"
            ref={menuRef}
            className="site-nav__mobile-menu"
            aria-hidden={!menuOpen}
          >
            <nav className="site-nav__mobile-links" aria-label="Mobile primary">
              {PRIMARY_LINKS.map(({ label, to }, index) => (
                <NavLink
                  key={label}
                  to={to}
                  ref={(node) => {
                    itemsRef.current[index] = node
                  }}
                  className={({ isActive }) =>
                    `site-nav__mobile-item${isActive ? ' is-active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ))}
              {CONTACT_LINK && (
                <NavLink
                  to={CONTACT_LINK.to}
                  ref={(node) => {
                    itemsRef.current[PRIMARY_LINKS.length] = node
                  }}
                  className={({ isActive }) =>
                    `site-nav__mobile-item site-nav__mobile-cta${isActive ? ' is-active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {CONTACT_LINK.label}
                </NavLink>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
