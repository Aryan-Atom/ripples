export const DEFAULT_FRAME_SEQUENCE = {
  basePath: '/frames',
  frameCount: 241,
  extension: 'webp',
  prefix: 'frame-',
  padLength: 4,
  startIndex: 1,
  priorityCount: 24,
  stride: 10,
  maxConcurrent: 10,
  maxDpr: 2,
}

export function buildFramePath(index, options = {}) {
  const {
    basePath = DEFAULT_FRAME_SEQUENCE.basePath,
    extension = DEFAULT_FRAME_SEQUENCE.extension,
    prefix = DEFAULT_FRAME_SEQUENCE.prefix,
    padLength = DEFAULT_FRAME_SEQUENCE.padLength,
    startIndex = DEFAULT_FRAME_SEQUENCE.startIndex,
  } = options

  const number = index + startIndex
  return `${basePath}/${prefix}${String(number).padStart(padLength, '0')}.${extension}`
}
