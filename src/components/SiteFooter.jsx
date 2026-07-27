import { SITE } from '../data/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer site-footer--minimal">
      <div className="site-footer__bottom">
        <span>
          &copy; {new Date().getFullYear()} {SITE.legalName}
        </span>
        <span>All rights reserved</span>
      </div>
    </footer>
  )
}
