/** Force document scroll to top  works with and without Lenis. */
export function resetScroll(lenis) {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true })
  }
}

const NAV_SCROLL_OFFSET = -96

/** Scroll to an in-page section id (with or without leading #). */
export function scrollToHash(hash, lenis, options = {}) {
  if (!hash || hash === '#') return false

  const id = hash.startsWith('#') ? hash.slice(1) : hash
  const el = document.getElementById(id)
  if (!el) return false

  const offset = options.offset ?? NAV_SCROLL_OFFSET

  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: options.duration ?? 1.15,
    })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: options.behavior ?? 'smooth' })
  }

  return true
}

let activeLenis = null

export function setActiveLenis(lenis) {
  activeLenis = lenis ?? null
}

export function getActiveLenis() {
  return activeLenis
}

export function disableBrowserScrollRestoration() {
  if (typeof window === 'undefined') return
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
}
