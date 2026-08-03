import { gsap, SplitText } from './gsap'

/**
 * SplitText wrapper — never leaves the element invisible if splitting fails
 * (common with nested <em>, ad-blocked fonts, or StrictMode race).
 */
export function safeSplitText(el, config) {
  try {
    return SplitText.create(el, config)
  } catch (error) {
    console.warn('[SplitText] split failed, showing plain text:', error)
    return null
  }
}

export function showElement(el) {
  if (el) gsap.set(el, { autoAlpha: 1, clearProps: 'visibility,opacity' })
}
