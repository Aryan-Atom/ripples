import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import useIntersection from './useIntersection.js'
import VideoManager from './VideoManager.js'

const MAX_ROTATION = 4
const HOVER_SCALE = 1.02

function clearVideoSource(video) {
  if (!video) return
  video.removeAttribute('src')
  video.load()
}

function VideoCard({
  id,
  poster,
  video,
  title,
  category,
  className,
  isActive,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  playCue = false,
  allowUnmute = false,
}) {
  const [ref, isVisible] = useIntersection({ rootMargin: '300px' })
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const boundsRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const cardScale = useMotionValue(1)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const posterSrc = useMemo(() => poster, [poster])

  const updateTilt = useCallback(() => {
    frameRef.current = null
    const bounds = boundsRef.current
    if (!bounds) return

    const relX = ((pointerRef.current.x - bounds.left) / bounds.width - 0.5) * 2
    const relY = ((pointerRef.current.y - bounds.top) / bounds.height - 0.5) * 2

    rotateY.set(relX * MAX_ROTATION)
    rotateX.set(-relY * MAX_ROTATION)
    cardScale.set(HOVER_SCALE)
  }, [cardScale, rotateX, rotateY])

  const resetTilt = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    rotateX.set(0)
    rotateY.set(0)
    cardScale.set(1)
  }, [cardScale, rotateX, rotateY])

  const handlePointerMove = useCallback(
    (event) => {
      const target = event.currentTarget
      if (!target) return

      if (!boundsRef.current) {
        boundsRef.current = target.getBoundingClientRect()
      }

      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY

      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(updateTilt)
      }
    },
    [updateTilt],
  )

  const loadVideo = useCallback(() => {
    const node = videoRef.current
    if (!node || node.src) return
    node.src = video
    node.preload = 'none'
    node.load()
  }, [video])

  const pauseAndReset = useCallback(() => {
    const node = videoRef.current
    if (!node) return
    VideoManager.releaseIfCurrent(node)
    node.pause()
    node.currentTime = 0
    node.muted = true
    clearVideoSource(node)
    setIsPlaying(false)
    setMuted(true)
  }, [])

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true)
    onHoverStart(id)
    loadVideo()
    cardScale.set(HOVER_SCALE)
  }, [cardScale, id, loadVideo, onHoverStart])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    resetTilt()
    onHoverEnd(id)
    pauseAndReset()
  }, [id, onHoverEnd, pauseAndReset, resetTilt])

  const toggleMute = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const node = videoRef.current
      if (!node || !allowUnmute) return
      const next = !muted
      node.muted = next
      setMuted(next)
      if (!next) {
        node.play().catch(() => {})
      }
    },
    [allowUnmute, muted],
  )

  useEffect(() => {
    const node = videoRef.current
    if (!node) return undefined

    const handleCanPlay = () => {
      if (isHovered && node.readyState >= 3) {
        VideoManager.setActive(id, node)
        node
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }

    const handlePlaying = () => setIsPlaying(true)

    node.addEventListener('canplay', handleCanPlay)
    node.addEventListener('playing', handlePlaying)
    return () => {
      node.removeEventListener('canplay', handleCanPlay)
      node.removeEventListener('playing', handlePlaying)
    }
  }, [id, isHovered])

  useEffect(() => {
    if (!isActive && isHovered) {
      handlePointerLeave()
    }
  }, [handlePointerLeave, isActive, isHovered])

  useEffect(() => pauseAndReset, [pauseAndReset])

  const cardClasses = useMemo(
    () =>
      [
        'video-card',
        className,
        isHovered ? 'is-hovered' : '',
        isPlaying ? 'is-playing' : '',
        isDimmed ? 'video-card--dimmed' : '',
        playCue ? 'video-card--cue' : '',
      ]
        .filter(Boolean)
        .join(' '),
    [className, isDimmed, isHovered, isPlaying, playCue],
  )

  return (
    <motion.article
      ref={ref}
      className={cardClasses}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 60, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: 0,
        scale: cardScale,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="video-card__media">
        <img className="video-card__poster" src={posterSrc} alt={title} loading="lazy" />
        {isVisible && (
          <video
            ref={videoRef}
            className={`video-card__video${isPlaying ? ' is-active' : ''}`}
            preload="none"
            muted={muted}
            playsInline
            loop
            aria-hidden="true"
          />
        )}
        <div className="video-card__layer video-card__glow" />
        <div className="video-card__layer video-card__shine" />
        <div className="video-card__scrim" aria-hidden="true" />

        {playCue && (
          <div className="video-card__play-cue" aria-hidden="true">
            <span className="video-card__play-cue-ring">
              <span className="video-card__play-cue-triangle" />
            </span>
          </div>
        )}

        <div className="video-card__content">
          <p className="video-card__label">{category}</p>
          <h3 className="video-card__title">{title}</h3>
        </div>

        {allowUnmute && isHovered && (
          <button
            type="button"
            className={`video-card__mute${muted ? ' is-muted' : ''}`}
            onClick={toggleMute}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              {muted ? (
                <>
                  <path
                    d="M4 9v6h3.5L14 20V4L7.5 9H4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 9.5l4 5m0-5l-4 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <path
                    d="M4 9v6h3.5L14 20V4L7.5 9H4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 9a4 4 0 010 6m2.5-8.5a7 7 0 010 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
    </motion.article>
  )
}

export default memo(VideoCard)
