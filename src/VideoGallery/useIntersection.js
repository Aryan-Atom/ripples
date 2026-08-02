import { useEffect, useRef, useState } from 'react'

export default function useIntersection({ rootMargin = '300px', threshold = 0.05 } = {}) {
  const ref = useRef(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    let active = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active) return
        setIsIntersecting(entry.isIntersecting)
      },
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => {
      active = false
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return [ref, isIntersecting]
}
