import { SITE, NAV_LINKS } from '../data/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <div className="site-footer__brand">{SITE.legalName}</div>
          <p className="site-footer__tagline">{SITE.tagline}</p>
        </div>

        <div className="site-footer__col">
          <h4>Explore</h4>
          <nav aria-label="Footer">
            {NAV_LINKS.map(({ label }) => (
              <span key={label}>{label}</span>
            ))}
          </nav>
        </div>

        <div className="site-footer__col">
          <h4>Reach us</h4>
          <nav aria-label="Contact">
            <a href={`mailto:${SITE.email.work}`}>{SITE.email.work}</a>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
          </nav>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>
          &copy; {new Date().getFullYear()} {SITE.legalName}
        </span>
        <span>All rights reserved</span>
      </div>
    </footer>
  )
}
