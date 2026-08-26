/** Wordmark for the visible name “Ripples” — Montserrat ExtraBold. */

const BRAND_PATTERN = /(RIPPLES|Ripples)/g

export function Brand({ children = 'Ripples', className = '' }) {
  return <span className={className ? `r-brand ${className}` : 'r-brand'}>{children}</span>
}

/** Wrap every “Ripples” / “RIPPLES” in a string with the brand wordmark. */
export function withBrand(text) {
  if (typeof text !== 'string') return text
  if (!text.includes('Ripples') && !text.includes('RIPPLES')) return text

  return text.split(BRAND_PATTERN).map((part, index) => {
    if (part === 'Ripples' || part === 'RIPPLES') {
      return <Brand key={index}>{part}</Brand>
    }
    return part
  })
}

export default Brand
