import { gsap, ScrollTrigger } from './gsap'

/** Reveal when the top of the element crosses this viewport line. */
export const REVEAL_START = 'top 82%'

/** Parse GSAP-style "top 88%" into a viewport ratio (0–1). */
function startRatioFrom(start) {
  if (typeof start === 'number') return start
  const match = String(start).match(/top\s+(\d+(?:\.\d+)?)%/)
  return match ? Number(match[1]) / 100 : 0.82
}

function isPastRevealLine(trigger, ratio) {
  const rect = trigger.getBoundingClientRect()
  const line = window.innerHeight * ratio
  // Reached the reveal line, or already scrolled past (fast scroll / pin jumps).
  return rect.top <= line
}

/**
 * Home hero uses ScrollTrigger pin — while `.hva-pin` is fixed, below-fold
 * sections can intersect the viewport under an opaque hero. Playing then
 * finishes the motion unseen. Wait until the pin releases.
 */
function isHeroPinActive() {
  const pin = document.querySelector('.hva-pin')
  if (!pin) return false
  return getComputedStyle(pin).position === 'fixed'
}

/**
 * Once-only reveal when the element actually crosses into view.
 *
 * Uses IntersectionObserver + scroll/resize/Lenis fallbacks. Never plays on
 * bare IO intersect alone, and never while the home hero pin is covering.
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
    window.removeEventListener('ripples:scroll', onCheck)
    ScrollTrigger.removeEventListener('refresh', onCheck)
  }

  const play = () => {
    if (played) return
    played = true
    cleanup()
    animation.play(0)
  }

  const onCheck = () => {
    if (played) return
    // Don't burn the once-only play under the pinned hero.
    if (isHeroPinActive()) return
    if (isPastRevealLine(trigger, ratio)) play()
  }

  // Already in view / past (route change, below-fold mount after pin).
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
    const bottomInset = Math.round((1 - ratio) * 100)
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        // Gate on the reveal line — never play on bare isIntersecting.
        if (isPastRevealLine(trigger, ratio)) onCheck()
      },
      {
        root: null,
        // Align IO band with the reveal line so it still notifies nearby.
        rootMargin: `0px 0px -${bottomInset}% 0px`,
        threshold: [0, 0.01, 0.05],
      },
    )
    observer.observe(trigger)
  }

  // Lenis / pin refresh / fast wheel can skip IO — poll on scroll + refresh.
  window.addEventListener('scroll', onCheck, { passive: true })
  window.addEventListener('resize', onCheck, { passive: true })
  window.addEventListener('ripples:scroll', onCheck)
  ScrollTrigger.addEventListener('refresh', onCheck)

  let frames = 0
  const tick = () => {
    onCheck()
    // Longer poll: pin release + Lenis settle can take more than a few frames.
    if (!played && frames++ < 90) {
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
    duration = 0.75,
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
