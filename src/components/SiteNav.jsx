import { Link } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../data/site'

export default function SiteNav({ variant = 'solid' }) {
  return (
    <header className={`site-nav site-nav--${variant}`}>
      <div className="site-nav__inner r-container">
        <Link to="/" className="site-nav__logo">
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
