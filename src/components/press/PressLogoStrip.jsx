import { PRESS_LOGOS } from '../../data/press'

/**
 * “As featured in” publication wordmarks — grayscale by default, color on hover.
 */
export default function PressLogoStrip({ className = '' }) {
  return (
    <div className={`press-logos ${className}`.trim()} role="list" aria-label="As featured in">
      <p className="press-logos__eyebrow">As featured in</p>
      <ul className="press-logos__list">
        {PRESS_LOGOS.map((logo) => (
          <li className="press-logos__item" key={logo.publicationId} role="listitem">
            <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </div>
  )
}
