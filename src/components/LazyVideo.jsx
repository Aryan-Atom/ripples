import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const activePlayers = new Set()
const DEFAULT_MAX_CONCURRENT = 0

/** One viewport ahead so the current section's video is ready while the user is still on the previous one. */
export const PREV_SECTION_ROOT_MARGIN = '0px 0px 100% 0px'

function armInlinePlayback(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
}

function tryPlay(video, maxConcurrent) {
  if (!video?.src) return

  armInlinePlayback(video)

  if (!maxConcurrent) {
    video.play().catch(() => {})
    return
  }

  activePlayers.add(video)

  if (activePlayers.size > maxConcurrent) {
    const oldest = activePlayers.values().next().value
    if (oldest && oldest !== video) {
      activePlayers.delete(oldest)
      oldest.pause()
    }
  }

  video.play().catch(() => {})
}

function stopPlay(video) {
  if (!video) return
  activePlayers.delete(video)
  video.pause()
}

function isInExpandedViewport(el, rootMargin) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || 0
  // Parse "top right bottom left" or "vertical horizontal" — we only need bottom expansion.
  const parts = String(rootMargin || '0px')
    .trim()
    .split(/\s+/)
  let bottomExpand = 0
  if (parts.length === 1) bottomExpand = parts[0]
  else if (parts.length === 2) bottomExpand = parts[0]
  else if (parts.length >= 3) bottomExpand = parts[2]

  const bottomPx = /%$/.test(bottomExpand)
    ? (parseFloat(bottomExpand) / 100) * vh
    : parseFloat(bottomExpand) || 0

  return rect.bottom > 0 && rect.top < vh + bottomPx
}

const LazyVideo = forwardRef(function LazyVideo(
  {
    className,
    src,
    autoPlay,
    loadDelay = 0,
    maxConcurrent = DEFAULT_MAX_CONCURRENT,
    rootMargin = PREV_SECTION_ROOT_MARGIN,
    eager = false,
    /** Start fetching immediately; playback still waits for visibility (unless eager). */
    prefetch = false,
    onReady,
    ...props
  },
  ref,
) {
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(eager || prefetch)
  const shouldLoadRef = useRef(eager || prefetch)
  const isVisibleRef = useRef(eager)
  const loadTimerRef = useRef(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  shouldLoadRef.current = shouldLoad

  useImperativeHandle(ref, () => videoRef.current, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const syncPlayback = () => {
      if (!video.getAttribute('src') && !video.src) return
      if (isVisibleRef.current && autoPlay) {
        tryPlay(video, maxConcurrent)
      } else if (!isVisibleRef.current) {
        stopPlay(video)
      }
    }

    const markVisible = (inView) => {
      isVisibleRef.current = inView
      if (inView && !shouldLoadRef.current) {
        if (loadDelay > 0) {
          loadTimerRef.current = window.setTimeout(() => {
            shouldLoadRef.current = true
            setShouldLoad(true)
          }, loadDelay)
        } else {
          shouldLoadRef.current = true
          setShouldLoad(true)
        }
      }
      if (!inView && loadTimerRef.current) {
        window.clearTimeout(loadTimerRef.current)
        loadTimerRef.current = null
      }
      syncPlayback()
    }

    if (eager || prefetch) {
      shouldLoadRef.current = true
      setShouldLoad(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => markVisible(entry.isIntersecting),
      { rootMargin, threshold: [0, 0.01, 0.15, 0.4] },
    )

    observer.observe(video)

    // Seed visibility: eager clips start playing; others use layout + rootMargin.
    // WebKit often skips the first IO callback until scroll.
    if (eager || isInExpandedViewport(video, rootMargin)) {
      markVisible(true)
    }

    return () => {
      observer.disconnect()
      if (loadTimerRef.current) window.clearTimeout(loadTimerRef.current)
      stopPlay(video)
    }
  }, [autoPlay, loadDelay, maxConcurrent, rootMargin, eager, prefetch])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad || !src) return undefined

    armInlinePlayback(video)

    const handleReady = () => {
      onReadyRef.current?.(video)
      if ((isVisibleRef.current || eager) && autoPlay) {
        tryPlay(video, maxConcurrent)
      }
    }

    video.addEventListener('loadeddata', handleReady)
    video.addEventListener('canplay', handleReady)

    // Request play immediately so Safari unlocks media events.
    if ((isVisibleRef.current || eager) && autoPlay) {
      tryPlay(video, maxConcurrent)
    }
    if (video.readyState >= 2) handleReady()

    return () => {
      video.removeEventListener('loadeddata', handleReady)
      video.removeEventListener('canplay', handleReady)
    }
  }, [shouldLoad, src, autoPlay, maxConcurrent, eager])

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad || eager || prefetch ? 'auto' : 'none'}
      autoPlay={false}
      playsInline
      muted
      {...props}
      // Keep muted last so callers can't accidentally unmute and block autoplay.
      muted
    />
  )
})

export default LazyVideo
