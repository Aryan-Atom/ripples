import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import VideoManager from './VideoManager.js'
import useIntersection from './useIntersection.js'
import useMouseTilt from './useMouseTilt.js'

function clearVideoSource(videoElement) {
  if (!videoElement) return
  videoElement.removeAttribute('src')
  videoElement.load()
}

function VideoCard({ item, isActive, onHoverStart, onHoverEnd, containerStyles }) {
  const { id, title, location, category, poster, video } = item
  const [ref, isVisible] = useIntersection({ rootMargin: '300px' })
  const videoRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { style: tiltStyle, onPointerMove, resetMotion } = useMouseTilt()
  const controls = useAnimation()
  const overlayControls = useAnimation()
  const glowControls = useAnimation()
  const shineControls = useAnimation()
  const borderControls = useAnimation()
  const cardOpacity = useMotionValue(1)

  const handleCanPlay = useCallback(() => {
    const node = videoRef.current
    if (!node) return
    if (isHovered && node.readyState >= 3) {
      node.play().catch(() => {})
      setHasPlayed(true)
      setIsLoading(false)
    }
  }, [isHovered])

  const prepareVideo = useCallback(() => {
    const node = videoRef.current
    if (!node || node.src) return
    if (!video) return
    node.src = video
    node.load()
    setIsLoading(true)
  }, [video])

  const resetVideo = useCallback(() => {
    const node = videoRef.current
    if (!node) return
    VideoManager.releaseIfCurrent(node)
    node.pause()
    node.currentTime = 0
    setIsLoading(false)
    clearVideoSource(node)
    setHasPlayed(false)
  }, [])

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true)
    prepareVideo()
    onHoverStart(id)
    controls.start({ scale: 1.03, transition: { type: 'spring', stiffness: 240, damping: 24 } })
    overlayControls.start({ y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } })
    glowControls.start({ opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } })
    shineControls.start({ x: ['-120%', '120%'], transition: { duration: 1.6, ease: 'easeOut', repeat: Infinity, repeatType: 'loop' } })
    borderControls.start({ borderColor: 'rgba(83, 210, 219, 0.24)', transition: { duration: 0.35, ease: 'easeOut' } })
    cardOpacity.set(1)
  }, [controls, borderControls, glowControls, hasPlayed, onHoverStart, overlayControls, prepareVideo, shineControls, id])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    resetMotion()
    if (controls) {
      controls.start({ scale: 1, transition: { type: 'spring', stiffness: 210, damping: 24 } })
    }
    overlayControls.start({ y: 16, opacity: 0.88, transition: { duration: 0.35, ease: 'easeOut' } })
    glowControls.start({ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })
    shineControls.stop()
    borderControls.start({ borderColor: 'rgba(255, 227, 179, 0.08)', transition: { duration: 0.35, ease: 'easeOut' } })
    setTimeout(() => resetVideo(), 80)
    onHoverEnd(id)
  }, [borderControls, controls, glowControls, onHoverEnd, overlayControls, resetMotion, resetVideo, id, shineControls])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return undefined

    node.addEventListener('canplay', handleCanPlay)
    return () => {
      node.removeEventListener('canplay', handleCanPlay)
    }
  }, [handleCanPlay])

  useEffect(() => {
    if (!isHovered || !videoRef.current) return undefined
    const node = videoRef.current
    if (!node.src) {
      prepareVideo()
    }
    VideoManager.setActive(id, node)
    return () => {}
  }, [id, isHovered, prepareVideo])

  useEffect(() => {
    if (!isActive && isHovered) {
      setIsHovered(false)
      resetVideo()
    }
  }, [isActive, isHovered, resetVideo])

  useEffect(() => {
    const node = videoRef.current
    if (!node || !hasPlayed) return undefined

    const timeout = window.setTimeout(() => {
      if (!isHovered && node && node.src) {
        clearVideoSource(node)
      }
    }, 4000)

    return () => window.clearTimeout(timeout)
  }, [hasPlayed, isHovered])

  const cardClasses = useMemo(() => `video-card video-card--${item.layout}`, [item.layout])

  const posterStyle = useMemo(
    () => ({ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.26)), url(${poster})` }),
    [poster],
  )

  const showVideo = isHovered && hasPlayed

  return (
    <motion.article
      ref={ref}
      className={cardClasses}
      style={{ ...containerStyles, opacity: cardOpacity, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      animate={controls}
      onPointerMove={onPointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 1.02 }}
      drag={false}
      dragListener={false}
    >
      <motion.div
        className="video-card__inner"
        style={tiltStyle}
      >
        <div className="video-card__surface" aria-hidden="true">
          <motion.div className="video-card__glow" animate={glowControls} initial={{ opacity: 0 }} />
          <motion.div className="video-card__shine" animate={shineControls} />
          <motion.div className="video-card__border" animate={borderControls} initial={{ borderColor: 'rgba(255, 227, 179, 0.08)' }} />

          <div className="video-card__media">
            <div className="video-card__poster" style={posterStyle} />
            {isVisible && (
              <video
                ref={videoRef}
                className="video-card__video"
                preload="none"
                playsInline
                muted
                loop
                aria-hidden="true"
                style={{ opacity: showVideo ? 1 : 0 }}
              />
            )}
            {isLoading && <div className="video-card__loader" aria-hidden="true" />}
          </div>

          <motion.div className="video-card__overlay" animate={overlayControls} initial={{ y: 16, opacity: 0.88 }}>
            <p className="video-card__label">{category}</p>
            <h3 className="video-card__title">{title}</h3>
            <p className="video-card__meta">{location}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default memo(VideoCard)
