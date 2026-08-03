import { useLayoutEffect, useRef } from 'react'
import LazyVideo from './LazyVideo.jsx'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import FadeUp from '../motion/FadeUp'

export default function HomeVideo() {
  const frameRef = useRef(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame || prefersReducedMotion()) return undefined

    const tween = gsap.fromTo(
      frame,
      { clipPath: 'inset(8% 9% round 28px)' },
      {
        clipPath: 'inset(0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top 85%',
          end: 'top 22%',
          scrub: 0.6,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="home-video home-section" aria-label="Engineering showcase">
      <div className="home-video__frame" ref={frameRef}>
        <LazyVideo
          className="home-video__media"
          src="/assets/video_engineering.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="home-video__scrim" aria-hidden="true" />
        <FadeUp className="home-video__caption" start="top 60%">
          <p className="r-label">Behind the curtain</p>
          <p className="home-video__caption-line">
            The <em>engineering</em> beneath the spectacle
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
