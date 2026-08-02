import { useCallback, useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { WORLDWIDE_GEOJSON_URL, WORLDWIDE_PRESENCE } from '../data/worldwide'

const MOBILE_QUERY = '(max-width: 768px)'
const ACCENT_DIM = 'rgba(83, 210, 219, 0.45)'
const GLOW_PAD = 1.08

const GPS_PIN_SVG = `
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
  </svg>
`

function createGpsPin(label) {
  const el = document.createElement('div')
  el.className = 'worldwide-gps-pin'
  el.innerHTML = GPS_PIN_SVG
  el.title = label
  return el
}

export default function WorldwideGlobe() {
  const containerRef = useRef(null)
  const globeRef = useRef(null)
  const pinCacheRef = useRef(new Map())
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const getHtmlElement = useCallback((d) => {
    const key = d.label
    if (!pinCacheRef.current.has(key)) {
      pinCacheRef.current.set(key, createGpsPin(key))
    }
    return pinCacheRef.current.get(key)
  }, [])

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return undefined

    const controller = new AbortController()

    fetch(WORLDWIDE_GEOJSON_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setCountries(data.features ?? []))
      .catch(() => {})

    return () => controller.abort()
  }, [isVisible])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect()
      setSize({ width: Math.round(width), height: Math.round(height) })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!globeRef.current || !isVisible) return undefined

    const controls = globeRef.current.controls()
    if (!controls) return undefined

    controls.autoRotate = true
    controls.autoRotateSpeed = isMobile ? 0.35 : 0.5
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = !isMobile

    return () => {
      controls.autoRotate = false
    }
  }, [isVisible, isMobile, size.width, size.height])

  const hexResolution = 3
  const renderW = Math.round(size.width * GLOW_PAD)
  const renderH = Math.round(size.height * GLOW_PAD)

  return (
    <div ref={containerRef} className="worldwide-globe" aria-hidden="true">
      {isVisible && size.width > 0 && size.height > 0 && (
        <div className="worldwide-globe__stage">
          <Globe
            ref={globeRef}
            width={renderW}
            height={renderH}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
            showAtmosphere
            atmosphereColor="rgba(83, 210, 219, 0.28)"
            atmosphereAltitude={0.14}
            hexPolygonsData={countries}
            hexPolygonResolution={hexResolution}
            hexPolygonMargin={0.18}
            hexPolygonUseDots
            hexPolygonColor={() => ACCENT_DIM}
            hexPolygonDotResolution={isMobile ? 6 : 7}
            hexPolygonAltitude={0.002}
            hexPolygonCurvatureResolution={4}
            hexPolygonsTransitionDuration={0}
            htmlElementsData={WORLDWIDE_PRESENCE}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.012}
            htmlElement={getHtmlElement}
            htmlTransitionDuration={400}
            enablePointerInteraction={!isMobile}
          />
        </div>
      )}
    </div>
  )
}
