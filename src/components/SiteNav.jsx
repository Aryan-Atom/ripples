import { Link } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../data/site'

export default function SiteNav({ variant = 'solid' }) {
  const isHero = variant === 'hero'

  return (
    <header
      className={`site-nav site-nav--${variant}`}
      style={isHero ? { '--nav-items': NAV_LINKS.length } : undefined}
    >
      <div className={`site-nav__inner${isHero ? '' : ' r-container'}`}>
        <Link to="/" className="site-nav__logo">
          <img src="/assets/logo.png" alt="Ripples logo" className="site-nav__logo-icon" />
          {SITE.name}
        </Link>
        <nav className="site-nav__links" aria-label="Primary">
          {NAV_LINKS.map(({ label }) => (
            <span key={label} className="site-nav__item">
              {label}
            </span>
          ))}
        </nav>
      </div>
    </header>
  )
}
