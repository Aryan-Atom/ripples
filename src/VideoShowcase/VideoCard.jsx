import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import useIntersection from './useIntersection.js'
import VideoManager from './VideoManager.js'

const MAX_ROTATION = 4
const RESET_TRANSITION = { duration: 0.32, ease: [0.22, 1, 0.36, 1] }

function clearVideoSource(video) {
  if (!video) return
  video.removeAttribute('src')
  video.load()
}

function VideoCard({ id, poster, video, title, category, className, isActive, isDimmed, onHoverStart, onHoverEnd }) {
  const [ref, isVisible] = useIntersection({ rootMargin: '300px' })
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const boundsRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [readyToPlay, setReadyToPlay] = useState(false)
  const controls = useAnimation()
  const cardScale = useMotionValue(1)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const contentOpacity = useMotionValue(1)

  const posterSrc = useMemo(() => poster, [poster])

  const updateTilt = useCallback(() => {
    frameRef.current = null
    const bounds = boundsRef.current
    if (!bounds) return

    const relX = ((pointerRef.current.x - bounds.left) / bounds.width - 0.5) * 2
    const relY = ((pointerRef.current.y - bounds.top) / bounds.height - 0.5) * 2

    rotateY.set(relX * MAX_ROTATION)
    rotateX.set(-relY * MAX_ROTATION)
    cardScale.set(1.03)
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

  const handlePointerMove = useCallback((event) => {
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
  }, [updateTilt])

  const loadVideo = useCallback(() => {
    const node = videoRef.current
    if (!node || node.src) return
    node.src = video
    node.preload = 'none'
    node.load()
    setReadyToPlay(true)
  }, [video])

  const pauseAndReset = useCallback(() => {
    const node = videoRef.current
    if (!node) return
    VideoManager.releaseIfCurrent(node)
    node.pause()
    node.currentTime = 0
    clearVideoSource(node)
    setReadyToPlay(false)
  }, [])

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true)
    onHoverStart(id)
    loadVideo()
    controls.start({ y: -8, transition: RESET_TRANSITION })
    contentOpacity.set(1)
  }, [controls, contentOpacity, id, loadVideo, onHoverStart])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    resetTilt()
    onHoverEnd(id)
    controls.start({ y: 0, transition: RESET_TRANSITION })
    contentOpacity.set(0.96)
    pauseAndReset()
  }, [controls, id, onHoverEnd, pauseAndReset, resetTilt, contentOpacity])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return undefined

    const handleCanPlay = () => {
      if (isHovered && node.readyState >= 3) {
        VideoManager.setActive(id, node)
        node.play().catch(() => {})
      }
    }

    node.addEventListener('canplay', handleCanPlay)
    return () => {
      node.removeEventListener('canplay', handleCanPlay)
    }
  }, [id, isHovered])

  useEffect(() => {
    if (!isActive && isHovered) {
      handlePointerLeave()
    }
  }, [handlePointerLeave, isActive, isHovered])

  useEffect(() => pauseAndReset, [pauseAndReset])

  const cardClasses = useMemo(
    () => `video-card ${className} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'video-card--dimmed' : ''}`,
    [className, isDimmed, isHovered],
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
      style={{ x: 0, scale: cardScale, rotateX, rotateY, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="video-card__media">
        <img className="video-card__poster" src={posterSrc} alt={title} loading="lazy" />
        {isVisible && (
          <video
            ref={videoRef}
            className={`video-card__video ${isHovered ? 'is-active' : ''}`}
            preload="none"
            muted
            playsInline
            loop
            aria-hidden="true"
          />
        )}
        <div className="video-card__layer video-card__glow" />
        <div className="video-card__layer video-card__shine" />
        <div className="video-card__content" style={{ opacity: contentOpacity }}>
          <p className="video-card__label">{category}</p>
          <h3 className="video-card__title">{title}</h3>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(VideoCard)
