import { createContext, useContext } from 'react'

export const HeroScrollContext = createContext(0)

export function useHeroScrollProgress() {
  return useContext(HeroScrollContext)
}
