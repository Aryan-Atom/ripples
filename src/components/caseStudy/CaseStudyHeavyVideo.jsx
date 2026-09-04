import { useEffect, useRef, useState } from 'react'

function playSafe(video) {
  if (!video?.src) return
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  const run = () => {
    video.play().catch(() => {})
  }
  if (video.readyState >= 2) run()
  else {
    video.addEventListener('canplay', run, { once: true })
    video.addEventListener('loadeddata', run, { once: true })
  }
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

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          setActive(true)
          playSafe(videoRef.current)
        } else {
          videoRef.current?.pause()
        }
      },
      { rootMargin, threshold: 0 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) return undefined

    const onReady = () => {
      setReady(true)
      if (visibleRef.current) playSafe(video)
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    if (visibleRef.current) playSafe(video)
    if (video.readyState >= 2) onReady()

    return () => {
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
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
        ref={videoRef}
        className={`${videoClassName}${ready ? ' is-ready' : ''}`}
        src={active ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
      {veilClassName ? <div className={veilClassName} /> : null}
    </div>
  )
}
