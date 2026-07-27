export function isIOS() {
  if (typeof navigator === 'undefined') return false

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export function isMobileDevice() {
  if (typeof window === 'undefined') return false

  return (
    isIOS() ||
    window.matchMedia('(max-width: 900px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

/** Memory-safe defaults for touch / iOS Safari (strict tab memory limits). */
export function getDeviceFrameOptions() {
  if (!isMobileDevice()) {
    return {
      maxDpr: 2,
      maxConcurrent: 10,
      maxCachedFrames: 72,
      bitmapResizeWidth: 0,
      prioritizeRadius: 24,
    }
  }

  return {
    maxDpr: 1,
    maxConcurrent: 2,
    maxCachedFrames: isIOS() ? 28 : 36,
    bitmapResizeWidth: 960,
    prioritizeRadius: 10,
    priorityCount: 12,
    stride: 14,
  }
}

export function shouldUseLenis() {
  return !isIOS()
}
