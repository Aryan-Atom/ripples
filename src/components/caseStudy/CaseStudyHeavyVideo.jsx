import { useCallback, useEffect, useRef, useState } from 'react'

function armInlinePlayback(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
}

function playSafe(video) {
  if (!video) return Promise.resolve()
  armInlinePlayback(video)
  if (!video.getAttribute('src') && !video.src) return Promise.resolve()
  return video.play()
}

/**
 * Case Study only — large Intro / final clips.
 * Attach src on first view (or immediately when eager), play while visible.
 */
export default function CaseStudyHeavyVideo({
  src,
  poster,
  className,
  posterClassName,
  videoClassName,
  veilClassName,
  rootMargin = '0px 0px 100% 0px',
  /** Start loading + playing on mount (above-the-fold openers). */
  eager = false,
}) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(eager)
  const [ready, setReady] = useState(false)
  const visibleRef = useRef(eager)

  const setVideoNode = useCallback((node) => {
    videoRef.current = node
    if (node) armInlinePlayback(node)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const sync = (inView) => {
      visibleRef.current = inView
      if (inView) {
        setActive(true)
        playSafe(videoRef.current).catch(() => {})
      } else {
        videoRef.current?.pause()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { rootMargin, threshold: [0, 0.01] },
    )
    observer.observe(root)

    // WebKit often skips the first IntersectionObserver callback until scroll.
    const rect = root.getBoundingClientRect()
    if (eager || (rect.bottom > 0 && rect.top < window.innerHeight)) {
      sync(true)
    }

    return () => observer.disconnect()
  }, [rootMargin, eager])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active || !src) return undefined

    let cancelled = false

    const resume = () => {
      if (cancelled || !visibleRef.current) return
      playSafe(video).catch(() => {})
    }

    const onReady = () => {
      if (cancelled) return
      setReady(true)
      if (visibleRef.current) resume()
    }

    const onBlocked = () => {
      document.addEventListener('pointerdown', resume, { once: true })
      document.addEventListener('touchend', resume, { once: true, passive: true })
    }

    const onVis = () => {
      if (document.visibilityState === 'visible') resume()
      else video.pause()
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    document.addEventListener('visibilitychange', onVis)

    // Call play() immediately. Safari and iOS do not fire canplay until
    // playback is requested, so waiting for that event deadlocks autoplay.
    if (visibleRef.current) {
      playSafe(video).then(
        () => {
          if (!cancelled && video.readyState >= 2) setReady(true)
        },
        (error) => {
          if (cancelled || !visibleRef.current) return
          if (error?.name === 'NotAllowedError') onBlocked()
        },
      )
    }
    if (video.readyState >= 2) onReady()

    return () => {
      cancelled = true
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      document.removeEventListener('visibilitychange', onVis)
      document.removeEventListener('pointerdown', resume)
      document.removeEventListener('touchend', resume)
    }
  }, [active, src])

  const showPoster = Boolean(poster && posterClassName)

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      {showPoster ? (
        <img
          className={`${posterClassName}${ready ? ' is-faded' : ''}`}
          src={poster}
          alt=""
          decoding="async"
        />
      ) : null}
      <video
        ref={setVideoNode}
        className={`${videoClassName}${showPoster ? (ready ? ' is-ready' : '') : ' is-ready'}`}
        src={active ? src : undefined}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
      {veilClassName ? <div className={veilClassName} /> : null}
    </div>
  )
}
