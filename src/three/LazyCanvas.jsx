import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { isMobileViewport, prefersReducedMotion } from '../motion/preferences'
import { useWebGLSupport } from './useWebGLSupport'

/** Mount R3F when near viewport (or immediately when eager). */
export default function LazyCanvas({
  children,
  className = '',
  fallback = null,
  camera,
  dpr,
  eager = false,
}) {
  const wrapRef = useRef(null)
  const [mounted, setMounted] = useState(eager)
  const webgl = useWebGLSupport()
  const mobile = isMobileViewport()
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (eager) {
      setMounted(true)
      return
    }
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: '50% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [eager])

  if (!webgl || reduced) {
    return (
      <div ref={wrapRef} className={className}>
        {fallback}
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {mounted ? (
        <Canvas
          dpr={dpr ?? (mobile ? 1 : [1, 1.75])}
          camera={camera}
          frameloop="always"
          gl={{
            antialias: !mobile,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
          onCreated={({ gl }) => {
            gl.setClearColor('#080A0C', 1)
          }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  )
}
