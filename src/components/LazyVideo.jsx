import { useEffect, useRef, useState } from 'react'

const activePlayers = new Set()
const DEFAULT_MAX_CONCURRENT = 0

function tryPlay(video, maxConcurrent) {
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
  activePlayers.delete(video)
  video.pause()
}

export default function LazyVideo({
  className,
  src,
  autoPlay,
  loadDelay = 0,
  maxConcurrent = DEFAULT_MAX_CONCURRENT,
  rootMargin = '32px 0px',
  onReady,
  ...props
}) {
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const isVisibleRef = useRef(false)
  const loadTimerRef = useRef(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const syncPlayback = () => {
      if (!video.src) return
      if (isVisibleRef.current && autoPlay) {
        tryPlay(video, maxConcurrent)
      } else {
        stopPlay(video)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.15

        if (isVisibleRef.current && !shouldLoad) {
          if (loadDelay > 0) {
            loadTimerRef.current = window.setTimeout(() => {
              setShouldLoad(true)
            }, loadDelay)
          } else {
            setShouldLoad(true)
          }
        }

        if (!isVisibleRef.current && loadTimerRef.current) {
          window.clearTimeout(loadTimerRef.current)
          loadTimerRef.current = null
        }

        syncPlayback()
      },
      { rootMargin, threshold: [0, 0.15, 0.4] },
    )

    observer.observe(video)
    return () => {
      observer.disconnect()
      if (loadTimerRef.current) window.clearTimeout(loadTimerRef.current)
      stopPlay(video)
    }
  }, [autoPlay, loadDelay, maxConcurrent, shouldLoad, rootMargin])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad || !src) return undefined

    const handleReady = () => {
      onReadyRef.current?.(video)
      if (isVisibleRef.current && autoPlay) {
        tryPlay(video, maxConcurrent)
      }
    }

    video.addEventListener('loadeddata', handleReady)
    if (video.readyState >= 2) handleReady()

    return () => video.removeEventListener('loadeddata', handleReady)
  }, [shouldLoad, src, autoPlay, maxConcurrent])

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? 'auto' : 'none'}
      autoPlay={false}
      {...props}
    />
  )
}
