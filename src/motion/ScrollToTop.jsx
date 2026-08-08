import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from './gsap'
import { disableBrowserScrollRestoration, resetScroll } from './scrollReset'

/** Reset scroll and stale triggers when navigating between routes. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
    resetScroll()
    // Nav stays mounted across routes  clear leftover drag-selection highlights
    window.getSelection()?.removeAllRanges()

    requestAnimationFrame(() => {
      resetScroll()
      ScrollTrigger.refresh()
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  }, [pathname])

  return null
}
