import { buildFramePath, DEFAULT_FRAME_SEQUENCE } from './config'

const bitmapCache = new Map()

async function fetchBitmap(url, signal, resizeWidth = 0) {
  if (bitmapCache.has(url)) {
    return bitmapCache.get(url)
  }

  const response = await fetch(url, { signal, cache: 'force-cache' })
  if (!response.ok) {
    throw new Error(`Failed to load frame: ${url} (${response.status})`)
  }

  const blob = await response.blob()
  const bitmap =
    resizeWidth > 0
      ? await createImageBitmap(blob, {
          resizeWidth,
          resizeQuality: 'medium',
        })
      : await createImageBitmap(blob)

  bitmapCache.set(url, bitmap)
  return bitmap
}

function buildLoadOrder(frameCount, priorityCount, stride) {
  const order = [0]
  const seen = new Set([0])

  for (let i = 1; i < Math.min(priorityCount, frameCount); i += 1) {
    if (!seen.has(i)) {
      order.push(i)
      seen.add(i)
    }
  }

  for (let i = 0; i < frameCount; i += stride) {
    if (!seen.has(i)) {
      order.push(i)
      seen.add(i)
    }
  }

  if (frameCount > 1 && !seen.has(frameCount - 1)) {
    order.push(frameCount - 1)
    seen.add(frameCount - 1)
  }

  for (let i = 0; i < frameCount; i += 1) {
    if (!seen.has(i)) {
      order.push(i)
    }
  }

  return order
}

function countCachedFrames(frames) {
  return frames.reduce((count, frame) => (frame ? count + 1 : count), 0)
}

export async function loadFrameSequence(userOptions = {}, callbacks = {}) {
  const options = { ...DEFAULT_FRAME_SEQUENCE, ...userOptions }
  const {
    frameCount,
    priorityCount,
    stride,
    maxConcurrent,
    maxCachedFrames = Infinity,
    bitmapResizeWidth = 0,
    prioritizeRadius = 24,
  } = options
  const { signal, onProgress, onReady, onFrameLoaded } = callbacks

  const frames = Array.from({ length: frameCount }, () => null)
  const queue = buildLoadOrder(frameCount, priorityCount, stride)
  let everLoadedCount = 0
  let focusIndex = 0
  let pumping = false

  const loader = {
    frames,
    frameCount,
    prioritize: null,
    releaseAll: null,
    isComplete: () => everLoadedCount >= frameCount,
  }

  const releaseFrame = (index) => {
    if (!frames[index]) return

    const url = buildFramePath(index, options)
    const bitmap = frames[index]
    bitmap?.close?.()
    bitmapCache.delete(url)
    frames[index] = null
  }

  const evictDistantFrames = () => {
    if (!Number.isFinite(maxCachedFrames)) return

    const cachedIndices = frames
      .map((frame, index) => (frame ? index : -1))
      .filter((index) => index >= 0)

    if (cachedIndices.length <= maxCachedFrames) return

    cachedIndices.sort(
      (a, b) => Math.abs(b - focusIndex) - Math.abs(a - focusIndex),
    )

    const candidates = cachedIndices.filter((index) => index !== focusIndex)

    while (countCachedFrames(frames) > maxCachedFrames && candidates.length > 0) {
      releaseFrame(candidates.shift())
    }
  }

  const loadIndex = async (index) => {
    if (signal?.aborted || frames[index]) return

    const url = buildFramePath(index, options)
    const bitmap = await fetchBitmap(url, signal, bitmapResizeWidth)
    if (signal?.aborted) return

    frames[index] = bitmap
    everLoadedCount += 1
    onProgress?.(everLoadedCount / frameCount)
    onFrameLoaded?.(index, bitmap)
    evictDistantFrames()

    if (everLoadedCount === 1) {
      onReady?.(frames, loader)
    }
  }

  const pump = async () => {
    if (pumping || signal?.aborted) return
    pumping = true

    while (queue.length > 0 && !signal?.aborted) {
      evictDistantFrames()

      const batch = queue.splice(0, maxConcurrent).filter((index) => !frames[index])
      if (batch.length === 0) continue
      await Promise.all(batch.map((index) => loadIndex(index)))
    }

    pumping = false
  }

  loader.prioritize = (targetIndex) => {
    focusIndex = Math.max(0, Math.min(frameCount - 1, Math.round(targetIndex)))
    evictDistantFrames()

    const urgent = []

    for (let offset = 0; offset < prioritizeRadius; offset += 1) {
      const before = focusIndex - offset
      const after = focusIndex + offset

      if (before >= 0 && !frames[before] && !urgent.includes(before)) {
        urgent.push(before)
      }
      if (after < frameCount && !frames[after] && !urgent.includes(after)) {
        urgent.push(after)
      }
    }

    if (urgent.length === 0) return

    const skip = new Set(urgent)
    const rest = queue.filter((index) => !skip.has(index))
    queue.length = 0
    queue.push(...urgent, ...rest)
    void pump()
  }

  loader.releaseAll = () => {
    for (let index = 0; index < frameCount; index += 1) {
      releaseFrame(index)
    }
  }

  await loadIndex(0)
  const firstInQueue = queue.indexOf(0)
  if (firstInQueue >= 0) queue.splice(firstInQueue, 1)
  void pump()

  return loader
}

export function releaseFrameCache(urls) {
  if (urls) {
    urls.forEach((url) => {
      const bitmap = bitmapCache.get(url)
      bitmap?.close?.()
      bitmapCache.delete(url)
    })
    return
  }

  bitmapCache.forEach((bitmap) => bitmap.close?.())
  bitmapCache.clear()
}
