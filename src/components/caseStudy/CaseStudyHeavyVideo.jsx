import { useCallback, useEffect, useRef, useState } from 'react'

function armInlinePlayback(video) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
}

function playSafe(video) {
  if (!video?.src) return Promise.resolve()
  armInlinePlayback(video)
  return video.play()
}

/**
 * Case Study only  large Intro / final clips.
 * Attach src on first view, play while visible, pause when off-screen.
 */
export default function CaseStudyHeavyVideo({
  src,
  poster,
  className,
  posterClassName,
  videoClassName,
  veilClassName,
  rootMargin = '20% 0px',
}) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)
  const visibleRef = useRef(false)

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
    if (rect.bottom > 0 && rect.top < window.innerHeight) sync(true)

    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return undefined

    let cancelled = false

    const resume = () => {
      if (cancelled || !visibleRef.current) return
      playSafe(video).catch(() => {})
    }

    const onReady = () => {
      if (cancelled) return
      setReady(true)
      if (visibleRef.current && video.paused) resume()
    }

    const onBlocked = () => {
      document.addEventListener('pointerdown', resume, { once: true })
      document.addEventListener('touchend', resume, { once: true, passive: true })
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)

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
      document.removeEventListener('pointerdown', resume)
      document.removeEventListener('touchend', resume)
    }
  }, [active, src])

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <img
        className={`${posterClassName}${ready ? ' is-faded' : ''}`}
        src={poster}
        alt=""
        decoding="async"
      />
      <video
        ref={setVideoNode}
        className={`${videoClassName}${ready ? ' is-ready' : ''}`}
        src={active ? src : undefined}
        poster={poster}
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
