import { gsap } from './gsap'

/** Fire when the element's top reaches this % of the viewport height. */
export const REVEAL_START = 'top 88%'

/** Parse GSAP-style "top 88%" into a viewport ratio (0–1). */
function startRatioFrom(start) {
  if (typeof start === 'number') return start
  const match = String(start).match(/top\s+(\d+(?:\.\d+)?)%/)
  return match ? Number(match[1]) / 100 : 0.88
}

/**
 * Once-only reveal when the element actually crosses into view.
 *
 * Uses IntersectionObserver instead of ScrollTrigger: a long pinned hero
 * makes ST think below-fold blocks are already past on load/refresh, so
 * they animate before you scroll.
 */
export function attachScrollReveal(animation, trigger, options = {}) {
  const { start = REVEAL_START } = options
  if (!animation || !trigger || typeof IntersectionObserver === 'undefined') {
    animation?.play?.(0)
    return null
  }

  let played = false
  const ratio = startRatioFrom(start)
  // Shrink the root from the bottom so we fire near `top XX%`, not at the edge
  const bottomInsetPct = Math.max(0, Math.round((1 - ratio) * 100))

  const play = () => {
    if (played) return
    played = true
    observer.disconnect()
    animation.play(0)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry?.isIntersecting) return
      // Extra guard: element's top must be above the reveal line
      if (entry.boundingClientRect.top <= window.innerHeight * ratio) {
        play()
      }
    },
    {
      root: null,
      rootMargin: `0px 0px -${bottomInsetPct}% 0px`,
      threshold: 0,
    },
  )

  observer.observe(trigger)

  return {
    kill() {
      played = true
      observer.disconnect()
    },
  }
}

/**
 * Preferred reveal pattern: set hidden state, build paused timeline, attach scroll.
 * Avoids gsap.from() applying hidden values before ScrollTrigger is ready.
 */
export function createRevealTimeline(targets, vars = {}) {
  const items = gsap.utils.toArray(targets)
  if (items.length === 0) return null

  const {
    y = 44,
    duration = 1.1,
    stagger = 0,
    delay = 0,
    ease = 'power3.out',
    fromProps = {},
    toProps = {},
    clearProps = 'transform,opacity,visibility',
  } = vars

  gsap.set(items, { autoAlpha: 0, y, ...fromProps })

  const tl = gsap.timeline({ paused: true, defaults: { ease } })
  tl.to(items, {
    autoAlpha: 1,
    y: 0,
    yPercent: 0,
    duration,
    stagger,
    delay,
    clearProps,
    ...toProps,
  })

  return tl
}

/** Run after fonts load; resolves immediately when fonts are already ready. */
export function whenFontsReady(callback) {
  if (!document.fonts?.ready) {
    callback()
    return () => {}
  }

  let cancelled = false
  document.fonts.ready
    .then(() => {
      if (!cancelled) callback()
    })
    .catch(() => {
      if (!cancelled) callback()
    })

  return () => {
    cancelled = true
  }
}
