import { BRAND_LOGOS } from '../data/brands'

export default function BrandTrail() {
  const items = [...BRAND_LOGOS, ...BRAND_LOGOS]

  return (
    <section className="brand-trail home-section" aria-label="Trusted partners">
      <div className="brand-trail__head r-container">
        <div>
          <span className="r-label">Backed by</span>
          <h2 className="r-display">
            Institutions &amp; brands
            <br />
            <em>that demand excellence</em>
          </h2>
        </div>
      </div>

      <div className="brand-trail__track-wrap">
        <div className="brand-trail__row">
          <div className="brand-trail__set">
            {items.map((logo, i) => (
              <div className="brand-trail__item" key={`${logo.alt}-${i}`}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
