import { gsap } from './gsap'

/** Fire early so motion starts before the section feels empty. */
export const REVEAL_START = 'top 96%'

/** Parse GSAP-style "top 88%" into a viewport ratio (0–1). */
function startRatioFrom(start) {
  if (typeof start === 'number') return start
  const match = String(start).match(/top\s+(\d+(?:\.\d+)?)%/)
  return match ? Number(match[1]) / 100 : 0.96
}

function isPastRevealLine(trigger, ratio) {
  const rect = trigger.getBoundingClientRect()
  const line = window.innerHeight * ratio
  // Reached the reveal line, or already scrolled past (fast scroll / pin jumps).
  return rect.top <= line
}

/**
 * Once-only reveal when the element actually crosses into view.
 *
 * Uses IntersectionObserver + scroll/resize fallbacks. IO alone can miss
 * reveals when Lenis jumps a frame past the root, or when a one-shot
 * callback fails a position guard and never retries.
 */
export function attachScrollReveal(animation, trigger, options = {}) {
  const { start = REVEAL_START } = options
  if (!animation || !trigger) {
    animation?.play?.(0)
    return null
  }

  let played = false
  const ratio = startRatioFrom(start)
  let observer = null
  let rafId = 0

  const cleanup = () => {
    observer?.disconnect()
    observer = null
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    window.removeEventListener('scroll', onCheck)
    window.removeEventListener('resize', onCheck)
  }

  const play = () => {
    if (played) return
    played = true
    cleanup()
    animation.play(0)
  }

  const onCheck = () => {
    if (!played && isPastRevealLine(trigger, ratio)) play()
  }

  // Already in view / past (route change, pin refresh, below-fold mount).
  onCheck()
  if (played) {
    return {
      kill() {
        played = true
        cleanup()
      },
    }
  }

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        // Intersecting OR already above the reveal line (scrolled past the root).
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * ratio) {
          play()
        }
      },
      {
        root: null,
        // Generous bottom inset so IO fires early; position check gates the play.
        rootMargin: '0px 0px -6% 0px',
        threshold: 0,
      },
    )
    observer.observe(trigger)
  }

  // Lenis / fast wheel can skip IO state changes — poll on scroll + a few rAFs.
  window.addEventListener('scroll', onCheck, { passive: true })
  window.addEventListener('resize', onCheck, { passive: true })

  let frames = 0
  const tick = () => {
    onCheck()
    if (!played && frames++ < 12) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = 0
    }
  }
  rafId = requestAnimationFrame(tick)

  return {
    kill() {
      played = true
      cleanup()
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
    y = 28,
    duration = 0.65,
    stagger = 0,
    delay = 0.06,
    ease = 'power2.out',
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
