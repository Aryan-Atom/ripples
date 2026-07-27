import { buildFramePath, DEFAULT_FRAME_SEQUENCE } from './config'

const bitmapCache = new Map()
let accessCounter = 0

function touchCacheEntry(url) {
  const entry = bitmapCache.get(url)
  if (entry) entry.lastAccess = ++accessCounter
}

function evictLRU(maxCacheSize, frames, options, protectIndices = []) {
  if (!Number.isFinite(maxCacheSize) || bitmapCache.size <= maxCacheSize) return

  const protectedUrls = new Set(
    protectIndices
      .filter((index) => index >= 0 && index < frames.length)
      .map((index) => buildFramePath(index, options)),
  )

  const candidates = [...bitmapCache.entries()]
    .filter(([url]) => !protectedUrls.has(url))
    .sort((a, b) => a[1].lastAccess - b[1].lastAccess)

  for (const [url, entry] of candidates) {
    if (bitmapCache.size <= maxCacheSize) break
    entry.bitmap?.close?.()
    bitmapCache.delete(url)
    if (entry.index != null && frames[entry.index] === entry.bitmap) {
      frames[entry.index] = null
    }
  }
}

function buildProtectedIndices(targetIndex, frameCount, radius = 22) {
  const indices = []
  for (let offset = 0; offset < radius; offset += 1) {
    const before = targetIndex - offset
    const after = targetIndex + offset
    if (before >= 0) indices.push(before)
    if (after < frameCount) indices.push(after)
  }
  return indices
}

async function fetchBitmap(url, signal) {
  if (bitmapCache.has(url)) {
    touchCacheEntry(url)
    return bitmapCache.get(url).bitmap
  }

  const response = await fetch(url, { signal, cache: 'force-cache' })
  if (!response.ok) {
    throw new Error(`Failed to load frame: ${url} (${response.status})`)
  }

  const blob = await response.blob()
  const bitmap = await createImageBitmap(blob)
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

export async function loadFrameSequence(userOptions = {}, callbacks = {}) {
  const options = { ...DEFAULT_FRAME_SEQUENCE, ...userOptions }
  const { frameCount, priorityCount, stride, maxConcurrent, maxCacheSize } = options
  const { signal, onProgress, onReady, onFrameLoaded } = callbacks

  const frames = Array.from({ length: frameCount }, () => null)
  const queue = buildLoadOrder(frameCount, priorityCount, stride)
  const uniqueLoaded = new Set()
  let loadedCount = 0
  let pumping = false
  let lastTargetIndex = 0

  const loader = {
    frames,
    frameCount,
    prioritize: null,
    isComplete: () => uniqueLoaded.size >= frameCount,
  }

  const storeBitmap = (index, bitmap) => {
    const url = buildFramePath(index, options)
    bitmapCache.set(url, { bitmap, lastAccess: ++accessCounter, index })
    frames[index] = bitmap
    evictLRU(
      maxCacheSize,
      frames,
      options,
      buildProtectedIndices(lastTargetIndex, frameCount),
    )
  }

  const loadIndex = async (index) => {
    if (signal?.aborted || frames[index]) return

    const url = buildFramePath(index, options)
    const bitmap = await fetchBitmap(url, signal)
    if (signal?.aborted) return

    if (!bitmapCache.has(url)) {
      storeBitmap(index, bitmap)
    } else {
      frames[index] = bitmapCache.get(url).bitmap
      touchCacheEntry(url)
    }

    if (!uniqueLoaded.has(index)) {
      uniqueLoaded.add(index)
      loadedCount += 1
      onProgress?.(loadedCount / frameCount)
      onFrameLoaded?.(index, frames[index])

      if (loadedCount === 1) {
        onReady?.(frames, loader)
      }
    } else {
      onFrameLoaded?.(index, frames[index])
    }
  }

  const pump = async () => {
    if (pumping || signal?.aborted) return
    pumping = true

    while (queue.length > 0 && !signal?.aborted) {
      const batch = queue.splice(0, maxConcurrent).filter((index) => !frames[index])
      if (batch.length === 0) continue
      await Promise.all(batch.map((index) => loadIndex(index)))
    }

    pumping = false
  }

  loader.prioritize = (targetIndex) => {
    const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(targetIndex)))
    lastTargetIndex = clamped
    const urgent = []

    for (let offset = 0; offset < 24; offset += 1) {
      const before = clamped - offset
      const after = clamped + offset

      if (before >= 0 && !frames[before] && !urgent.includes(before)) {
        urgent.push(before)
      }
      if (after < frameCount && !frames[after] && !urgent.includes(after)) {
        urgent.push(after)
      }
    }

    evictLRU(maxCacheSize, frames, options, buildProtectedIndices(clamped, frameCount))

    if (urgent.length === 0) return

    const skip = new Set(urgent)
    const rest = queue.filter((index) => !skip.has(index))
    queue.length = 0
    queue.push(...urgent, ...rest)
    void pump()
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
      const entry = bitmapCache.get(url)
      entry?.bitmap?.close?.()
      bitmapCache.delete(url)
    })
    return
  }

  bitmapCache.forEach((entry) => entry.bitmap?.close?.())
  bitmapCache.clear()
}
