import { createContext, useContext, useEffect } from 'react'

export const HeroScrollContext = createContext(0)

/** @deprecated Prefer useHeroScrollSubscribe for scroll-driven overlays. */
export function useHeroScrollProgress() {
  return useContext(HeroScrollContext)
}

export const HeroScrollNotifierContext = createContext(null)

export function useHeroScrollSubscribe(onProgress) {
  const notifierRef = useContext(HeroScrollNotifierContext)

  useEffect(() => {
    if (!notifierRef?.current) return undefined
    return notifierRef.current.subscribe(onProgress)
  }, [notifierRef, onProgress])
}

export function createScrollNotifier() {
  const listeners = new Set()
  let lastProgress = 0

  return {
    subscribe(listener) {
      listeners.add(listener)
      listener(lastProgress)
      return () => listeners.delete(listener)
    },
    notify(progress) {
      lastProgress = progress
      listeners.forEach((listener) => listener(progress))
    },
  }
}
