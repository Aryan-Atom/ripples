/** Wordmark for the visible name “Ripples”  Ripples Logo (glyphs: R i p l e s). */

const BRAND_PATTERN = /(RIPPLES|Ripples)/g

export function Brand({ children = 'Ripples', className = '' }) {
  const word = children === 'RIPPLES' ? 'Ripples' : children
  return <span className={className ? `r-brand ${className}` : 'r-brand'}>{word}</span>
}

/** Wrap every “Ripples” / “RIPPLES” in a string with the brand wordmark. */
export function withBrand(text) {
  if (typeof text !== 'string') return text
  if (!text.includes('Ripples') && !text.includes('RIPPLES')) return text

  return text.split(BRAND_PATTERN).map((part, index) => {
    if (part === 'Ripples' || part === 'RIPPLES') {
      return <Brand key={index}>Ripples</Brand>
    }
    return part
  })
}

export default Brand
