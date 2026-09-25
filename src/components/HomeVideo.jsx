import { useLayoutEffect, useRef } from 'react'
import LazyVideo from './LazyVideo.jsx'
import { gsap, prefersReducedMotion } from '../motion/gsap'
import { asset } from '../data/assets.js'

export default function HomeVideo() {
  const frameRef = useRef(null)
  const captionRef = useRef(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const caption = captionRef.current
    if (!frame) return undefined

    const reduced = prefersReducedMotion()
    const tweens = []

    if (!reduced) {
      tweens.push(
        gsap.fromTo(
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
        ),
      )
    }

    if (caption && !reduced) {
      gsap.set(caption, { autoAlpha: 0, y: 36 })
      tweens.push(
        gsap.to(caption, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          delay: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: frame,
            start: 'top 70%',
            once: true,
          },
        }),
      )
    }

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
      if (caption) gsap.set(caption, { clearProps: 'all' })
    }
  }, [])

  return (
    <section className="home-video home-section" aria-label="Engineering showcase">
      <div className="home-video__frame" ref={frameRef}>
        <LazyVideo
          className="home-video__media"
          src={asset('company_intro.mp4')}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="home-video__scrim" aria-hidden="true" />
        <div className="home-video__caption" ref={captionRef}>
          <p className="r-label">Behind the curtain</p>
          <p className="home-video__caption-line">
            The <em>engineering</em> beneath the spectacle
          </p>
        </div>
      </div>
    </section>
  )
}
