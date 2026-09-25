import { useCallback, useLayoutEffect, useRef } from 'react'
import { useHeroScrollSubscribe } from 'hero-video-anim'
import { COLOR_LOGO } from './data/assets.js'

/** Global hero progress where the end wordmark begins to appear. */
export const LOGO_END_START = 0.86

/** Mobile starts the end logo a touch earlier so it has room to settle. */
const LOGO_END_START_MOBILE = 0.84

export function getLogoEndStart() {
  if (typeof window === 'undefined') return LOGO_END_START
  return window.matchMedia('(max-width: 720px), (pointer: coarse)').matches
    ? LOGO_END_START_MOBILE
    : LOGO_END_START
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

/**
 * End-of-hero lockup: hidden while the video + copy play, then fades in
 * as the official color Ripples wordmark.
 */
export default function HeroLogoReveal() {
  const wrapRef = useRef(null)

  const update = useCallback((progress) => {
    const wrap = wrapRef.current
    if (!wrap) return

    const start = getLogoEndStart()
    if (progress < start) {
      wrap.style.opacity = '0'
      wrap.style.visibility = 'hidden'
      return
    }

    const local = Math.min(1, (progress - start) / (1 - start))
    const opacity = easeOutCubic(local)
    wrap.style.visibility = 'visible'
    wrap.style.opacity = String(opacity)
  }, [])

  useHeroScrollSubscribe(update)

  useLayoutEffect(() => {
    update(0)
  }, [update])

  return (
    <div ref={wrapRef} className="hero-logo-end" style={{ opacity: 0 }}>
      <img
        src={COLOR_LOGO}
        alt="Ripples water technology"
        className="hero-logo-end__brand"
      />
    </div>
  )
}
