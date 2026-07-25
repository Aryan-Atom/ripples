import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HOME_GALLERY } from '../data/homeGallery'

gsap.registerPlugin(ScrollTrigger)

function waitForImages(container) {
  const images = [...container.querySelectorAll('img')]
  if (images.length === 0) return Promise.resolve()

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalHeight > 0) {
            resolve()
            return
          }
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        }),
    ),
  )
}

export default function HomeGallery() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!section || !pin || !track || !viewport) return

    let ctx
    let cancelled = false

    const init = async () => {
      await waitForImages(section)
      if (cancelled) return

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 901px)', () => {
          const getDistance = () =>
            Math.max(track.scrollHeight - viewport.clientHeight, 0)

          gsap.set(track, { y: 0 })

          const tween = gsap.to(track, {
            y: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              pin: pin,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })

          const onRefresh = () => ScrollTrigger.refresh()
          const ro = new ResizeObserver(onRefresh)
          ro.observe(viewport)
          ro.observe(track)
          window.addEventListener('load', onRefresh)

          return () => {
            ro.disconnect()
            window.removeEventListener('load', onRefresh)
            tween.scrollTrigger?.kill()
            tween.kill()
          }
        })
      }, section)

      ScrollTrigger.refresh()
    }

    init()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section className="home-gallery" ref={sectionRef} aria-label="Project gallery">
      <div className="home-gallery__pin" ref={pinRef}>
        <div className="home-gallery__layout r-container">
          <div className="home-gallery__copy">
            <span className="r-label">{HOME_GALLERY.label}</span>
            <h2 className="r-display home-gallery__title">
              {HOME_GALLERY.title}
              <br />
              <em>{HOME_GALLERY.titleEm}</em>
            </h2>
            <p className="r-body home-gallery__body">{HOME_GALLERY.body}</p>
          </div>

          <div className="home-gallery__media">
            <div className="home-gallery__viewport" ref={viewportRef}>
              <div className="home-gallery__track" ref={trackRef}>
                {HOME_GALLERY.images.map((image) => (
                  <figure className="home-gallery__figure" key={image.src}>
                    <img src={image.src} alt={image.alt} decoding="async" />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
