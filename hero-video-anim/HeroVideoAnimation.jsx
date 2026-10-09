import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildFramePath, useScrollFrameSequence } from './scroll-frames'
import { LenisProvider, useLenis } from './lenis'
import { DEFAULT_FRAMES, DEFAULT_SCROLL } from './defaults'
import { getAdaptiveProfile, isCoarsePointer } from './device'
import {
  HeroScrollContext,
  HeroScrollNotifierContext,
  createScrollNotifier,
} from './HeroScrollContext'
import './HeroVideoAnimation.css'

gsap.registerPlugin(ScrollTrigger)

function HeroVideoAnimationInner({
  frames,
  scrollLength = DEFAULT_SCROLL.scrollLength,
  scrub = DEFAULT_SCROLL.scrub,
  scaleFrom = DEFAULT_SCROLL.scaleFrom,
  vignetteFrom = DEFAULT_SCROLL.vignetteFrom,
  vignetteTo = DEFAULT_SCROLL.vignetteTo,
  showLoader = true,
  showProgressBar = true,
  showHint = true,
  showVignette = true,
  /** Static first-frame image shown instantly while the sequence boots. */
  posterSrc,
  className = '',
  id = 'hero-video-anim',
  children,
}) {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(null)
  const hintRef = useRef(null)
  const lenisRef = useLenis()
  const scrollNotifierRef = useRef(null)
  if (!scrollNotifierRef.current) {
    scrollNotifierRef.current = createScrollNotifier()
  }

  const frameOptions = { ...DEFAULT_FRAMES, ...frames }
  const resolvedPoster = posterSrc || buildFramePath(0, frameOptions)

  const {
    canvasRef,
    setProgress,
    forceRedraw,
    loadProgress,
    isReady,
    error,
  } = useScrollFrameSequence(frameOptions)

  const loading = !isReady
  // With a poster, skip the opaque full-screen loader so first paint is immediate.
  const showBlockingLoader = showLoader && loading && !resolvedPoster

  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return
    loading ? lenis.stop() : lenis.start()
  }, [loading, lenisRef])

  useEffect(() => {
    if (!isReady) return

    if (isCoarsePointer()) {
      ScrollTrigger.config({ limitCallbacks: true })
    }

    const root = rootRef.current
    const pin = pinRef.current
    const progress = progressRef.current
    const hint = hintRef.current

    if (!root || !pin) return

    let gsapCtx

    const coarse = isCoarsePointer()

    gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: scrollLength,
          scrub,
          pin: true,
          // Never pinReparent: moving a canvas in the DOM clears its bitmap
          // and breaks reverse-scrub frames on mobile.
          anticipatePin: coarse ? 0 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress)
            scrollNotifierRef.current?.notify(self.progress)
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`
            }
          },
          onLeave: () => {
            root?.classList.add('hva--passed')
          },
          onEnterBack: () => {
            root?.classList.remove('hva--passed')
            // Re-paint immediately so reverse scroll shows frames, not empty bg + copy.
            forceRedraw()
            setProgress(1)
            scrollNotifierRef.current?.notify(1)
          },
        },
      })

      tl.fromTo(
        '.hva-media',
        { scale: scaleFrom },
        { scale: 1, ease: 'none', duration: 1 },
        0,
      )

      if (showVignette) {
        tl.fromTo(
          '.hva-vignette',
          { opacity: vignetteFrom },
          { opacity: vignetteTo, ease: 'none', duration: 1 },
          0,
        )
      }

      if (hint && showHint) {
        tl.to(hint, { opacity: 0, y: -16, duration: 0.05 }, 0.03)
      }
    }, root)

    ScrollTrigger.refresh()
    setProgress(0)
    scrollNotifierRef.current?.notify(0)

    return () => {
      gsapCtx?.revert()
    }
  }, [
    isReady,
    setProgress,
    forceRedraw,
    scrollLength,
    scrub,
    scaleFrom,
    vignetteFrom,
    vignetteTo,
    showVignette,
    showHint,
  ])

  return (
    <div className={`hva ${className}`.trim()} id={id} ref={rootRef}>
      {showBlockingLoader && (
        <div className="hva-loader" aria-live="polite">
          <div className="hva-loader-track">
            <div
              className="hva-loader-bar"
              style={{ transform: `scaleX(${loadProgress})` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="hva-loader hva-loader--error" role="alert" />
      )}

      {showProgressBar && (
        <div className="hva-progress" ref={progressRef} aria-hidden="true" />
      )}

      <section className="hva-pin" ref={pinRef}>
        <div className="hva-media">
          {resolvedPoster ? (
            <img
              className={`hva-poster${isReady ? ' is-ready' : ''}`}
              src={resolvedPoster}
              alt=""
              decoding="async"
              fetchPriority="high"
            />
          ) : null}
          <canvas
            ref={canvasRef}
            className={`hva-canvas${isReady ? ' is-ready' : ''}`}
            aria-hidden="true"
          />
          {showVignette && <div className="hva-vignette" aria-hidden="true" />}
        </div>

        <div className="hva-overlay">
          <HeroScrollNotifierContext.Provider value={scrollNotifierRef}>
            <HeroScrollContext.Provider value={0}>
              {children}
            </HeroScrollContext.Provider>
          </HeroScrollNotifierContext.Provider>
          {showHint && (
            <div className="hva-hint" ref={hintRef}>
              <div className="hva-hint-line" />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/**
 * Ready-to-use scroll-driven hero animation.
 * Drop frames in public/frames/, install peer deps, import Lenis CSS  done.
 *
 * @example
 * <HeroVideoAnimation frames={{ frameCount: 241 }} />
 */
export default function HeroVideoAnimation({
  frames = {},
  lenis: lenisProp,
  lenisOptions,
  scrollLength: scrollLengthProp,
  scrub: scrubProp,
  posterSrc,
  ...props
}) {
  const profile = getAdaptiveProfile()
  const mergedFrames = { ...profile.frames, ...frames }
  const useLenis = lenisProp ?? profile.useLenis
  const scrollLength = scrollLengthProp ?? DEFAULT_SCROLL.scrollLength
  const scrub = scrubProp ?? profile.scroll.scrub ?? DEFAULT_SCROLL.scrub

  if (!useLenis) {
    return (
      <HeroVideoAnimationInner
        frames={mergedFrames}
        scrollLength={scrollLength}
        scrub={scrub}
        posterSrc={posterSrc}
        {...props}
      />
    )
  }

  return (
    <LenisProvider options={lenisOptions}>
      <HeroVideoAnimationInner
        frames={mergedFrames}
        scrollLength={scrollLength}
        scrub={scrub}
        posterSrc={posterSrc}
        {...props}
      />
    </LenisProvider>
  )
}

export { HeroVideoAnimationInner }
