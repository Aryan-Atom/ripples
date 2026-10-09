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
      frames: {
        maxCacheSize: Infinity,
        priorityCount: 16,
        maxConcurrent: 8,
      },
      useLenis: true,
      scroll: {},
    }
  }

  return {
    frames: {
      maxDpr: isIOS() ? 1 : 1.25,
      maxConcurrent: 3,
      // Keep more frames warm so reverse scroll doesn't flash empty bg + copy.
      maxCacheSize: 64,
      priorityCount: 16,
      stride: 10,
    },
    useLenis: false,
    scroll: { scrub: 0.12 },
  }
}
