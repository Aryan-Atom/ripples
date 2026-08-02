import { useCallback, useState } from 'react'

export default function useHoverVideo() {
  const [activeId, setActiveId] = useState(null)

  const setActive = useCallback((id) => setActiveId(id), [])
  const clearActive = useCallback(() => setActiveId(null), [])

  return {
    activeId,
    setActive,
    clearActive,
  }
}
