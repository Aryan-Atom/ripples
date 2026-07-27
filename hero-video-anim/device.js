/** Detect touch-primary devices (phones/tablets). */
export function isCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

/** Frame + scroll settings tuned for mobile memory and touch scroll. */
export function getAdaptiveProfile() {
  const mobile = isCoarsePointer()

  if (!mobile) {
    return {
      frames: { maxCacheSize: Infinity },
      useLenis: true,
      scroll: {},
    }
  }

  return {
    frames: {
      maxDpr: isIOS() ? 1 : 1.25,
      maxConcurrent: 2,
      maxCacheSize: 36,
      priorityCount: 18,
      stride: 12,
    },
    useLenis: false,
    scroll: { scrub: 0.12 },
  }
}
