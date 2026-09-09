import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from './gsap'
import {
  disableBrowserScrollRestoration,
  getActiveLenis,
  resetScroll,
  scrollToHash,
} from './scrollReset'

function refreshScrollTriggers() {
  ScrollTrigger.refresh()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function scrollToHashWhenReady(hash, attempt = 0) {
  const lenis = getActiveLenis()
  if (scrollToHash(hash, lenis, { immediate: true, behavior: 'auto' })) {
    refreshScrollTriggers()
    return
  }

  if (attempt >= 12) {
    resetScroll(lenis)
    refreshScrollTriggers()
    return
  }

  requestAnimationFrame(() => scrollToHashWhenReady(hash, attempt + 1))
}

/** Reset scroll and stale triggers when navigating between routes. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
    window.getSelection()?.removeAllRanges()

    if (hash) {
      scrollToHashWhenReady(hash)
      return undefined
    }

    resetScroll(getActiveLenis())
    requestAnimationFrame(() => {
      resetScroll(getActiveLenis())
      refreshScrollTriggers()
    })
  }, [pathname, hash])

  return null
}
