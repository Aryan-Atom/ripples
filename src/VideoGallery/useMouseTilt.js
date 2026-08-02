import { useCallback, useMemo, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'

const MAX_ROTATION = 4
const MOVE_DISTANCE = 10

export default function useMouseTilt() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const frameRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const boundsRef = useRef(null)

  const update = useCallback(() => {
    frameRef.current = null
    const bounds = boundsRef.current
    if (!bounds) return

    const relX = ((pointerRef.current.x - bounds.left) / bounds.width - 0.5) * 2
    const relY = ((pointerRef.current.y - bounds.top) / bounds.height - 0.5) * 2

    rotateY.set(relX * MAX_ROTATION)
    rotateX.set(-relY * MAX_ROTATION)
    offsetX.set(relX * MOVE_DISTANCE)
    offsetY.set(relY * MOVE_DISTANCE)
  }, [offsetX, offsetY, rotateX, rotateY])

  const onPointerMove = useCallback(
    (event) => {
      const target = event.currentTarget
      if (!target) return

      if (!boundsRef.current) {
        boundsRef.current = target.getBoundingClientRect()
      }

      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY

      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(update)
      }
    },
    [update],
  )

  const resetMotion = useCallback(() => {
    if (frameRef.current != null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    animate(rotateX, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })
    animate(rotateY, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })
    animate(offsetX, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })
    animate(offsetY, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })
    boundsRef.current = null
  }, [offsetX, offsetY, rotateX, rotateY])

  const style = useMemo(
    () => ({ rotateX, rotateY, x: offsetX, y: offsetY, transformPerspective: 900 }),
    [offsetX, offsetY, rotateX, rotateY],
  )

  return {
    style,
    onPointerMove,
    resetMotion,
  }
}
