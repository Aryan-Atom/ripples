import { gsap, ScrollTrigger } from './gsap'

/** Default trigger — fires early so fast scroll is less likely to skip reveals. */
export const REVEAL_START = 'top 94%'

ScrollTrigger.defaults({
  fastScrollEnd: true,
  invalidateOnRefresh: true,
})

ScrollTrigger.config({ limitCallbacks: true })

/**
 * If the user has already scrolled past the trigger line, finish immediately
 * so content never stays hidden.
 */
export function finishIfAlreadyRevealed(animation, scrollTrigger) {
  if (!animation || !scrollTrigger) return

  const complete = () => {
    animation.progress(1)
  }

  if (scrollTrigger.progress > 0 || scrollTrigger.scroll() >= scrollTrigger.start) {
    complete()
    return
  }

  requestAnimationFrame(() => {
    ScrollTrigger.update()
    if (scrollTrigger.progress > 0 || scrollTrigger.scroll() >= scrollTrigger.start) {
      complete()
    }
  })
}

/** Once-only scroll trigger wired to a paused timeline or tween. */
export function attachScrollReveal(animation, trigger, options = {}) {
  const { start = REVEAL_START, end, markers = false, id } = options

  const scrollTrigger = ScrollTrigger.create({
    trigger,
    start,
    end,
    markers,
    id,
    once: true,
    fastScrollEnd: true,
    invalidateOnRefresh: true,
    animation,
  })

  finishIfAlreadyRevealed(animation, scrollTrigger)
  return scrollTrigger
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
