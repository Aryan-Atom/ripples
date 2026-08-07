/** Force document scroll to top  works with and without Lenis. */
export function resetScroll(lenis) {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true })
  }
}

export function disableBrowserScrollRestoration() {
  if (typeof window === 'undefined') return
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
}
