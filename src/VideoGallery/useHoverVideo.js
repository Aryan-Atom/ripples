import { useCallback, useState } from 'react'

export default function useHoverVideo() {
  const [activeId, setActiveId] = useState(null)

  const onHoverStart = useCallback((id) => {
    setActiveId(id)
  }, [])

  const onHoverEnd = useCallback((id) => {
    setActiveId((current) => (current === id ? null : current))
  }, [])

  return {
    activeId,
    onHoverStart,
    onHoverEnd,
  }
}
