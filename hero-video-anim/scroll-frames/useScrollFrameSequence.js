import { useEffect, useRef, useState, useCallback } from 'react'
import { loadFrameSequence } from './frameLoader'
import { createScrollFrameRenderer } from './frameRenderer'
import { DEFAULT_FRAME_SEQUENCE } from './config'
import { getDeviceFrameOptions } from './device'

export function useScrollFrameSequence(userOptions = {}) {
  const deviceOptions = getDeviceFrameOptions()

  const {
    basePath = DEFAULT_FRAME_SEQUENCE.basePath,
    frameCount = DEFAULT_FRAME_SEQUENCE.frameCount,
    extension = DEFAULT_FRAME_SEQUENCE.extension,
    prefix = DEFAULT_FRAME_SEQUENCE.prefix,
    padLength = DEFAULT_FRAME_SEQUENCE.padLength,
    startIndex = DEFAULT_FRAME_SEQUENCE.startIndex,
    priorityCount = DEFAULT_FRAME_SEQUENCE.priorityCount,
    stride = DEFAULT_FRAME_SEQUENCE.stride,
    maxConcurrent = deviceOptions.maxConcurrent,
    maxDpr = deviceOptions.maxDpr,
    maxCachedFrames = deviceOptions.maxCachedFrames,
    bitmapResizeWidth = deviceOptions.bitmapResizeWidth,
    prioritizeRadius = deviceOptions.prioritizeRadius,
    smoothness = 0,
  } = { ...deviceOptions, ...userOptions }

  const canvasRef = useRef(null)
  const framesRef = useRef([])
  const rendererRef = useRef(null)
  const loaderRef = useRef(null)
  const progressRef = useRef(0)

  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isFullyLoaded, setIsFullyLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const controller = new AbortController()
    let cancelled = false

    const sequenceOptions = {
      basePath,
      frameCount,
      extension,
      prefix,
      padLength,
      startIndex,
      priorityCount,
      stride,
      maxConcurrent,
      maxDpr,
      maxCachedFrames,
      bitmapResizeWidth,
      prioritizeRadius,
    }

    const start = async () => {
      try {
        const loader = await loadFrameSequence(sequenceOptions, {
          signal: controller.signal,
          onProgress: (value) => {
            if (!cancelled) {
              setLoadProgress(value)
              if (value >= 1) setIsFullyLoaded(true)
            }
          },
          onReady: (frames, loaderApi) => {
            if (cancelled) return
            framesRef.current = frames
            loaderRef.current = loaderApi
            rendererRef.current = createScrollFrameRenderer(
              canvas,
              () => framesRef.current,
              { maxDpr, smoothness },
            )
            rendererRef.current.setProgress(progressRef.current)
            setIsReady(true)
          },
          onFrameLoaded: () => {
            rendererRef.current?.forceRedraw()
          },
        })

        loaderRef.current = loader
      } catch (err) {
        if (!cancelled && err?.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Failed to load frames')
        }
      }
    }

    start()

    return () => {
      cancelled = true
      controller.abort()
      rendererRef.current?.destroy()
      rendererRef.current = null
      loaderRef.current = null
    }
  }, [
    basePath,
    frameCount,
    extension,
    prefix,
    padLength,
    startIndex,
    priorityCount,
    stride,
    maxConcurrent,
    maxDpr,
    maxCachedFrames,
    bitmapResizeWidth,
    prioritizeRadius,
    smoothness,
  ])

  const setProgress = useCallback(
    (progress) => {
      const clamped = Math.min(1, Math.max(0, progress))
      progressRef.current = clamped
      rendererRef.current?.setProgress(clamped)

      const targetIndex = Math.round(clamped * (frameCount - 1))
      loaderRef.current?.prioritize(targetIndex)
    },
    [frameCount],
  )

  const releaseFrames = useCallback(() => {
    loaderRef.current?.releaseAll?.()
    rendererRef.current?.forceRedraw()
  }, [])

  return {
    canvasRef,
    setProgress,
    releaseFrames,
    loadProgress,
    isReady,
    isFullyLoaded,
    error,
  }
}
