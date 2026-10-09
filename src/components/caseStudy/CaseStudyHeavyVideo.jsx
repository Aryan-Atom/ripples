import { useCallback, useEffect, useRef, useState } from 'react'
import {
  armAutoplayGestureRetry,
  armInlinePlayback,
  playSafe,
} from '../../utils/videoAutoplay.js'

/**
 * Case Study only — large Intro / final clips.
 * Same load + muted autoplay behavior on mobile and desktop.
 */
export default function CaseStudyHeavyVideo({
  src,
  poster,
  className,
  posterClassName,
  videoClassName,
  veilClassName,
  rootMargin = '0px 0px 100% 0px',
  eager = false,
}) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(eager)
  const [ready, setReady] = useState(false)
  const visibleRef = useRef(eager)

  const setVideoNode = useCallback((node) => {
    videoRef.current = node
    if (node) {
      armInlinePlayback(node)
      node.dataset.autoplayIntent = '1'
    }
  }, [])

  useEffect(() => {
    armAutoplayGestureRetry()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const sync = (inView) => {
      visibleRef.current = inView
      const video = videoRef.current
      if (inView) {
        setActive(true)
        if (video) {
          video.dataset.shouldPlay = '1'
          playSafe(video).catch(() => {})
        }
      } else if (video) {
        video.dataset.shouldPlay = '0'
        video.pause()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { rootMargin, threshold: [0, 0.01] },
    )
    observer.observe(root)

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
      video.dataset.shouldPlay = '1'
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

    armInlinePlayback(video)
    video.dataset.autoplayIntent = '1'
    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('loadedmetadata', onReady)
    document.addEventListener('visibilitychange', onVis)

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
      video.removeEventListener('loadedmetadata', onReady)
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
