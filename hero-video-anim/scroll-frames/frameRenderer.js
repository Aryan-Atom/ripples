import { DEFAULT_FRAME_SEQUENCE } from './config'

function findNearestLoadedFrame(frames, targetIndex) {
  if (frames[targetIndex]) return targetIndex

  for (let offset = 1; offset < frames.length; offset += 1) {
    const before = targetIndex - offset
    const after = targetIndex + offset
    if (before >= 0 && frames[before]) return before
    if (after < frames.length && frames[after]) return after
  }

  return 0
}

export function createScrollFrameRenderer(canvas, getFrames, options = {}) {
  const { maxDpr = DEFAULT_FRAME_SEQUENCE.maxDpr, smoothness = 0 } = options

  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
  let displayW = window.innerWidth
  let displayH = window.innerHeight
  let dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  let currentIndex = -1
  let renderedIndex = -1
  let targetProgress = 0
  let currentProgress = 0
  let rafId = null

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    const parent = canvas.parentElement
    displayW = Math.max(1, parent?.clientWidth || window.innerWidth)
    displayH = Math.max(1, parent?.clientHeight || window.innerHeight)
    canvas.width = Math.round(displayW * dpr)
    canvas.height = Math.round(displayH * dpr)
    canvas.style.width = `${displayW}px`
    canvas.style.height = `${displayH}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    renderedIndex = -1
    if (currentIndex >= 0) draw(currentIndex)
  }

  const draw = (index) => {
    const frames = getFrames()
    const frame = frames?.[index]
    if (!frame) return

    if (index === renderedIndex) return
    renderedIndex = index

    const scale = Math.max(displayW / frame.width, displayH / frame.height)
    const dw = frame.width * scale
    const dh = frame.height * scale
    const dx = (displayW - dw) / 2
    const dy = (displayH - dh) / 2

    ctx.drawImage(frame, dx, dy, dw, dh)
  }

  const resolveTargetIndex = () => {
    const frames = getFrames()
    if (!frames?.length) return 0

    const raw = targetProgress * (frames.length - 1)
    const rounded = Math.round(raw)

    if (smoothness <= 0) {
      currentProgress = raw
      return findNearestLoadedFrame(frames, rounded)
    }

    currentProgress += (raw - currentProgress) * smoothness
    return findNearestLoadedFrame(frames, Math.round(currentProgress))
  }

  const tick = () => {
    rafId = null
    const nextIndex = resolveTargetIndex()
    if (nextIndex !== currentIndex) {
      currentIndex = nextIndex
      draw(nextIndex)
    }

    if (
      smoothness > 0 &&
      Math.abs(currentProgress - targetProgress * (getFrames().length - 1)) > 0.01
    ) {
      rafId = requestAnimationFrame(tick)
    }
  }

  const scheduleTick = () => {
    if (smoothness <= 0) {
      const nextIndex = resolveTargetIndex()
      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex
        draw(nextIndex)
      }
      return
    }

    if (!rafId) {
      rafId = requestAnimationFrame(tick)
    }
  }

  resize()
  window.addEventListener('resize', resize)

  return {
    setProgress(progress) {
      targetProgress = Math.min(1, Math.max(0, progress))
      scheduleTick()
    },
    forceRedraw() {
      renderedIndex = -1
      if (currentIndex >= 0) draw(currentIndex)
    },
    destroy() {
      window.removeEventListener('resize', resize)
      if (rafId) cancelAnimationFrame(rafId)
    },
  }
}
