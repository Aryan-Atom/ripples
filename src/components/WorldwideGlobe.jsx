import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import { getWorldCountriesCache, prefetchWorldCountries } from '../data/worldwide'

const MOBILE_QUERY = '(max-width: 960px)'

/** Dim  soft ice-white dots (active). */
const LAND_DOT = 'rgba(142, 184, 212, 0.26)'

export default function WorldwideGlobe({ variant = 'ambient' }) {
  const isAmbient = variant === 'ambient'
  const containerRef = useRef(null)
  const globeRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [countries, setCountries] = useState(() => getWorldCountriesCache() ?? [])
  const [isVisible, setIsVisible] = useState(isAmbient)
  const [isMobile, setIsMobile] = useState(false)

  const rendererConfig = useMemo(
    () => ({
      alpha: true,
      antialias: !isAmbient && !isMobile,
      powerPreference: 'high-performance',
    }),
    [isAmbient, isMobile],
  )

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: '#0c1a28',
        emissive: '#061018',
        emissiveIntensity: 0.35,
        specular: '#1a3044',
        shininess: 18,
        transparent: true,
        opacity: isAmbient ? 0.55 : 0.85,
      }),
    [isAmbient],
  )

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isAmbient) return undefined

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
  }, [isAmbient])

  useEffect(() => {
    if (!isVisible) return undefined

    const cached = getWorldCountriesCache()
    if (cached?.length) {
      setCountries(cached)
      return undefined
    }

    let cancelled = false
    prefetchWorldCountries().then((features) => {
      if (!cancelled) setCountries(features)
    })

    return () => {
      cancelled = true
    }
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

  const configureGlobe = useCallback(() => {
    const globe = globeRef.current
    if (!globe) return

    const renderer = globe.renderer?.()
    if (renderer) {
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.style.background = 'transparent'
    }

    globe.pointOfView({ lat: 22, lng: -35, altitude: isAmbient ? 1.75 : 2.1 }, 0)

    const controls = globe.controls()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = isAmbient ? (isMobile ? 0.12 : 0.18) : isMobile ? 0.35 : 0.5
      controls.enableZoom = false
      controls.enablePan = false
      controls.enableRotate = !isAmbient && !isMobile
    }
  }, [isAmbient, isMobile])

  useEffect(() => {
    if (!globeRef.current || !isVisible) return undefined
    configureGlobe()
    return () => {
      const controls = globeRef.current?.controls()
      if (controls) controls.autoRotate = false
    }
  }, [isVisible, isMobile, size.width, size.height, configureGlobe])

  const hexDotResolution = isAmbient
    ? isMobile
      ? 7
      : 9
    : isMobile
      ? 6
      : 7

  return (
    <div ref={containerRef} className="worldwide-globe worldwide-globe--ambient" aria-hidden="true">
      {isVisible && size.width > 0 && size.height > 0 && (
        <div className="worldwide-globe__stage">
          <Globe
            ref={globeRef}
            width={size.width}
            height={size.height}
            rendererConfig={rendererConfig}
            globeOffset={isAmbient ? [0.52, 0.32, 0] : [0, 0, 0]}
            backgroundColor="rgba(0,0,0,0)"
            showGlobe
            globeMaterial={globeMaterial}
            showAtmosphere={!isAmbient}
            atmosphereColor="rgba(142, 184, 212, 0.08)"
            atmosphereAltitude={0.12}
            onGlobeReady={configureGlobe}
            hexPolygonsData={countries}
            hexPolygonResolution={3}
            hexPolygonMargin={isAmbient ? 0.22 : 0.18}
            hexPolygonUseDots
            hexPolygonColor={() => LAND_DOT}
            hexPolygonDotResolution={hexDotResolution}
            hexPolygonAltitude={0.006}
            hexPolygonCurvatureResolution={isAmbient ? 3 : 4}
            hexPolygonsTransitionDuration={0}
            enablePointerInteraction={false}
          />
        </div>
      )}
    </div>
  )
}
