/** Shared muted / inline flags so mobile Safari allows autoplay the same as desktop. */
export function armInlinePlayback(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', 'true')
}

export function playSafe(video) {
  if (!video) return Promise.resolve()
  armInlinePlayback(video)
  if (!video.getAttribute('src') && !video.src) return Promise.resolve()
  return video.play()
}

/** After the first tap/scroll, retry any paused muted videos that should be playing. */
let gestureArmed = false
export function armAutoplayGestureRetry() {
  if (gestureArmed || typeof document === 'undefined') return
  gestureArmed = true

  const retry = () => {
    document.querySelectorAll('video[data-autoplay-intent="1"]').forEach((video) => {
      if (video.paused && video.dataset.shouldPlay === '1') {
        playSafe(video).catch(() => {})
      }
    })
  }

  document.addEventListener('touchstart', retry, { once: true, passive: true })
  document.addEventListener('pointerdown', retry, { once: true })
}
