export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  // Width-only: don't treat Windows touch laptops as mobile for 3D gating
  return window.matchMedia('(max-width: 767px)').matches
}

export function isCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}
