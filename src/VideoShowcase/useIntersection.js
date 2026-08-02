import { useEffect, useRef, useState } from 'react'

export default function useIntersection({ rootMargin = '200px', threshold = 0.1 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let active = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active) return
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => {
      active = false
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return [ref, isVisible]
}
